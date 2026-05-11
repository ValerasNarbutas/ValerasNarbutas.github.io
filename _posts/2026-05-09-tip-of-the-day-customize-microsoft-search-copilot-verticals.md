---
title: "Tip of the day – Customize Microsoft Search with Copilot and Vertical Search"
author: valeras
date: 2026-05-09 08:00:00 +0800
categories:
  - TipOfTheDay
  - Search
  - AI
  - Copilot
tags:
  - MicrosoftSearch
  - SearchVerticals
  - Copilot
  - SharePoint
  - AI
  - M365
  - tipoftheday
  - KnowledgeManagement
pin: false
slug: tip-day-customize-microsoft-search-copilot-verticals
comments: true
image:
  path: /img/posts/tip_microsoft_search_custom_verticals.png
  alt: Customize Microsoft Search with Copilot and Vertical Search
---

## Summary

Out of the box, Microsoft Search shows results across all content types. But for most organisations, that's not enough — users want to search specifically within **HR policies**, or **IT procedures**, or **project documents**, without wading through everything else. This is where **Search Verticals** come in. Combined with **Copilot answers**, custom verticals give you a targeted, AI-powered search experience built around how your organisation actually works.

---

## What Are Search Verticals?

A **Search Vertical** is a scoped search tab that filters results to a specific content set or source. You've seen them in action: in Bing, tabs like "All", "News", "Images", "Videos" are verticals. Microsoft Search lets you create your own.

Default verticals in Microsoft Search:
- All
- Files
- Sites
- People
- News

You can **add custom verticals** such as:
- HR Policies
- IT Knowledge Base
- Projects
- Customer Contracts
- Training Materials

Each custom vertical can filter by:
- Content source (SharePoint site, external connector, or specific library)
- Metadata (content type, department, date range)
- File type
- Managed metadata tags

---

## Creating a Custom Vertical

### Step 1 – Open the Admin Center

1. Go to [admin.microsoft.com](https://admin.microsoft.com)
2. Navigate to **Search & intelligence → Customizations → Verticals**
3. Click **+ Add**

---

### Step 2 – Configure the Vertical

| Field | Example Value |
|-------|--------------|
| Name | `HR Policies` |
| Content source | SharePoint Online |
| Query | `Path:"https://contoso.sharepoint.com/sites/HR"` |

The **Query** field is a KQL (Keyword Query Language) filter that scopes the vertical. Examples:

```kql
# Scope to a specific SharePoint site
Path:"https://contoso.sharepoint.com/sites/IT"

# Scope to a content type
ContentType:"IT Procedure"

# Scope to a specific file type within a site
Path:"https://contoso.sharepoint.com/sites/Projects" AND FileType:pdf

# Scope to a managed metadata tag
owstaxIdDepartment:"Information Technology"

# Combine conditions
Path:"https://contoso.sharepoint.com/sites/HR" AND FileType:docx
```

> KQL is powerful but unforgiving with syntax. Test your query in **SharePoint search** first — add `?k=yourquery` to a SharePoint search results URL to verify what it returns before saving it as a vertical.
{: .prompt-tip }

---

### Step 3 – Set Scope

Choose where the vertical appears:
- **Tenant-level**: visible in Bing for Business, SharePoint home search, and Office.com
- **Site-level**: visible only on that SharePoint site (configured per site by site admins)

For a company-wide HR vertical, choose **tenant-level**.

---

### Step 4 – Configure Result Types (Optional but Recommended)

**Result types** control how each search result is displayed in your vertical. Without a custom result type, every result looks like a generic file link.

With a custom result type, you can show:
- Document title + thumbnail
- Author and last modified date
- Custom metadata columns (e.g., "Policy owner", "Review date")
- A direct link button

To create a result type:
1. **Search & intelligence → Customizations → Result types**
2. Click **+ Add**
3. Choose your content source and vertical
4. Design the layout using the **Adaptive Card** designer

---

## Adding Copilot Answers to Your Vertical

This is where it gets powerful. You can configure **Copilot to provide AI-generated answers** at the top of your custom vertical results.

### How It Works

When a user searches in your HR Policies vertical, instead of just seeing a list of documents, they see:

```
🤖 Copilot Answer:
"Employees are entitled to 25 days of annual leave per year,
 as per the Annual Leave Policy (last updated March 2026).
 New starters in their first year receive a pro-rated allowance."

📄 Annual Leave Policy v3.docx — HR Site
📄 Leave Request Process.docx — HR Site
📄 Leave Calendar 2026.xlsx — HR Site
```

### Enabling Copilot Answers for a Vertical

1. When creating or editing a vertical, scroll to **Copilot answers**
2. Toggle **Enable Copilot answers** to On
3. Set the **content scope** — the same KQL query scopes the sources Copilot uses for its answer

> Copilot answers in search use the **semantic index** of your SharePoint content. Ensure your key policy documents are published and crawled before expecting accurate answers.
{: .prompt-warning }

---

## External Content Connectors

Custom verticals become even more powerful when combined with **Microsoft Search connectors** (formerly Graph connectors). These let you index external content into Microsoft Search:

| Connector | What It Indexes |
|-----------|----------------|
| Confluence | Wiki pages and spaces |
| ServiceNow | Tickets, knowledge articles |
| Salesforce | Opportunities, accounts, contacts |
| Azure DevOps | Work items, pull requests |
| Custom connector | Any REST API-accessible content |

Once a connector is set up, the external content appears in Microsoft Search and can be scoped to a custom vertical — just like SharePoint content.

To set up a connector:
1. **Search & intelligence → Data sources → + Add a connection**
2. Choose the connector type
3. Authenticate and configure the data source
4. Set up the content schema (which fields to index and display)
5. Run the initial crawl

After crawling, create a vertical that scopes to that connector source.

---

## Site-Level Vertical Configuration

For site owners who want custom verticals on a specific SharePoint site (not tenant-wide):

1. On the SharePoint site, go to **Settings (gear icon) → Site information → View all site settings**
2. Under **Search**, click **Search verticals**
3. Add a site-scoped vertical with KQL scoped to content within that site

> Site-level verticals are only visible when searching from that SharePoint site. They do not appear in the tenant-wide Microsoft Search bar.
{: .prompt-tip }

---

## Practical Example: IT Knowledge Base Vertical

Here's a complete configuration for an IT Knowledge Base vertical:

**Vertical config:**
```
Name:      IT Knowledge Base
Query:     Path:"https://contoso.sharepoint.com/sites/IT/KB" 
           ContentType:"Knowledge Article"
Scope:     Tenant-level
Copilot:   Enabled
```

**Result type config:**
```
Fields to show:
  - Title (linked)
  - Author
  - LastModifiedTime (formatted "Updated: {date}")
  - Column "KB Category" (managed metadata)
  - Column "Affected Systems"
```

**User experience:**
- User searches "VPN setup" from the M365 home page
- Clicks the "IT Knowledge Base" tab
- Copilot answer card appears: "To connect to VPN, install the Global Protect client from [link] and use your company credentials..."
- Below: filtered list of KB articles with category and system tags visible

---

## Monitoring Vertical Performance

After deploying custom verticals, monitor them via **Search & intelligence → Insights**:

- Which verticals are being used
- Top queries per vertical
- Queries with no results (content gaps)
- Click-through rates

Review monthly and add bookmarks or content for the top "no results" queries.

---

## Conclusion

Custom Search Verticals with Copilot answers turn Microsoft Search into a precision knowledge-retrieval tool tailored to how your organisation is structured. Combined with well-maintained content and external connectors, you can build a search experience that gives employees direct answers — not just a list of links — for the queries that matter most.

---

## References

- [Manage Search Verticals – Microsoft Learn](https://learn.microsoft.com/en-us/microsoftsearch/manage-verticals)
- [Manage Result Types](https://learn.microsoft.com/en-us/microsoftsearch/manage-result-types)
- [Microsoft Search Connectors](https://learn.microsoft.com/en-us/microsoftsearch/connectors-overview)
- [KQL Syntax Reference](https://learn.microsoft.com/en-us/sharepoint/dev/general-development/keyword-query-language-kql-syntax-reference)
- [Copilot Answers in Microsoft Search](https://learn.microsoft.com/en-us/microsoftsearch/overview-microsoft-search-bing#ai-powered-answers)
- [Search & Intelligence Admin Center](https://admin.microsoft.com/#/MicrosoftSearch)

---

## Image Prompt


