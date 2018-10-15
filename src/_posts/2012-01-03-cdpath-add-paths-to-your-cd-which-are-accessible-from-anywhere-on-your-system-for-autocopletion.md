---
layout: post_archive
title: CDPATH, add paths to your "cd" which are accessible from anywhere on your system
  for autocopletion.
created: 1325581764
tags:

lang: en
---
Whenever you use the commandline a lot, you will be browsing to certain directories a lot. Most graphical filebrowsers offer some sort of bookmarking system. So that you can browse to the place where you have your invoices with only two clicks, instead of clicking all trough Documents » Administration » Finance » 2012 » 01. 

Bash has something similar, but as always with the commandline, more powerfull: [CDPATH](http://www.caliban.org/bash/#bashtips).

I have several CDPATH entries set, for example on my desktop machine: 

`export CDPATH=~/Documenten:~/Documenten/Administratie/Facturen/huidig_jaar/`

And on my webservers:

`export CDPATH=/var/www`.

The first, for example allows me, regardless of the current active directory, to type `cd <tab>` to show all active projects. Typing `cd MCD_<tab><enter>` will expand to the project `cd MCD_my_current_drupal` and open the directory `/home/ber/Documenten/MCD_my_current_drupal/`. 

One of those tiny settings that make a small thing a little more efficient. And because I type that several hundreds of times each week, it's overall benefit is rather large. 
