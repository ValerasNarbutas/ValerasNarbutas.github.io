---
layout: page
title: "~/archive"
description: "all posts, chronologically"
permalink: /archive/
---

{%- assign posts_by_year = site.posts | group_by_exp: "post", "post.date | date: '%Y'" -%}

{%- for year_group in posts_by_year -%}
<div class="archive-year">
  <h2 class="archive-year-title">
    {{ year_group.name }} <span>({{ year_group.items.size }} post{% if year_group.items.size != 1 %}s{% endif %})</span>
  </h2>

  {%- for post in year_group.items -%}
  <div class="post-item">
    <time class="post-date" datetime="{{ post.date | date_to_xmlschema }}">
      {{ post.date | date: "%Y-%m-%d" }}
    </time>
    <a class="post-title-link" href="{{ post.url | prepend: site.baseurl }}">{{ post.title | escape }}</a>
    <div class="post-tags">
      {%- for tag in post.tags limit:2 -%}
      <span class="tag">{{ tag }}</span>
      {%- endfor -%}
    </div>
  </div>
  {%- endfor -%}
</div>
{%- endfor -%}
