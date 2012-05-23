---
layout: post_archive
title: Toggle your webservers' production environment by using symlinks
created: 1283974361
tags:
- ''
lang: en
---
I love simple. If I can do something in a simple way, that, is the way I will do it. Releasing new features, updates or upgrades of sites can be a PIASS, even when you use the whole shebang of version-control systems, release-management environments and what more. 

I think it can be done very simple (okay, I don't run bank-applications that are critical to the world economy, but still) with symlinks. 

Say, I have a tool called "foo" that gets a critical update. I know most of you would just fire up ws_ftp (the more savvy would prolly fire up filezilla) and then overwrite the old code with the new code and be done with it. 
That, however, is the kind of <em>simple</em> that is even too simple for me. It is so extremely error-prone, that I don't recommend it for anyone. Not even if you have that site that is only visited by three people and an accidental cat, per week. 

What I do, is keep two direcories for my app, under _/var/www_: _foo\_r_ and _foo\_l_. The \_r and \_l stand for left and right. You could also call them one and two, or tinky and winky.
One symlink points to them: _foo_.

      ber@luscious:/var/www$ ls -ahl
      lrwxrwxrwx  1 www-data www-data 12 2010-09-08 19:31 foo -> foo_l
      drwxr-xr-x  6 www-data www-data 4,0K 2010-07-20 17:30 foo_l
      drwxr-xr-x  6 www-data www-data 4,0K 2010-09-08 19:29 foo_r

My vhost (_/etc/apache2/sites-enabled/foo_) points to _foo_:

      <VirtualHost *:80>
	ServerAdmin webmaster@foo.com
        ServerName foo.com
	DocumentRoot /var/www/foo
        <Directory /var/www/foo>
         AllowOverride all
         Options -MultiViews
        </Directory>
      </VirtualHost>

And all you have to do is:

1. update the code in the folder that is _not_ symlinked to: foo_r, in the above example. 
2. optionally test that code. (but you had your tests done on the test-environment, not?)
3. switch the symlink: <code>rm /var/www/foo && ln -s /var/www/foo\_r /var/www/foo</code> 

This way, you solve many problems, without brining in heavy shots, such as capistrano, or whatever-release-tool. 

* During overwriting the code with new code, your users could (and will) hit a situation where half of the code is new, and the other half is old. 
* If you work with a revision-controlsystem, you can solve merge conflicts before people get hit by them. 
* You can test-drive your unreleased code, by introducing a vhost that uses the foo_r (or the other one, at least the one unused at that moment) as documentRoot. 
* If you have your code spread over multiple servers, you can distribute it first, then switch the simlinks on all the servers at once, instead of waiting for code to be distributed and having a period during which parts of the balanced servers serve old code and parts serve the new stuff.
* This is /so/ simple, that it can be integrated in about every script and adminstrative frontend.
