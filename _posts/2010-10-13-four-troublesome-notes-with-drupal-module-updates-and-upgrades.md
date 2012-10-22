---
layout: post_archive
title: Four troublesome notes with Drupal module-updates and upgrades.
created: 1286960488
tags:
- project management
- drupal
- drupal
lang: en
---
On [stackoverflow](http://stackoverflow.com/questions/3920629/how-to-upgrade-drupal-modules/3922112#3922112), I wrote an answer to someone having issues with Drupal module-upgrades. Something I thought worth noting down here too. There are many gotcha's in module-upgrades, that people find out sooner or later. Often found out in not-so-nice-ways. :)

 1. Not all module developers think the same about dot (minor) releases: sometimes 5.x-1.2 and 5.x-1.3 are major rewrites or come with completely new features, themeable-functions, pages or APIs.
 1. Not all upgrades are compatible with others. Sometimes you cannot update module B to 6.x-1.4, because of its dependency with A, when A is not compatible with 6.x-1.4 (yet). Drupal does not support dependencies on versions.
 1. Major releases _imply_ (but do not guarantee) incompatibility, or even complete rewrites: Upgrading from 5.x-1.4 to 5.x-2.1 might force major rewrites of custom code, including your theme.
 1. Security updates often are dependent on earlier releases: 6.x-1.2 might introduce new features (that you do not want, or wish to ignore), 6.x-1.3, can be a security-release that requires (some of the) the changes in 6.x-1.2 to be available. You must then either fiddle around with patches, or go trough that feature release anyway.

Off course there are all these other notes to take, such as database-migrations (that might go wrong and destroy or break all your heard-earned data), new-features-come-whith-new-bugs problems, your own, custom code breaking on a new version, etceteras. But you already knew that, did you not? :)
