---
layout: page
title: "~/tags"
description: "browse posts by tag"
permalink: /tags/
---

{%- assign sorted_tags = site.tags | sort -%}

<div class="tag-cloud">
  {%- for tag in sorted_tags -%}
  <div class="tag-item">
    <a href="#{{ tag[0] }}">{{ tag[0] }}<span class="tag-count"> ({{ tag[1].size }})</span></a>
  </div>
  {%- endfor -%}
</div>

<hr>

{%- for tag in sorted_tags -%}
<div id="{{ tag[0] }}" style="margin-bottom:32px;">
  <h2 style="color:#555;font-size:13px;margin-top:0;margin-bottom:12px;">
    <span style="color:#333">#</span>{{ tag[0] }}
    <span style="color:#333;font-size:11px;">({{ tag[1].size }})</span>
  </h2>

  {%- for post in tag[1] -%}
  <div class="post-item">
    <time class="post-date" datetime="{{ post.date | date_to_xmlschema }}">{{ post.date | date: "%Y-%m-%d" }}</time>
    <a class="post-title-link" href="{{ post.url | prepend: site.baseurl }}">{{ post.title | escape }}</a>
    <div></div>
  </div>
  {%- endfor -%}
</div>
{%- endfor -%}
