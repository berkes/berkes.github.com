---
layout: page
title: Bèr ‘berkes’ Kessels
tagline: Supporting tagline
---
{% include JB/setup %}

<div class="row">
<section class="six columns about nl" lang="nl">
<h2>Over Bèr Kessels</h2>
<p>
Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod
tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At
vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren,
no sea takimata sanctus est Lorem ipsum dolor sit amet. <br/>
<a href="over.html">Meer »</a>
</p>
</section>
<section class="six columns about en" lang="en">
<h2>About Bèr Kessels</h2>
<p>
Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod
tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At
vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren,
no sea takimata sanctus est Lorem ipsum dolor sit amet.<br/> 
<a href="over.html">More »</a>
</p>
</section>
</div>
<div class="row">
<section class="six columns posts nl" lang="nl">
<h2>Nederlandse Artikelen</h2>
<ul class="posts">
  {% for post in site.posts %}
    {% if post.lang == "nl" %}
      <li><span>{{ post.date | date_to_string }}</span> &raquo; <a href="{{ BASE_PATH }}{{ post.url }}">{{ post.title }}</a></li>
    {% endif %}
  {% endfor %}
</ul>
<a href="artchief.html">Archief »</a>
</section>
<section class="six columns posts en" lang="en">
<h2>English Articles</h2>
<ul class="posts">
  {% for post in site.posts %}
    {% if post.lang == nil or post.lang == "en" %}
      <li><span>{{ post.date | date_to_string }}</span> &raquo; <a href="{{ BASE_PATH }}{{ post.url }}">{{ post.title }}</a></li>
    {% endif %}
  {% endfor %}
</ul>
<a href="archive.html">Archive »</a>
</section>
</div>
