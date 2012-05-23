---
layout: post_archive
title: To Drupal or not to Drupal, why we chose not to use Drupal for a photo shop.
created: 1154077078
tags:
- Drupal Talk
- Newsphoto EU
lang: en
---
In a thread on the Drupal development mailinglists someone asked for experience with Drupal as a photo and image server.
I developed <a href="http://www.newsphoto.nl/">Newsphoto</a> a few months ago, with Drupal. But after about half a year of development we decided to buy a commercial application wich fitted almost exactly within our defined "boundaries".

Dries:

    It would help if you'd explain why you threw out Drupal.  Without   
    that information, your e-mail has _no_ added value.  So care to  
    elaborate?

Off course I do, and because it is such a long story, I decided to put it in my blog. For better (future) reference. 

Two reasons made us decide not to use Drupal after that long development: first of all, we (developers and client) needed a working solution now. Not somewhere in months, but yesterday. Second is Drupals rather "stiff" concept. 

## Solution Now [TM]:
We all know, that with the proper amount of resources, a certain amount of time and a nice budget, you can turn Drupal into about anything you wish. 
But if you take that budget, minus 90% you can buy commercial tools that do what you need, but do it now!
When I say "now" I mean the moment we choose to no longer use Drupal.
Drupal can potentially do about everything. Potentially. But it does not do that right now. Features we needed "now" include (but are not limited to)

  * per-user-galleries, per-date-galleries. I developed shazamgallery in
combination with views and themes to do this.
  * [ecommerce](http://drupal.org/project/ecommerce). Drupals e-commerce works, and without wanting to put down 
any-ones hard work and huge effort: Drupals ecommerce is far from prime-time ready. We needed it months ago when it was even further from ready (aka did not work at all). 
  * more "commercial" access. Drupals access models are fine for open communities, but there are no [fine grained access controls](http://drupal.org/node/5229) for content. It all depends on the definition of "fine grained" and "access control" off course. But simple things as "only paying members can read blogs" are not (really) possible. Another, more specific example: Show only the largest X amount of resolutions to users. Show the largest resolutions to those who payed. Show only thumbnails to users and larger images to registered users. 
  * Watermarking, highlighting, grey-scaling, cropping, and more advanced image actions. There are proofs of concepts (e.g. in my sandbox) but these too are far, far from ready/prime time.

To go short: Drupal may be able to do everything. In future. But it does not do this now! Other tools do this now. [Ktools.net's photostore](http://ktools.net/photostore/) is what we use now. That is $295 for a tool that does all that I mentioned above, all that we needed right now. For that price I cannot even configure ecommerce!

## Stiff Drupal 
Drupal has a lot of things baked right into its core. Sure, it is probably the most flexible CMS of all CMSes. But the moment you go for Drupal you draw lines (boundaries) around your projects. As long as your and your clients' wishes remain within these boundaries, you will find yourself a happy developer. But don't try to go outside these boundaries. 
You want to disallow access to certain node types, because your business model needs that? bad luck (or big development budget). Your client does not like the fact people can search for users? Bad luck, you'll probably need a core hack. Or the users are confused because they cannot find their (buddies) user profiles in that same search? Your client wants comment forms where people must leave only the email-address, but are not presented with a web-url form? You need a login/user system without need of registration with email validation?

These are only examples that sometimes have (rather simple) solutions for each of them (resp. a CRUD node access module, a minor core hack, a form_alter). But put them all together and you get a development route of 
weeks, instead of hours, to meet only these specific (basic) requirements. Sometimes these simple requirements bring you into a "downward spiral" of hack upon hack, module upon module. That is a good moment to look wether or not you are actually still working with Drupal, or fighting against Drupal.

If you, your client and your project have set only a rough outline and fuzzy goals, Drupal is certainly the right tool. But as soon as your audience, the time-frame and/or the client have very specific needs, Drupal will prove very stubborn. Simple things, such as the above-mentioned no-search-for-users, can become nasty long-winded projects, if you wish to do them right. 

This, by the way is certainly not a Drupal problem. __Every single CMS out there has this problem__. Some have it more others less. I think Drupal has it less. But it means that you have to start with a tool that sits within your projects boundaries. Sometimes Joomla! overlaps better, other times it is Wordpress and again other times nothing fits it, which means Ruby on Rails is a good candidate to build your own CMS from scratch!

Drupal is a good tool, but not The One Tool. Never forget that you, as Drupal developer, have the conditions under wich your (future) sites are running, hardwired into your brain. Because after lots of Drupal development you start to think that the Drupal Way is The Only Way (this is a joke, people!).
