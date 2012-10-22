---
layout: post_archive
title: Choosing your system architecture for large scale Dupal deployment.
created: 1158663251
tags:
- php
- drupal
- drupal hosting
- sympal.nl
- ruby
- ruby on rails
- railfrog
lang: en
---
This is a [morphological overview](http://webschuur.com/sites/webschuur.com/files/vhost_admin_morpho.png), to display all te options for deploying a Drupal (and/ or Joomla!! or any other CMS) hosting system.

![morphological overview](http://webschuur.com/sites/webschuur.com/files/vhost_admin_morpho_lo_res.png)

##The way one should read it
In the first vertical column all "tasks" we need to perform are listed, chopped up into the smallest possible unit. Then next to each of these we render all possible tools and solutions for each task, **without taking in consideration how ill-suited these tools may be, nor how well they can, or will co-operate**. By refusing to look at possible solutions yet, we can make sure that we actually list all options.
Then we define possible solutions, by drawing lines to connect all the subsolutions. Example (not in the graph): Remote X for server management, Virtualmin for virtual-hosting management, FTP for installation, scripts for the user management. Only after we drew this line, we can give it a value. The abovementioned example makes little sense, since it has the bad sides of every option: complex, lots of overhead (a full KDE/Gnome for example) scripts that are none-existent, and a relatively insecure management system.
If we draw all the lines we can see all the possible solutions and only **then** choose the best options. Since there is never *A* best one, this method is a simple, and very effective to make sure the choice you made is not done because of pre-occupation, or lack of knowledge. People tend to think in terms of complete solutions and therefore often rule out options that would have been the perfect match for their case!
The background-color of the cell indicates the status or maturity of the option; The colors of lines are only used to be able to distiguish lines, they have nothing to do with the status/maturity!

## Red line: Over SSH
All administration over SSH, the standard *nix way.

* Pro: Very secure, very clean (requires minimum applications), very mature, full control and freedom, lots of documentation available.
* Con: Complex, high learning curve, management of large client bases requires a lot of work.

## Blue en pink lines: Inhouse scripts
This is additional to the 'red line' option. The scripts allow easier management of large client bases, and automate some of the more complex tasks.
The blue line uses [capistrano](http://manuals.rubyonrails.com/read/book/17), the fastgrowing Ruby deployment platform.
The pink line uses [Sympal scripts](http://webschuur.com/node/637) the in-house deployment platform for Drupal, in PHP.

* Pro: Equal to the 'red line'. In addition, deployment of large client-bases becomes easier. 
* Con: Still rather complex, with a steap learning curve. Far less documentation available. Many scripts are not released, not stable, or not compatible with Drupal or other tools yet.

## Orange line
These lines represent the 6(or more?) virtual admin tool options. SSH for server administration, SSH and/or FTP for installation of the Drupal or Joomla! sites, and a dedicated application for virtual domain administration. This is the 'classic' Virtual hosting provider setup. I left out Plesk and Vhost for one reason: the lines would clutter the graph too much.

* Pro: Proven technology, GUIs for administration, GUIs for resellers.
* Con: Applications are not distributed trough Debian channels, security is harder to follow up, Installation and upgrade requires recompilation. Apps often require very specific (and none standard) server configurations or applications. Some applications require relative big investments for licences, are closed source or are limited in what they can offer.

## Turquoise line
Webmin and virtualmin: full administration over the web, in the browser. Virtualmin is a plugin for webmin.

* Pro: GUIs for all tasks. Less error prone. All distributed trough Debian channels
* Con: Webmin knows [many security issues](http://webmin.com/security.html) (_note:_ other tools such as plesk are closed source, so they might be even more insecure, yet this is not testable). Virtualmin/webmin [might not stay in the Debian repositories](http://lists.debian.org/debian-devel/2005/12/msg00790.html) much longer.
