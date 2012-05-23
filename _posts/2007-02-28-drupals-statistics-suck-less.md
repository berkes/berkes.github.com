---
layout: post_archive
title: Drupal's statistics suck.(less?)
created: 1172682771
tags:
- Server
- Drupal Talk
- Drupal Hosting
- Drupal
lang: en
---
There, got your attention. Still, this is an often heard complaint, most of the times in nicer words though. Just look at the [large amount of requests (with patches) for the statistics module](http://drupal.org/project/issues?projects=3060&components=statistics.module&categories=task,feature&states=1,16,8,13,14,15). Nearly all of them cover things such as 'don't track this and that', or 'also track foo'. And apparently, it seems even [Dries](http://buytaert.net/) agrees. Or at least he seems to need [more statistics](http://www.w3counter.com) then only those provided by Drupal:

    <!-- Begin W3Counter Tracking Code -->
    <script type="text/javascript"
       src="http://www.w3counter.com/tracker.js">
    </script>
    ...
    <!-- End W3Counter Tracking Code-->

Drupal logs far too little data, to be of real use. And worse, the display of that data is even less useful for any [serious investigation](http://www.maxkiesler.com/index.php/weblog/comments/data_visualization_software_resources_tutorials_and_source_code/). Today I updated [xstatistics](http://www.webschuur.com/modules/xtatistics) so that it contains a feature that many people wanted (and I too) base referrers.

![Screenshot of Table with referrers by base](http://webschuur.com/sites/webschuur.com/files/base_referrer.png)
_note the horrible translations ;)_

I thought this would be a good moment to give this module some publicity, because with little effort we can make xstatistics into _the_ addition to Drupals statistics to make them suck less.

Right now, xstatistics features a small summary of your site (amount of external referrers etceteras) and a usage overview (amount of comments, amound of users etceteras), and [as of today](http://cvs.drupal.org/viewcvs/drupal/contributions/modules/xstatistics/xstatistics.module?r1=1.6.2.2&r2=1.6.2.3&only_with_tag=DRUPAL-4-7) a way to read base referrers. Instead of seeing drupal.org/foo/bar and drupal.org/ghee/wiz as two separate referrers, this table shows them grouped by base url, so you can see how much people actually come from drupal.org.

But wait! More is coming: I have a "search words referrer feature" in the pipeline. This page would show what phrases and words people searched for on google, Yahoo etceteras when they came to your site. 

Meanwhile there is a lot of cool stuff that could be looked into. Not including [immense graph generation libraries](http://drupal.org/node/37574), but rather, things like better consistency and modularity (so that you/your modules can easily add new summaries), and another personal pet peeve: tracking of user-agents (how many mozilla users visited your site).
A last thing that I want to add, is a way to store the aggregated information into new tables. So that, when the accesslogs are purged, the counter values are kept.
