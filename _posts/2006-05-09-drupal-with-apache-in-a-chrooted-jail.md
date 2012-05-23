---
layout: post_archive
title: Drupal with apache in a chrooted jail
created: 1147185377
tags:
- Server
- Drupal Talk
- sympal.nl
lang: en
---
<a href="http://sympal.nl">Sympal</a> runs in a very secure (no, this is <em>not</em> an invitation ;) ) chrooted server environment. Having it all chrooted is nothing new and it is not too hard all together. Especially if you run on a very well designed system like Debian.

Here are some hints and notes for others looking at chrooting their Drupal environment:<!--break-->
<ul>
 <li>If you use symlinks to point your multi-sites sites to other directories, make sure they are inside the chroot, and make sure you use only relative symlinks.</li>
 <li>Image module has hard times, because it depends on convert. Make sure you either run it all with only GD (heavier server load, though) or that you add imagemagick to your chroot. In Debian you need to
<pre>
cp -r /usr/bin/convert <strong>/var/www/</strong>bin/
cp -r /usr/lib/ImageMagick-6.0.6 <strong>/var/www/</strong>usr/lib/ImageMagick-6.0.6
</pre></li>
 <li>Sendmail is chrooted too, this can be <a href="http://drupal.org/node/2727">rather complex</a>. You can either copy the sendmail binary to your chrooted bin directory, or write a wrapper script that delivers the mail to localhost:25, so over a local network connection. Make sure that your real postfix allows relaying from the chrooted domain (most probably you only need to add 'localhost' to your "mydomains").</li>
</ul>
Hope this helps others. If you have tips or better tricks, please share them! I am curious on how to make this better, and we might even turn this into a real Drupal handbook page one day.
