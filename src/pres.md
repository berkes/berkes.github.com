---
layout: presentations
title: Presentations by Bèr ‘berkes’ Kessels
header: Presentations by Bèr ‘berkes’ Kessels
group: navigation
permalink: /pres.html
---

<ul class="posts">
{% assign sorted_pres = site.presentations | reverse %}
{% for presentation in sorted_pres %}
<li>
    <a href="{{ BASE_PATH }}{{ presentation.url }}">
        <span>
            {{ presentation.date | date: "%B %e, %Y" }}
        </span>
        &raquo;
        <span>
            {{ presentation.location }}
        </span>
        &raquo;
        {{ presentation.title }}
    </a>
</li>
{% endfor %}
</ul>

