---
layout: post_archive
title: Sympal scripts vs. or with Civicspace installer
created: 1147334641
tags:
- project management
- php
- server
- drupal talk
- sympal.nl
- ruby on rails
lang: en
---
Yesterday <a href="http://www.digitaldivide.net/blog/geilhufe">David</a> pointed me at a <a href="http://www.youtube.com/watch?v=COg-orloxlY">cool screen-cast</a> of the Civicspace (CS) installer. His question was, how much Sympal scripts and its install system could use from and be used by the CS installer. Because I got this kind of questions more often, here is a summary and a small status report. 

Here is what I need and what I have resources for:
<ul>
<li>Sympal is all command-line based. Consultants and developers have command-line skills. (or else they should get another Job :)) )</li>
<li> Sympal aims at the Ruby on Rails way of "installing" and "developing". I have modeled it after that, only that I coded it in PHP and not Ruby :)</li>
<li> Sympal is NOT a single-Drupal Installer. It assumes a working and installed Drupal. It allows multisite installations. (however, I am working on an SVN checkout of The First Drupal Installation)</li>
</ul>
About the install profiles:
Right now I have a directory "templates". Inside that directory there are all sorts of templates. Sympal scripts will run over these templates, do token-replacement, and e.g build modules from them and place them under 
sites/foobar.com/modules. Same for themes. If there are .sql files in there, they will be parsed and then injected in the DB (handy to create initial nodes, for example).

Next step, however, is fixtures: A fixture is a way of "saving" a certain state of a site. It stores your nodes, configuration and other things (terms, roles, etc).
A fixture will be imported on installation too. A fixture is a pure PHP dump (par example: a node is a full blown PHP object).

So all in all, I think we have different aims: You want to suitclick-n-point-ready-to-go-Drupal-users.
I aim at the consultants and developers who use Drupal as a development 
environment. Because I beleive there is far more need for that. *)

*) I have never been able to deploy a single Drupal site without hacking at least SOME code. Ready-to-go-click-n-point sites are IMO more a task for Bryghts and Sympals. So even If i could install it in my browser, I would still needs ssh/(s)ftp to hack up my themes and change A Module to work together with Another Module.

BTW My scripts are tied to plesk and <a href="http://dischosting.sourceforge.net/">dischosting</a> too, and a new multisite is created for each domain when plesk creates it. It works. so, the netto result is that even consultants no longer need command-lines :), they can just use plesk (or preferably a Free system).
