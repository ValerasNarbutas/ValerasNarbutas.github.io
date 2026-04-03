---
title: "Building Apps with SharePoint Embedded and Microsoft Graph API"
author: valeras
date: 2026-03-24 15:00:00 +0800
categories:
  - SharingIsCaring
  - TipsAndTricks
tags:
  - SharePoint
  - GraphAPI
  - SharePoint Embedded
  - TypeScript
  - FileStorage
pin: false
slug: sharepoint-embedded-graph-api
comments: true
image:
  path: /img/posts/spo_embedded.png
  alt: Building Apps with SharePoint Embedded and Microsoft Graph API
---

## Summary

SharePoint Embedded lets you build file storage directly into your own applications using Microsoft's enterprise-grade infrastructure — without requiring your users to have SharePoint licences or your data to live in traditional SharePoint sites. Under the hood, it uses Microsoft Graph API to manage Containers, files, and permissions. This post walks through the full developer journey: registering a Container Type, provisioning containers, uploading files, and managing permissions — all with TypeScript and REST examples.

---

## What Is SharePoint Embedded?

SharePoint Embedded (formerly Project Nucleus) is a cloud-based file and document storage platform available via Microsoft Graph. It allows ISVs and enterprise developers to:

- Store files in Microsoft's cloud with enterprise compliance (retention, sensitivity labels, eDiscovery).
- Manage file permissions without SharePoint site concepts.
- Access files through the full Microsoft Graph `/drives` API surface.
- Integrate with Microsoft 365 apps (view Word/Excel/PDF files in the browser) without end-users needing SharePoint.

The key concept is the **Container** — a logical unit of file storage similar to a SharePoint document library, but scoped to your application.

---

## Prerequisites

- A Microsoft 365 tenant with SharePoint Embedded enabled (requires a SharePoint Embedded licence or a Microsoft 365 E3/E5 tenant with the feature enabled).
- An Azure AD app registration with the following permissions:
  - `FileStorageContainer.Selected` (application permission)
  - `Files.ReadWrite.All` (delegated)
  - `Sites.ReadWrite.All` (delegated, for container provisioning)

---

## Step 1: Register a Container Type

A Container Type is a definition registered by your application that describes what kind of containers it manages. Think of it as a template.

### Using the SharePoint Admin PowerShell

```powershell
# Install the SharePoint Online Management Shell if needed
Install-Module Microsoft.Online.SharePoint.PowerShell -Scope CurrentUser

Connect-SPOService -Url "https://contoso-admin.sharepoint.com"

# Create a new Container Type
New-SPOContainerType `
    -ContainerTypeName "ContosoProjectFiles" `
    -OwningApplicationId "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx" `
    -ApplicationRedirectUrl "https://app.contoso.com/auth/callback"
```

Note the `ContainerTypeId` returned — you will need it in subsequent steps.

### Grant the Container Type to your app

```powershell
# Register the Container Type with your app's tenant
Grant-SPOContainerTypeServicePrincipalPermission `
    -ContainerTypeId "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx" `
    -ApplicationId "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx" `
    -Permission "ReadWrite"
```

---

## Step 2: Provision a Container

Once the Container Type is registered, your application can create Container instances via Microsoft Graph.

### TypeScript: Create a Container

```typescript
import { Client } from '@microsoft/microsoft-graph-client';
import { TokenCredentialAuthenticationProvider } from '@microsoft/microsoft-graph-client/authProviders/azureTokenCredentials';
import { ClientSecretCredential } from '@azure/identity';

const credential = new ClientSecretCredential(
  process.env.TENANT_ID!,
  process.env.CLIENT_ID!,
  process.env.CLIENT_SECRET!
);

const authProvider = new TokenCredentialAuthenticationProvider(credential, {
  scopes: ['https://graph.microsoft.com/.default']
});

const client = Client.initWithMiddleware({ authProvider });

async function createContainer(displayName: string, description: string): Promise<string> {
  const container = await client.api('/storage/fileStorage/containers').post({
    displayName,
    description,
    containerTypeId: process.env.CONTAINER_TYPE_ID!
  });

  console.log(`Container created: ${container.id}`);
  return container.id as string;
}
```

### REST equivalent

```http
POST https://graph.microsoft.com/v1.0/storage/fileStorage/containers
Authorization: Bearer {access_token}
Content-Type: application/json

{
  "displayName": "Contoso Project Alpha",
  "description": "File storage for Project Alpha",
  "containerTypeId": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
}
```

Response includes the `id` of the new container and its associated `driveId` — a standard Graph drive you can use with all `/drives` API calls.

---

## Step 3: Upload Files

Once you have a container's `driveId`, upload files using the standard Graph `/drives` upload API.

### TypeScript: Upload a file (simple upload for files <4 MB)

```typescript
async function uploadFile(
  driveId: string,
  folderPath: string,
  fileName: string,
  fileContent: Buffer
): Promise<string> {
  const response = await client
    .api(`/drives/${driveId}/root:/${folderPath}/${fileName}:/content`)
    .put(fileContent);

  console.log(`File uploaded: ${response.id} — ${response.webUrl}`);
  return response.id as string;
}

// Usage
const driveId = 'b!...'; // from container.drive.id
const fileBuffer = fs.readFileSync('./proposal.docx');
await uploadFile(driveId, 'Proposals/2026', 'Q1-Proposal.docx', fileBuffer);
```

### TypeScript: Large file upload with resumable session (>4 MB)

```typescript
async function uploadLargeFile(
  driveId: string,
  filePath: string,
  fileName: string,
  fileContent: Buffer
): Promise<void> {
  // Create upload session
  const session = await client
    .api(`/drives/${driveId}/root:/${filePath}/${fileName}:/createUploadSession`)
    .post({
      item: {
        '@microsoft.graph.conflictBehavior': 'replace',
        name: fileName
      }
    });

  const uploadUrl: string = session.uploadUrl;
  const chunkSize = 320 * 1024 * 10; // 3.2 MB chunks (must be multiple of 320 KB)
  let offset = 0;

  while (offset < fileContent.length) {
    const chunk = fileContent.slice(offset, offset + chunkSize);
    const contentRange = `bytes ${offset}-${offset + chunk.length - 1}/${fileContent.length}`;

    await fetch(uploadUrl, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/octet-stream',
        'Content-Range': contentRange
      },
      body: chunk
    });

    offset += chunkSize;
    console.log(`Uploaded ${Math.min(offset, fileContent.length)} / ${fileContent.length} bytes`);
  }
}
```

---

## Step 4: Manage Permissions

SharePoint Embedded uses the Graph permissions model for fine-grained access control.

### Grant a user read access to a container

```http
POST https://graph.microsoft.com/v1.0/storage/fileStorage/containers/{containerId}/permissions
Authorization: Bearer {access_token}
Content-Type: application/json

{
  "roles": ["reader"],
  "grantedToV2": {
    "user": {
      "userPrincipalName": "alice@contoso.com"
    }
  }
}
```

### TypeScript: Grant permissions programmatically

```typescript
async function grantContainerPermission(
  containerId: string,
  upn: string,
  role: 'reader' | 'writer' | 'owner'
): Promise<void> {
  await client.api(`/storage/fileStorage/containers/${containerId}/permissions`).post({
    roles: [role],
    grantedToV2: {
      user: { userPrincipalName: upn }
    }
  });
  
  console.log(`Granted ${role} access to ${upn} on container ${containerId}`);
}
```

### List container permissions

```typescript
async function listPermissions(containerId: string): Promise<void> {
  const permissions = await client
    .api(`/storage/fileStorage/containers/${containerId}/permissions`)
    .get();

  permissions.value.forEach((p: any) => {
    const user = p.grantedToV2?.user?.userPrincipalName ?? 'N/A';
    console.log(`${user}: ${p.roles.join(', ')}`);
  });
}
```

---

## Step 5: List and Browse Files

Use the standard `/drives` API to browse file contents:

```typescript
async function listFiles(driveId: string, folderPath = 'root'): Promise<void> {
  const endpoint = folderPath === 'root'
    ? `/drives/${driveId}/root/children`
    : `/drives/${driveId}/root:/${folderPath}:/children`;

  const items = await client.api(endpoint)
    .select('id,name,size,lastModifiedDateTime,webUrl,folder,file')
    .get();

  items.value.forEach((item: any) => {
    const type = item.folder ? '📁' : '📄';
    const size = item.file ? `${(item.size / 1024).toFixed(1)} KB` : '';
    console.log(`${type} ${item.name} ${size} — ${item.lastModifiedDateTime}`);
  });
}
```

---

## Conclusion

SharePoint Embedded offers a compelling file storage backend for custom applications: enterprise-grade compliance, familiar Graph APIs, and deep Microsoft 365 integration — without requiring users to interact with SharePoint directly. The learning curve is low if you already know the Graph `/drives` API. The main investment is in Container Type registration and app permissions setup, which is a one-time activity. From there, standard Graph calls handle everything else.

---

## References

- [SharePoint Embedded overview – Microsoft Learn](https://learn.microsoft.com/sharepoint/dev/embedded/overview)
- [Getting started with SharePoint Embedded](https://learn.microsoft.com/sharepoint/dev/embedded/getting-started)
- [FileStorageContainer resource type – Graph API](https://learn.microsoft.com/graph/api/resources/filestoragecontainer)
- [Microsoft Graph JavaScript SDK](https://learn.microsoft.com/graph/sdks/sdk-installation#install-the-microsoft-graph-javascript-sdk)
- [Upload large files with Graph API](https://learn.microsoft.com/graph/api/driveitem-createuploadsession)
