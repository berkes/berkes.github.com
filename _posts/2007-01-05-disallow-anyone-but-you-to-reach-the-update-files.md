---
layout: post_archive
title: Disallow anyone but you, to reach the update files
created: 1167994421
tags:
- Server
- Drupal Talk
- Drupal
lang: en
---
With a simple addition you can dissalow anyone but you to reach update.php on your site. Off course Drupals update.php is secured and requires you to edit the file in order to update. But at that moment (no matter how short time that may be) anyone can start upgrading your site. Especially when upgrading multisites this can be dangerous: it may take two days to finish all the upgrades: two days that anyone can break any of your databases.

Just add this simple block of accessrules to the .htaccess in your Drupal root.<!--break-->

    <FilesMatch "update.php.?">
      Order deny,allow
      Deny from all
      Allow from 12.34.56.789
    </FilesMatch>

Replace _12.34.56.789_ with your [own IP address](http://whatismyip.com/).

If you don't have a static IP, you may want to make this even fancier by adding a simple [htpasswd authentication](http://httpd.apache.org/docs/2.0/howto/auth.html) for update.php. But that is left for you as homework :).

<small style="float:right">_[teaser proudly broken with &lt;!--break--&gt;](http://drupal.org/node/106947)_</small>
