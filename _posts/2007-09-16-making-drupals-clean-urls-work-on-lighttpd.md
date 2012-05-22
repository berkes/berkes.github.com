---
layout: post
title: Making Drupals clean URLS work on lighttpd
created: 1189953560
tags:
- Drupal
- PHP
- Server
- Drupal Talk
- Drupal Hosting
lang: en
---
<a href="http://www.lighttpd.net">Lighthttp</a> is a very good alternative for Apache. The exact details on why, how and when are outlined on <a href="http://www.lighttpd.net/benchmark">lighttpd's website</a>, but I choose it for my development environment; because it is light: having five forked apache processes idling around, merely to develop a simple module is way OTT, I think.

There are <a href="http://trac.lighttpd.net/trac/wiki/TutorialInstallation">many</a> <a href="http://www.howtoforge.com/lighttpd_mysql_php_debian_etch">tutorials</a> on getting lighttpd up and running, including a nice, yet complex one special for <a href="http://www.morphir.com/Lighttpd-Install-and-configuration-for-Drupal-with-clean-url">Drupal</a>.

I found that Ubuntu's vanilla lighttpd in served Drupal Just Fine[tm], except for the clean urls. Which is not hard to get working either.

1. Edit _/etc/lighttpd/lighttpd.conf_ and uncomment the _"mod\_rewrite",_ rule in the top setting _server.modules_.
2. Run _sudo lighty-enable-mod rewrite_ to enable the module
3. Create a new file _ls /etc/lighttpd/conf-available/10-rewrite.conf_ And add the contents of <a href="http://webschuur.com/sites/webschuur.com/files/10-rewrite.conf_.txt">this file</a> there (or download it and save it as the file mentioned above)
4. Restart lighttpd _sudo /etc/init.d/lighttpd restart_

Now you can access your drupal site(s) on example.com/drupal. Note that the _/drupal_ is virtual, it is not an actual directory. I use that to make sure the rewrite does not try to rewrite all CSS and image urls too.
It serves me fine on my development environment.

Lots of thanks go out to <a href="http://pixel.global-banlist.de">darix</a> for online help, and to <a href="http://rc6.org/">Remco Brink</a> for providing the proper rewrite ruleset.
