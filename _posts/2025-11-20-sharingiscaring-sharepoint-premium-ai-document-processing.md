---
title: "Automate Document Processing with SharePoint Premium AI"
author: valeras
date: 2025-11-20 11:00:00 +0800
categories:
  - SharingIsCaring
  - AI
tags:
  - SharePoint
  - AI
  - SharePoint Premium
  - DocumentProcessing
  - PowerAutomate
pin: false
slug: sharepoint-premium-ai-document-processing
comments: true
image:
  path: /img/posts/spo_premium_ai.png
  alt: Automate Document Processing with SharePoint Premium AI
---

## Summary

SharePoint Premium (formerly Microsoft Syntex) brings AI-powered document processing directly into SharePoint — extracting structured data from invoices, contracts, purchase orders, and more. This post covers the prebuilt models available today, how to train a custom model for your own document types, how to integrate the results with Power Automate, and how to use PnP PowerShell for bulk configuration.

---

## What Is SharePoint Premium Document Processing?

SharePoint Premium's document processing capability uses machine learning models to automatically read uploaded documents and populate SharePoint list column metadata. Instead of employees manually typing invoice numbers, amounts, and vendor names, the system extracts that information automatically within seconds of upload.

There are three types of models:

| Model type | Best for | Training required |
|---|---|---|
| **Prebuilt** | Common document types (invoices, receipts, contracts) | No |
| **Structured/freeform** | Forms with consistent layouts | ~5 examples |
| **Unstructured** | Free-text documents (contracts, reports) | ~10 examples |

---

## Using Prebuilt Models

Microsoft provides ready-to-use models for several common document types. No training required — just apply the model to a library.

### Apply the Invoice prebuilt model via the UI

1. Navigate to the SharePoint document library where invoices are uploaded.
2. Click **Automate** in the toolbar → **Apply a document processing model**.
3. In the panel, select **Prebuilt models** → **Invoice processing**.
4. Select which library columns should receive the extracted values:

| Extracted field | Map to column |
|---|---|
| Vendor name | `SupplierName` (text) |
| Invoice date | `InvoiceDate` (date) |
| Invoice total | `TotalAmount` (currency) |
| Invoice number | `InvoiceNumber` (text) |
| Due date | `PaymentDueDate` (date) |

5. Click **Apply model**. New files uploaded to this library will be automatically processed.

### Other available prebuilt models

- **Contracts** — extracts parties, effective date, expiry date, jurisdiction.
- **Receipts** — extracts merchant, total, tax, transaction date.
- **Health insurance cards** — extracts member ID, plan, group number.
- **Tax declarations** — extracts filer name, tax year, totals.

---

## Training a Custom Unstructured Model

For document types not covered by prebuilt models (e.g., internal project approval forms), you can train a custom model.

### Step 1: Create the model

1. Go to the **Content Center** site (created when SharePoint Premium is enabled).
2. Click **New** → **Document understanding model**.
3. Name the model, e.g. `Project Approval Form`.
4. Click **Create**.

### Step 2: Add example files

Upload at least 10 example documents — a mix of positive examples (the target document type) and negative examples (similar but different documents):

- 7+ project approval forms (positive).
- 3+ other project documents such as briefs or status reports (negative).

### Step 3: Label extractors

For each field you want to extract:

1. Click **+ Add an extractor**, name it (e.g. `ProjectCode`).
2. In the labelling view, select the text that represents `ProjectCode` in each example file.
3. Mark it as a **positive label** or indicate it is absent with a **negative label**.
4. Repeat for all files and all extractors.

### Step 4: Train and test

Click **Train** — the model trains in the cloud within a few minutes. Then click **Test model** and upload files that were not part of the training set to validate accuracy. Aim for >85% accuracy on critical extractors before applying to production.

---

## Integrating with Power Automate

Once a model is applied to a library, you can use the extracted metadata in a Power Automate flow to drive downstream processes.

### Flow: Route invoices to the correct approver

**Trigger:** When a file is classified and metadata extracted (`SharePoint — When a file is classified by a content understanding model`)

**Condition:** `TotalAmount` is greater than 10000

**If yes:**
- Send approval request to Finance Director
- Set `ApprovalStatus` column to `Pending`

**If no:**
- Send approval request to Department Head
- Set `ApprovalStatus` column to `Pending`

**After approval:**
- Update `ApprovalStatus` to `Approved` or `Rejected`
- If approved and `TotalAmount > 50000`, post a notification to the Finance Teams channel

### Flow action: Extract confidence scores

The model result includes per-field confidence scores. Use them to flag low-confidence extractions for human review:

```json
{
  "extractedFields": {
    "InvoiceNumber": { "value": "INV-2025-4821", "confidence": 0.98 },
    "TotalAmount":   { "value": "12450.00",      "confidence": 0.91 },
    "InvoiceDate":   { "value": "2025-11-15",    "confidence": 0.76 }
  }
}
```

In your flow, check `confidence < 0.8` for each field and set a `RequiresReview` column to `Yes` accordingly.

---

## Bulk Configuration with PnP PowerShell

If you need to apply a trained model to multiple libraries or sites, use PnP PowerShell instead of clicking through the UI for each library.

### Connect and apply a model to a library

```powershell
# Connect to the site
Connect-PnPOnline -Url "https://contoso.sharepoint.com/sites/Finance" -Interactive

# Get the available models
$models = Get-PnPSyntexModel
$models | Select-Object Name, Id, ModelType

# Apply a model to a document library
$model = Get-PnPSyntexModel -Identity "Invoice Processing"
Publish-PnPSyntexModel -Model $model -ListWebUrl "https://contoso.sharepoint.com/sites/Finance" -List "Invoices"
```

### Apply to multiple libraries in bulk

```powershell
Connect-PnPOnline -Url "https://contoso.sharepoint.com/sites/Finance" -Interactive

$model = Get-PnPSyntexModel -Identity "Project Approval Form"

$libraries = @(
    @{ SiteUrl = "https://contoso.sharepoint.com/sites/ProjectA"; ListName = "Documents" },
    @{ SiteUrl = "https://contoso.sharepoint.com/sites/ProjectB"; ListName = "Approvals" },
    @{ SiteUrl = "https://contoso.sharepoint.com/sites/ProjectC"; ListName = "Forms" }
)

foreach ($lib in $libraries) {
    Write-Host "Applying model to $($lib.SiteUrl) / $($lib.ListName)..."
    Publish-PnPSyntexModel -Model $model `
        -ListWebUrl $lib.SiteUrl `
        -List $lib.ListName
    Write-Host "Done." -ForegroundColor Green
}
```

### Check model application status

```powershell
# List all libraries where the model is applied
$model = Get-PnPSyntexModel -Identity "Invoice Processing"
Get-PnPSyntexModelPublication -Model $model | 
    Select-Object TargetSiteUrl, TargetWebUrl, TargetLibraryServerRelativeUrl, PublicationStatus
```

---

## Conclusion

SharePoint Premium AI document processing is a genuine time-saver for organisations dealing with high volumes of structured documents. Prebuilt models provide immediate value with zero configuration, while custom models handle organisation-specific document types with impressive accuracy once trained on even a small corpus. Pairing the extracted metadata with Power Automate flows creates end-to-end automation that eliminates manual data entry and routes documents intelligently. Use PnP PowerShell to scale the configuration across your tenant efficiently.

---

## References

- [SharePoint Premium (Syntex) overview](https://learn.microsoft.com/microsoft-365/syntex/syntex-overview)
- [Overview of document processing in SharePoint Premium](https://learn.microsoft.com/microsoft-365/syntex/document-understanding-overview)
- [Prebuilt models in SharePoint Premium](https://learn.microsoft.com/microsoft-365/syntex/prebuilt-overview)
- [Apply a model to a library using PnP PowerShell](https://learn.microsoft.com/microsoft-365/syntex/powershell-syntex-publishing)
- [Use a document processing model in Power Automate](https://learn.microsoft.com/microsoft-365/syntex/automate-document-processing-power-automate)
