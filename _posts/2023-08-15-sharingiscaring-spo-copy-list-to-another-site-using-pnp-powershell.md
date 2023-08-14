---
title: Copy SharePoint list to another site using PNP.PowerShell
author: valeras
date: 2023-08-15 00:05:00 +0800
categories:
  - SharingIsCaring
  - ScriptSamples
tags:
  - SharingIsCaring
  - PNP PowerShell
pin: false
slug: sharingiscaring-spo-copy-list-to-another-site-using-pnp-powershell
comments: true
image:
  path: /img/posts/sharingiscaring-spo-copy-list-to-another-site-using-pnp-powershell.png
  alt: Copy SharePoint list to another site using PNP.PowerShell
---

## Summary

This sample demonstrates how to copy SharePoint list to another SharePoint site using PNP.PowerShell.

## Pre-requisites

- PnP PowerShell to learn more at: [https://aka.ms/pnp/powershell](https://aka.ms/pnp/powershell)

  ![Example](/img/posts/assetmanagerdemo.PNG)

```powershell
# Create object to store list templates
$SPBaseTemplates = @{ 
  100 = 'GenericList'; 
  101 = 'DocumentLibrary'; 
  102 = 'Survey'; 
  103 = 'Links'; 
  104 = 'Announcements'; 
  105 = 'Contacts'; 
  106 = 'Events'; 
  107 = 'Tasks'; 
  108 = 'DiscussionBoard'; 
  109 = 'PictureLibrary'; 
  110 = 'DataSources'; 
  118 = 'WorkflowProcess'; 
  120 = 'CustomGrid'; 
  140 = 'WorkflowHistory'; 
  1100 = 'IssuesTracking'; 
  119 = 'WebPageLibrary' 
  }

# Additional list settings
$DraftVersionVisibilityList = @{ 0 = 'Reader'; 1 = 'Author'; 2 = 'Approver'; }
$ReadSecurityList = @{ 1 = 'AllUsersReadAccess'; 2 = 'AllUsersReadAccessOnItemsTheyCreate'; }
$WriteSecurityList = @{ 1 = 'WriteAllItems'; 2 = 'WriteOnlyMyItems'; 3 = 'WriteNoItems' }

$RoleDefinitionBindingsList = @{ 
  1073741826 = 'Full Control'; 
  1073741827 = 'Design'; 
  1073741828 = 'Edit'; 
  1073741829 = 'Contribute'; 
  1073741830 = 'Read' 
  }

$listTitle = "<ListTitle>"
$sourceWeb = "<SourceSiteUrl>"
$destinationWeb = "<DestintionSiteUrl>"

Write-host "Ensure logged in"
try {
    $context = Get-PnPContext

    if ($context -eq $null) {
        throw "No PnP context found."
    }
    Write-Host "PnP context found."
}
catch {
    Connect-PnPOnline -Url $sourceWeb -Interactive
}

Write-Host "Get list settings, views, fields and Check if list has unique permissions"
$sourceListSettings = Get-PnPList -Identity $listTitle -Includes RoleAssignments, Fields, Views, BaseTemplate, DraftVersionVisibility
$sourceListViews = $sourceListSettings.Views
$sourceListColumns = $sourceListSettings.Fields
$sourceListPermissions = $sourceListSettings.RoleAssignments

#AllUsersReadAccess, AllUsersReadAccessOnItemsTheyCreate
$sourceListSettings.ReadSecurity = "AllUsersReadAccess"

# Switch context to destination web

Connect-PnPOnline -Url $destinationWeb -Interactive

Write-Host "Translate template number to name"
$baseTemplate = $SPBaseTemplates[$sourceListSettings.BaseTemplate]

Write-Host "Create new list"

New-PnPList -Title $sourceListSettings.Title -Template $baseTemplate -OnQuickLaunch

Write-Host "Set other list settings"
# Note: You will need to map all other properties from the source list to the appropriate parameters for Set-PnPList

Set-PnPList `
-Identity $sourceListSettings.Title `
-Description $sourceListSettings.Description `
-EnableAttachments $sourceListSettings.EnableAttachments `
-EnableContentTypes $sourceListSettings.AllowContentTypes `
-EnableFolderCreation $sourceListSettings.EnableFolderCreation `
-EnableMinorVersions $sourceListSettings.EnableMinorVersions `
-EnableModeration $sourceListSettings.EnableModeration `
-DraftVersionVisibility $sourceListSettings.DraftVersionVisibility `
-EnableVersioning $sourceListSettings.EnableVersioning `
-ForceCheckout $sourceListSettings.ForceCheckout `
-Hidden $sourceListSettings.Hidden `
-ListExperience $sourceListSettings.ListExperienceOptions `
-MajorVersions $sourceListSettings.MajorVersionLimit `
-MinorVersions $sourceListSettings.MajorWithMinorVersionsLimit `
-ReadSecurity $ReadSecurityList[1] `
-WriteSecurity $WriteSecurityList[1] `
-NoCrawl `
-DisableGridEditing $sourceListSettings.DisableGridEditing


# Permissions are not copied by default, so we need to check if the source list has unique permissions and if so, copy them to the destination list
if ($sourceListSettings.HasUniqueRoleAssignments) {
    Write-Host "Set unique permissions"
    
    # Break role inheritance without copying existing permissions
    Set-PnPList -Identity $sourceListSettings.Title -BreakRoleInheritance $true -CopyRoleAssignments $false
    
    # Retrieve all role definitions for the site
    $RoleDefinitionBindingsList = Get-PnPRoleDefinition | Select-Object -Property Id, Name
    
    # Create a hashtable mapping role definition names to their IDs for easy lookup
    $roleMap = @{}
    foreach ($role in $RoleDefinitionBindingsList) {
        $roleMap[$role.Name] = $role.Id
    }
    
    foreach ($roleAssignment in $sourceListPermissions) {
        $member = $roleAssignment | Select-Object -ExpandProperty Member
        
        # Assuming the role assignment has a single role definition. If there are multiple, this needs to be adjusted.
        $roleName = $roleAssignment.RoleDefinitionBindings[0].Name
        
        if ($roleMap.ContainsKey($roleName)) {
            Set-PnPListPermission -Identity $sourceListSettings.Title -User $Member.LoginName -AddRole $roleName
        } else {
            Write-Host "Role $roleName not found in destination site." -ForegroundColor Yellow
        }
    }
}


Write-Host "Add columns"
$destinationListColumns = Get-PnPField -List $sourceListSettings.Title
foreach ($column in $sourceListColumns) {
    $fnd = $destinationListColumns | Where-Object { $_.InternalName -eq $column.InternalName }
    if (-not $fnd) {
        Add-PnPFieldFromXml -List $sourceListSettings.Title -FieldXml $column.SchemaXml
    }
}


Write-Host "Add views"
foreach ($view in $sourceListViews) {
    $schema = [xml]$view.HtmlSchemaXml
    $fields = $schema.View.ViewFields.FieldRef.Name
    
    $viewQuery = $view.ViewQuery.replace('"', "'")
    if (-not $viewQuery) {
        Add-PnPView -List $sourceListSettings.Title -Title $view.Title -Fields $fields | Out-Null
    } else {
        Add-PnPView -List $sourceListSettings.Title -Title $view.Title -Fields $fields -Query $viewQuery | Out-Null
    }
}

```

## PNP Script sample site

[Script sample site](https://pnp.github.io/script-samples/spo-copy-list/README.html?tabs=pnpps)

