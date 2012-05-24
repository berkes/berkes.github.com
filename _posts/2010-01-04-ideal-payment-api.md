---
layout: post_archive
title: Ideal Payment API
created: 1262634495
tags:
- Programming
- PHP
- Tips and tricks
- Drupal Talk
- Drupal
- Drupal Blog
lang: en
---
[iDeal](http://nl.wikipedia.org/wiki/IDEAL) is a Dutch, online payment system, widly adopted, but hard to implement. In Drupal there are several iDeal implementations for [übercart](http://drupal.org/project/uc_ideal), but none are very solid and none are easy to implement. Moreover: the iDeal übercart implementations lack some error handling, which may not matter for smaller sites, but for large payment flows, this is far from ready. I therefore had the iDeal part extracted from übercart and made into a more general payment API. One that can potentially be used on übercart, e-commerce and your own implementation. But not just code. iDeal is not about the code, so much, but more about how to get it running, configured and how to get all the parameters right. Between the banks, and the account you have, technical differences make it extremely complex to Get Running with one base. This makes Documentation just as importants as code. Probably even more important for those not really into iDeal implentations. I have [released](http://github.com/berkes/Drupal-iDeal-payment-api/) that API ([Download](http://github.com/berkes/Drupal-iDeal-payment-api/downloads) [tgz](http://github.com/berkes/Drupal-iDeal-payment-api/downloads/berkes/Drupal-iDeal-payment-api/tarball/6.x--0.1) | [zip](http://github.com/berkes/Drupal-iDeal-payment-api/downloads/berkes/Drupal-iDeal-payment-api/zipball/6.x--0.1)).

And I would really like it when people start looking at it, and shooting at it. I would also greatly enjoy receiving your own iDeal code, if you have any. Then, on the next Drupal-meeting in Netherlands, I will host and organise an iDeal code-sprint, so that we can get the documentation, code and what more up to a first working point. Mostly to centralise the development, but also to inform new iDeal-users to the status in Drupal and the route to take.
