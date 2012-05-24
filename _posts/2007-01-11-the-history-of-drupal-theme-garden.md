---
layout: post_archive
title: The history of Drupal Theme Garden
created: 1168521149
tags:
- Theming
- Drupal Talk
- Drupal
lang: en
---
On [Drupal.org](http://drupal.org) I announced the discontinuation of [themes.drupal.org](http://themes.drupal.org/), better known as Drupal Theme Garden. A small history and some inside information on the reason for this discontinuation are on their place here, I think.

In the very beginning I had a Grand Plan: a small website, influenced by [CSS Zen Garden](http://www.csszengarden.com/), to showcase the beauty of some Drupal sites. To prove that "Drupal" is not equal to "geeky, or ugly sites". My idea was to collect cases and themes on this site, themes that showed what people had achieved with Drupal. Cases to explain how they used Drupal's theming power to get there. That is what I made, using flexinode and a themeswitcher, so you could try a theme on a real site. These themes were meant to be mostly preview only, not for download: their purpose was to show how good people can make Drupal look. Somehow, many people were very disappointed by this: I was even told in a comment, I was 'greedy' and 'selfish', because a good looking theme was not downloadable.

Other people were disappointed that we did not feature all contributed themes, but only a few that were considered 'good looking'. After all, I was meant to be a showcase of Drupal Beauty, not of Drupal [contributions](http://drupal.org/project/Themes).

So it showed that, apparently, there was more interest in a 'demo-space' for Drupal themes. When I moved the site into the new infrastructure of Drupal, that is what I made it: a demo place for all contributed 4.6 themes, which was the stable release at that time.

I have spent hours, days in total, reading trough all the contributed themes, to see if they did not contain ugly code that would potentially do the Drupal.org infrastructure any harm: Drupal themes are just PHP, they can potentially do 'anything'. And reading trough them proves the preoccupation that themers are not the best PHP developers...

Next, [Steven](http://www.acko.net) created an absolutely great default theme for this theme garden, called [The Garden Theme](http://themes.drupal.org/node?theme=garden). But he has no time to maintain that either, nor do I. [Internet Explorer has bugs that break this Garden Theme layout](http://drupal.org/node/79557), so this theme really needs some work, yet no-one can (make time to) fix this. These kind of maintenance tasks is what made me decide to simply discontinue the Theme garden.

Then 4.7 came out. with the new, flexible regions. These regions effectively broke the ability to switch themes in Drupal: a theme can now define any regions it wants: no longer is 'left and right' required, it can be anything from 'tools and related blocks' to 'before and after content'. Or anything that is more or less semantic. The problem is that themes actually used this, resulting in blocks not showing for certain themes. So the often heard idea 'make it like wordpress' is not as simple as it sounds: wordpress themes are all the same, with different CSS. Drupal themes can change really everything.

The other problem was that somehow themes were upgraded extremely slow for 4.7: it took over four months before we had the same amount of themes available for 4.7 then we had for 4.6. I wanted to upgrade the site only when there were at least the same amount of themes available, a theme-demo-site with only five themes does more harm then good.

It looks like 5.0 is going to take just as long: by the time of writing only seven (!) 5.0 compatible themes were ready.

I don't have the time to maintain themes.drupal.org, but more important: I don't have the time to read trough all the themes to see if they were actually coded anywhere close to decent. Nor do  have the time to build one of the biggest requirements for the theme demo-site: [a better interface](http://drupal.org/node/82340) (There is even a patch, thanks to agentrickard). When I mailed this to the infrastructure mailinglist asking what to do, I got one reply from someone who told me to have no time to spend himself (he actually contributed work to the theme garden before already), but that closing down would be a pity. I agree. But if not even the infrastructure people (they aer the ones 'running' Drupal) have interest in solving this matter, then the case is clear: there is too little real demand for a demo-space.

I -personally- believe an interface to browse through themes is a Drupal.org feature, and not a themes.drupal.org feature, but even in that case, the current system is not a good one: Drupal's flexibility and the themes actually using that flexibility (re: the blocks issue) make it impossible to create a good system inside the Drupal site that is the demo. What we actually need is something outside that site to select the themes, something like the [frame system](http://alexking.org/projects/wordpress/theme_browser.php) wordpress uses, or simply a better integration with Drupal.org, and Drupal.org providing the browsing interface, while themes only provides the actual switching of themes.

I don't have time to maintain the site, evaluate themes and so on. But more important, I never meant this site to be what it is now, so my interest in spending a lot of time on this is low: I wanted to build a site that shows how good Drupal can be used for beautiful sites, not a demo for contributed themes.

I therefore resign, and because no-one can, or wants to follow me up, I will close the site down.

And last, I must say sorry for not being able to achieve my ultimate goal: to make Drupal a friendlier place for designers and themers. The lack of interest in maintenance of the theme garden, the low volume of mails on the theme mailinglist, and the small amount of activity in the themers group show that Drupal is still not a place where themers and designers want to hang around, which was what I had in mind with the original plan!
