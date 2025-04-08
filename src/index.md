---
layout: default
title: Bèr ‘berkes’ Kessels
---
{% include setup.yml %}

<div class="row">
<section class="six columns about" lang="en">
<h2>About Bèr Kessels</h2>
<p>
I am Bèr Kessels, a freelance software developer. I develop cutting edge
software and web-applications, with Open Source and modern technology.
<br/>
<a href="about.html">More »</a>
</p>
</section>
<section class="six columns about" lang="nl">
<h2>Over Bèr Kessels</h2>
<p>
Ik ben Bèr Kessels, een freelance softwareontwikkelaar. Ik ontwikkel geavanceerde software en web-applicaties met behulp van Open Source en moderne techniek.
<br/>
<a href="over.html">Meer »</a>
</p>
</section>
</div>
<div class="row">
<section class="six columns posts" lang="en">
<h2>English Articles</h2>
<ul class="posts">
  {% assign counter = '.' %}
  {% for post in site.posts %}
    {% if counter.size <= 25 and post.lang == nil or post.lang == "en" %}
      {% capture counter %}{{ counter | append:'.' }}{% endcapture %}
      {% include li_for_post_with_date.yml %}
    {% endif %}
  {% endfor %}
</ul>
<a href="archive.html">Archive »</a>
</section>
<section class="six columns posts" lang="nl">
<h2>Nederlandse Artikelen</h2>
<ul class="posts">
  {% assign counter = '.' %}
  {% for post in site.posts %}
    {% if counter.size <= 25 and post.lang == "nl" %}
      {% capture counter %}{{ counter | append:'.' }}{% endcapture %}
      {% include li_for_post_with_date.yml %}
    {% endif %}
  {% endfor %}
</ul>
<a href="archief.html">Archief »</a>
</section>
</div>
