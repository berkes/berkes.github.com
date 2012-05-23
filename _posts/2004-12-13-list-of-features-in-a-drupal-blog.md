---
layout: post_archive
title: List of features in a drupal blog
created: 1102967381
tags:
- Weblogging
lang: en
---
This page lists the features that are required to have a state-of-the-art drupal based weblog.
Assumed is, that you want a personal weblog with some images, and occasionally a file.

First you need to make the choise how you are going to create your weblog entries. Some wish to have full power over each page they make. For them I suggest: leave drupal, and get dreamweaver or frontpage.
Other want some power, for example where to place images, where to add style, html and other data, in each post.
The best practive, however, is to think of a strict layout for each page, and dont allow any difference. If you think about this layout well, you will find that you need no power over your pages at all. 

So lets assume the case where you wish only little power: 
we now need to define all data into structured data, and inline data. Inline data, is something like a weblink, or a quote. All other data (images, categories, files, and dates) are considered structureal data.

Of course we will allow our visitors to comment. We like to keep a well structured categorisation system, and we like to archive our older blogs on date, and have them searchable.

For all our content, we need only one module: flexinode. For the categorising, we use taxonomy, for the commets comment module, and for easier writing we use quicktags.

Additionally we need some typical bloggers tools like: trackback, comment spam fighting, aggregation, and feed creation.

this leaves us with a clear list of all modules:
* flexinode
* comment
* taxonomy
* aggregator
* search
* archive
* spam
* trackback
* quicktags

for the backend we need:
* node
* statistics
* ping
* filter
* admin

all other modules can be removed. You might ask "why not use blog.module?". Well, blog.module is a module aimed at communties with webloggers. It makes no sense to install it on your personal weblog, since there is no community, weblogging, only you are.
