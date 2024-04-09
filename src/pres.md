---
layout: presentations
title: Presentations by Bèr ‘berkes’ Kessels
header: Presentations by Bèr ‘berkes’ Kessels
group: navigation
permalink: /pres.html
---

<ul class="posts">
{% for presentation in site.presentations %}
<li>
    <a href="{{ BASE_PATH }}{{ presentation.url }}.html">
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

