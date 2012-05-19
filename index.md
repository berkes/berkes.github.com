---
layout: page
title: Bèr ‘berkes’ Kessels
tagline: Supporting tagline
---
{% include JB/setup %}

<section class="about nl" lang="nl">
## Over Bèr Kessels 

Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod
tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At
vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren,
no sea takimata sanctus est Lorem ipsum dolor sit amet.
</section>
<section class="about en" lang="en">
## About Bèr Kessels 

Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod
tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At
vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren,
no sea takimata sanctus est Lorem ipsum dolor sit amet.
</section>

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
