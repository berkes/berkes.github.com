---
layout: page
title: Bèr ‘berkes’ Kessels
tagline: Supporting tagline
---
{% include JB/setup %}

<div class="row">
<section class="six columns about" lang="nl">
<h2>Over Bèr Kessels</h2>
<p>
Ik ben Bèr Kessels, een freelance webontwikkelaar. Ik focus me op
het ontwikkelen en marketen van <em>cutting edge</em> websites, 
met Open Source technologie.
<br/>
<a href="over.html">Meer »</a>
</p>
</section>
<section class="six columns about" lang="en">
<h2>About Bèr Kessels</h2>
<p>
I am Bèr Kessels, a freelance webdeveloper, focused on development and
marketing of cutting edge websites, with Open Source technology.
<br/>
<a href="about.html">More »</a>
</p>
</section>
</div>
<div class="row">
<section class="six columns posts" lang="nl">
<h2>Nederlandse Artikelen</h2>
<ul class="posts">
  {% for post in site.posts limit:50 %}
    {% if post.lang == "nl" %}
      <li><span>{{ post.date | date_to_string }}</span> &raquo; <a href="{{ BASE_PATH }}{{ post.url }}">{{ post.title }}</a></li>
    {% endif %}
  {% endfor %}
</ul>
<a href="artchief.html">Archief »</a>
</section>
<section class="six columns posts" lang="en">
<h2>English Articles</h2>
<ul class="posts">
  {% for post in site.posts limit:50 %}
    {% if post.lang == nil or post.lang == "en" %}
      <li><span>{{ post.date | date_to_string }}</span> &raquo; <a href="{{ BASE_PATH }}{{ post.url }}">{{ post.title }}</a></li>
    {% endif %}
  {% endfor %}
</ul>
<a href="archive.html">Archive »</a>
</section>
</div>
