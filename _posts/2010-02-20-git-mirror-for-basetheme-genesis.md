---
layout: post_archive
title: Git mirror for Basetheme Genesis
created: 1266679732
tags:
- project management
- php
- design
- theming
- css
- drupal
- drupal
lang: en
---
The fabulous basetheme [Genesis](http://drupal.org/project/genesis) is now [mirrored on Git](http://github.com/berkes/Genesis). This has several advantages. A basetheme is used as scaffolding for your own theme. During upgrades and bugfixes, however, your altered version will be hard to keep in sync. Usually this costs a lot of manual labour; eliminating one of the advantages of a basetheme: continuous re-use of existing work.

With git this becomes really easy. As long as you don't completely overhaul the base (core) of genesis, you can git-clone and git-merge all the future development on this base theme into your derivative! The cron and synchronisation-scripts are based on [Mikkel Høgh's](http://mikkel.hoegh.org/blog/2008/feb/19/a_git_mirror_for_drupal_cvs/) Drupal core synchronisation-work. Please be aware that I create and maintain this mirror for personal use, so there is no guarantee that I will continue doing so. When I no longer use genesis (not anytime soon, I expect) or when my synchronisation server breaks or when I finally decide to become a fulltime bike repair man, updates will probably no longer come in.
