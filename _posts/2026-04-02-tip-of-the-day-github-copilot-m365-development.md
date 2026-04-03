---
title: "Tip of the day – Supercharge M365 Development with GitHub Copilot"
author: valeras
date: 2026-04-02 08:00:00 +0800
categories:
  - TipOfTheDay
  - AI
tags:
  - GitHub Copilot
  - AI
  - SPFx
  - TypeScript
  - tipoftheday
  - Developer
pin: false
slug: tip-day-github-copilot-m365-development
comments: true
image:
  path: /img/posts/gh_copilot_m365.png
  alt: Supercharge M365 Development with GitHub Copilot
---

## Summary

GitHub Copilot has become an indispensable tool in the M365 developer's toolkit. Whether you are building SPFx web parts, writing Graph API calls, crafting PnP PowerShell scripts, or debugging a Teams bot, Copilot can dramatically accelerate your workflow. This tip shares four concrete, practical examples of using GitHub Copilot in VS Code for real M365 development tasks — including the exact prompts and the resulting code.

---

## Setting Up GitHub Copilot for M365 Development

Install the **GitHub Copilot** and **GitHub Copilot Chat** extensions in VS Code:

```bash
# Or install from the VS Code Extensions Marketplace (Ctrl+Shift+X)
# Search for "GitHub Copilot" and "GitHub Copilot Chat"
```

Open **Copilot Chat** with `Ctrl+Shift+I` (or click the chat icon in the activity bar). The chat window is where the most powerful interactions happen — inline completions are great for boilerplate, but chat gives you full conversational prompting for complex tasks.

---

## Example 1: Scaffolding an SPFx Web Part Property Pane

**The scenario:** You are building an SPFx web part and need a property pane with a text field, a dropdown for column selection, and a toggle.

**Prompt in Copilot Chat:**

```
I'm building an SPFx 1.21 web part using TypeScript. 
Generate the complete getPropertyPaneConfiguration() method for a web part that has:
1. A text field for "List name" (property: listName)
2. A dropdown for "Column to display" (property: selectedColumn) populated from a state variable this.state.columns which is an array of {key: string, text: string}
3. A toggle for "Show item count" (property: showItemCount, default false)
Include the required imports from @microsoft/sp-property-pane.
```

**Copilot's output:**

```typescript
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
  PropertyPaneDropdown,
  PropertyPaneToggle,
  IPropertyPaneDropdownOption
} from '@microsoft/sp-property-pane';

protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
  const columnOptions: IPropertyPaneDropdownOption[] = this.state.columns.map(col => ({
    key: col.key,
    text: col.text
  }));

  return {
    pages: [
      {
        header: { description: 'Configure the web part settings' },
        groups: [
          {
            groupName: 'Data Source',
            groupFields: [
              PropertyPaneTextField('listName', {
                label: 'List name',
                placeholder: 'Enter the SharePoint list name',
                onGetErrorMessage: (value: string) =>
                  value.trim().length === 0 ? 'List name is required' : ''
              }),
              PropertyPaneDropdown('selectedColumn', {
                label: 'Column to display',
                options: columnOptions,
                disabled: columnOptions.length === 0
              })
            ]
          },
          {
            groupName: 'Display Options',
            groupFields: [
              PropertyPaneToggle('showItemCount', {
                label: 'Show item count',
                onText: 'Visible',
                offText: 'Hidden'
              })
            ]
          }
        ]
      }
    ]
  };
}
```

**Tip:** After pasting the output, use Copilot Chat's **Explain** command (select the code, right-click → Copilot → Explain) to verify you understand every part before committing.

---

## Example 2: Generating Graph API Calls

**The scenario:** You need to fetch all members of a Microsoft 365 Group, filter to owners only, and handle pagination.

**Prompt in Copilot Chat:**

```
Write a TypeScript function using the Microsoft Graph JavaScript SDK v4 that:
1. Takes a groupId as a parameter
2. Fetches all owners of that M365 group (not just first page - handle pagination)
3. Returns an array of { id: string, displayName: string, mail: string }
4. Handles errors gracefully with try/catch
Assume the Graph client is already instantiated as `graphClient`.
```

**Copilot's output:**

```typescript
interface GroupMember {
  id: string;
  displayName: string;
  mail: string;
}

async function getGroupOwners(groupId: string): Promise<GroupMember[]> {
  const owners: GroupMember[] = [];

  try {
    let response = await graphClient
      .api(`/groups/${groupId}/owners`)
      .select('id,displayName,mail')
      .top(100)
      .get();

    while (response) {
      const pageOwners = response.value.map((owner: any) => ({
        id: owner.id,
        displayName: owner.displayName ?? 'Unknown',
        mail: owner.mail ?? owner.userPrincipalName ?? ''
      }));
      owners.push(...pageOwners);

      if (response['@odata.nextLink']) {
        response = await graphClient
          .api(response['@odata.nextLink'])
          .get();
      } else {
        break;
      }
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error(`Failed to fetch owners for group ${groupId}: ${error.message}`);
    }
    throw error;
  }

  return owners;
}
```

**Tip:** Always ask Copilot to add pagination handling explicitly. Without the prompt instruction, it often omits it for brevity.

---

## Example 3: Writing PnP PowerShell Scripts

**The scenario:** You need a script to bulk-update a column default value across all libraries in a site collection.

**Prompt in Copilot Chat:**

```
Write a PnP PowerShell script that:
1. Connects to a SharePoint site using Connect-PnPOnline -Interactive
2. Gets all document libraries in the site (excluding hidden libraries and system lists)
3. For each library, sets the default value of a column named "Department" to "Engineering"
4. Logs progress to the console with colour-coded output (green for success, yellow for skipped, red for errors)
5. Exports a summary CSV at the end
```

**Copilot's output:**

```powershell
[CmdletBinding()]
param(
    [Parameter(Mandatory)]
    [string]$SiteUrl,
    [string]$ColumnName = "Department",
    [string]$DefaultValue = "Engineering"
)

Connect-PnPOnline -Url $SiteUrl -Interactive

$results = @()
$lists = Get-PnPList | Where-Object {
    -not $_.Hidden -and
    $_.BaseTemplate -eq 101  # DocumentLibrary template
}

Write-Host "Found $($lists.Count) document libraries." -ForegroundColor Cyan

foreach ($list in $lists) {
    try {
        $field = Get-PnPField -List $list -Identity $ColumnName -ErrorAction SilentlyContinue

        if ($null -eq $field) {
            Write-Host "SKIPPED: '$($list.Title)' — column '$ColumnName' not found." -ForegroundColor Yellow
            $results += [PSCustomObject]@{ Library = $list.Title; Status = "Skipped"; Reason = "Column not found" }
            continue
        }

        Set-PnPDefaultColumnValues -List $list -Field $ColumnName -Value $DefaultValue
        Write-Host "SUCCESS: '$($list.Title)' — '$ColumnName' default set to '$DefaultValue'." -ForegroundColor Green
        $results += [PSCustomObject]@{ Library = $list.Title; Status = "Success"; Reason = "" }

    } catch {
        Write-Host "ERROR: '$($list.Title)' — $($_.Exception.Message)" -ForegroundColor Red
        $results += [PSCustomObject]@{ Library = $list.Title; Status = "Error"; Reason = $_.Exception.Message }
    }
}

$csvPath = ".\ColumnDefaultUpdate_$(Get-Date -Format 'yyyyMMdd_HHmmss').csv"
$results | Export-Csv -Path $csvPath -NoTypeInformation
Write-Host "`nSummary exported to $csvPath" -ForegroundColor Cyan
```

---

## Example 4: Debugging with Copilot Chat

**The scenario:** Your Teams bot is throwing an inconsistent error: *"BotFrameworkAdapter.processActivity(): \`turnError\` handler expected a function"*

**Prompt in Copilot Chat:**

```
I'm getting this error in my Teams bot built with the Teams AI Library and Bot Framework SDK:
"BotFrameworkAdapter.processActivity(): `turnError` handler expected a function"

Here is my adapter setup code:
[paste your adapter code]

What is causing this and how do I fix it?
```

**Copilot's typical diagnosis and fix:**

> The error occurs because `adapter.onTurnError` is being assigned a non-function value. This usually happens when the assignment is made before the adapter is fully initialised, or when there is a module loading order issue.

```typescript
// ❌ Incorrect — assigning before adapter is ready or assigning a non-function
adapter.onTurnError = someVariable; // if someVariable is undefined at this point

// ✅ Correct — assign a function literal directly
adapter.onTurnError = async (context: TurnContext, error: Error) => {
  console.error(`[onTurnError] unhandled error: ${error.message}`);
  await context.sendTraceActivity(
    'OnTurnError Trace',
    `${error}`,
    'https://www.botframework.com/schemas/error',
    'TurnError'
  );
  await context.sendActivity('An error occurred. Please try again.');
};
```

**Tip:** For debugging, paste the full error stack trace and the relevant code block. The more context you give, the more precise Copilot's diagnosis will be. Use `@workspace` in the prompt (`@workspace explain why this Teams bot error occurs`) to let Copilot scan your entire open project for context.

---

## General Tips for Better M365 Prompts

| Tip | Example |
|---|---|
| Specify the exact version | "Using SPFx **1.21**" not just "using SPFx" |
| Name the SDK/package | "Using **@microsoft/microsoft-graph-client v4**" |
| State error handling expectations | "Handle errors gracefully with try/catch" |
| Ask for pagination | "Handle pagination with @odata.nextLink" |
| Ask for TypeScript types | "Include proper TypeScript types and interfaces" |
| Reference your state | "Assume the Graph client is already instantiated as `graphClient`" |

---

## Conclusion

GitHub Copilot is most powerful when you give it precise, context-rich prompts. Specifying the exact SDK version, naming your variables, and stating your error handling requirements consistently produces production-quality code rather than generic examples. Use Copilot Chat for complex generation tasks, inline completions for boilerplate, and the `@workspace` context for debugging — and you will find your M365 development velocity increases significantly.

---

## References

- [GitHub Copilot documentation](https://docs.github.com/copilot)
- [GitHub Copilot in VS Code](https://code.visualstudio.com/docs/copilot/overview)
- [SharePoint Framework development overview](https://learn.microsoft.com/sharepoint/dev/spfx/sharepoint-framework-overview)
- [Microsoft Graph JavaScript SDK](https://learn.microsoft.com/graph/sdks/sdk-installation)
- [PnP PowerShell documentation](https://pnp.github.io/powershell/)
