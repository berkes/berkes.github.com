---
layout: post_archive
title: ! 'Multisite: where to put what: files and directory layout'
created: 1130448576
tags:
- drupal hosting
lang: en
---
For our new multisite environement we are buidling, I need to get the initial set up correctly done. We work wit vhosts, so that dicatates very much how and where the files and repositories aer located. <!--break-->## Drupal Root
[Obviously](http://debian.org) Drupal itself is located in _/var/www/drupal_, owned by root. Safe, and secure. It is a cvs checkout, so that in future we can track patches and so against drupals latest stable.## Drupal Contributions
I prefer to track all repositories in CVS too. Later we will move them into our own SVN, but the repository itself is located in _/usr/share/drupal/_It is an [anonymous checkout](http://drupal.org/node/321), so that we cannot accidentally commit. It is owned by root too.## /sites and its siblings
And here is the magic /istes settings. This too, is not hard at all_/hosting/example.nl/settings.php /hosting/example.nl/modules//hosting/example.nl/themes/_Those might become writable by 'example.nl' user. But at the moment of writing, this is not yet decided upon.sites is a simlink from drupal root: _/var/www/sites -> /hosting_## site specific contributed modules and themes
All sites can have three sorts of modules and theme: core, contributed and custom.

Custom modules live in _/hosting/example.nl/modules/_ or _themes/_.

Contributed modules are symlinks, for example _/hosting/example.nl/modules/ -> /usr/share/drupal/modules/tagadlic_.

Core modules live in _/var/www/drupal/modules/_.
