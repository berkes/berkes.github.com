---
layout: post_archive
title: Early announcement of sympal distro
created: 1139818819
tags:
- Drupal Talk
- sympal.nl
lang: en
---
I originally posted this on the Drupal Consultants mailinglist, but thought it might be nice to put on the web.

I am still working furiously on the Sympal distro (formerly known as DrupalCOM). 100% aimed at (savvy) consultants (IE those not afraid to learn some minor PHP and use the Command line). I am still running after HEAD, and expect to release the first version soon after the 4.7 release (whenever that may be.... :) ).<!--break-->

Features:
<ul>
<li>views.module</li>
<li>image.module</li>
<li>simplenews.module</li>
<li>sections.module</li>
<li>dashboard.module (not sure, only if we manage to use this while still be able to avoid PHP pages)</li>
<li>prototype.module (the developers API toolbox for prototype/scriptaculous AJAX support)</li>
<li>(and all of core, minus a few crufty modules, if CVS lets me do that easily)
<li>A lot of code generation and management scripts. </li>
<li>A commandline installation script system (multisite environments only) fully integratable in your provisioning system</li>
<li>the_site_name_custom_blocks.module (To put the PHP blocks for that client)</li>
<li>the_site_name_custom_views.module (To put the custom PHP for views)</li>
<li>the_site_name_custom_pages.module (To paste your custom PHP pages)</li>
<li>microcontent.module (blocks are nodes, mission and footer and all are nodes and blocks too, thus finer grained access and simpler editing for your clients)</li>
<li>wireframe theme</li>
<li>admin theme</li>
<li>the_site_name theme</li>
</ul>
My problem is mostly time. I really want to get this rolling, but I really lack the time to take a lead on a team of (volunteers) or something alike. If you are interested, I would love it if you take some time to look at <a href="http://drupal.org/project/sympal_scripts">Sympal_scripts</a> (in Drupal CVS contributions/tricks) and file extra scripts for that into CVS. Mainly I am looking for postinstall.d/create_users.php and preinstall.d/create_database.php. But I am sure you have more and better ideas. Another thing you can test and improve is the <a href="http://drupal.org/node/43839">microcontent</a>, for that is a main part of the distro too. It tries to pull all sorts of content that we hide in the administration to the user-  and moderator-space.

The philosophy is «<em>Sympal for developers. Developers for the users</em>» Meaning you do all the administration, all the development and configuration. Your users/clients should theoretically not even need to have admin rights....

The idea is all based on the agile development methods in <a href="http://www.rubyonrails.org/">Ruby on Rails</a>: You invoke a commandline script. That generates code for you. For example
path/to/scripts/generate_node.

PHP simplenode news newsitems will add a 
modules/news/news.module that allows users to add "newsitems" built after a "template module" called "simple" (story rip-off). And it will add a themes/the_site_name/node-news.tpl.php
(obviously the_site_name is replaced by acmeinc_com for example)
