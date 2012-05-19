---
layout: page
title: Bèr ‘berkes’ Kessels
tagline: Supporting tagline
---
{% include JB/setup %}
<section class="posts nl" lang="nl">
## Nederlandse Artikelen ##
<ul class="posts">
  {% for post in site.posts %}
    {% if post.lang == "nl" %}
      <li><span>{{ post.date | date_to_string }}</span> &raquo; <a href="{{ BASE_PATH }}{{ post.url }}">{{ post.title }}</a></li>
    {% endif %}
  {% endfor %}
</ul>
</section>
<section class="posts en" lang="en">
## English Articles ##
<ul class="posts">
  {% for post in site.posts %}
    {% if post.lang == nil || post.lang == "en" %}
      <li><span>{{ post.date | date_to_string }}</span> &raquo; <a href="{{ BASE_PATH }}{{ post.url }}">{{ post.title }}</a></li>
    {% endif %}
  {% endfor %}
</ul>
</section>
