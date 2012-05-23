---
layout: post_archive
title: The CMC and CMF landscape
created: 1167131788
tags:
- Drupal
- Project Management
- PHP
- Drupal Talk
- Ruby
- Ruby on Rails
lang: en
---
'[Drupal considered dangerous](http://poorbuthappy.com/ease/archives/2006/12/09/3382/drupal-considered-dangerous-for-startups)' has been echoing trough the RSS feeds for the last days. More often then not, the word Ruby has been mentioned. To kill some FUD before it is even spread, I wrote a short intro on [what Ruby and Ruby on Rails are](http://groups.drupal.org/node/2176), and how they stand newt to Drupal.

But there is more. Sure, Drupal can be considered dangerous, so should [Perl, and Java be, and the same can be said about Wordpress, phpBB etceteras](http://www.nicklewis.org/node/898).

To state the obvious: For every problem there is a perfect solution. And not the other way around: For every perfect solution there is a problem. What I am saying is: Don't consider Drupal the perfect solution for each problem. Don't think That Ruby on Rails equals [forty two](http://www.google.com/search?hl=en&q=answer+to+life+the+universe+and+everything).

To illustrate that, I put several solutions for your website in a diagram. This diagram is valid for most, __but certainly not all__ website-development-projects; complete websites, not small improvements to existing sites.
On the y-axis we see the amount of effort (development Time, development budget) needed to get a website up. On the x-axis we see the amount of flexibility we want to have. 
Every "solution" has an area in which it can be deployed, this is marked by an ellipse around the logo of the solution.

![CMF land](http://webschuur.com/sites/webschuur.com/files/cmf_land_0.png)
<!--break-->

Some examples might clarify this a bit better: 
Take a simple blog: wordpress is all ready-to-go for blogging. Your flexibility, however, is rather limited to that blogging: you won't get the flexibility to run forums off wordpress. phpBB  sits in the same ellipse: Its good to run bulletinboards, but its near impossible to use for your brochure site.

On the very far end of the spectrum, we see the 'raw' languages: They give you all the freedom you'l ever need and want, but it comes at a cost of effort: you'll be on your own, and need to do it all by yourself. Ruby on Rails and Drupal sit in the middle, both have their own area and both overlap a little. 

I'll also need to stress what this does __not__ show: If you want to stretch, e.g. Drupal, beyond the grey ellipse, the required effort (costs!) will shoot up: using Drupal for something it is not good at, _is considered dangerous_. No-one should even think of running a brochure site on phpBB, for a client with very specific design wishes. No-one with a bit of sense should consider building a bells-and-wistles-weblog in Perl, when the budget is limited.
