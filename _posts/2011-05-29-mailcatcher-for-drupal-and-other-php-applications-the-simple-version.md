---
layout: post_archive
title: Mailcatcher for Drupal and other PHP-applications - The simple version
created: 1306674909
tags:
- PHP
- Drupal Talk
- Drupal
- Drupal Blog
- Ruby
- Ruby on Rails
lang: en
---
This is an updated version of my [earlier post](http://webschuur.com/publications/blogs/2011-05-28-catchmail_for_drupal_and_other_phpapplications#comment-78486). Since msmtp is no longer needed, things are a lot simpler, hence the new article.

**Problem:** on development (and test) you don't want to send out mail. But you /do/ want to test it. You certainly don't want to be in my shoes when a client called me, telling she recieved dozens of confused and angry mails from users on her site, after I fired up cron on my local development machine. And sent out approximately 3000 notification mails to users, with stuff like "new post for you: "W000t, fieldz0rz developmentz in CCK is workinggggg!" (I am making this up now. Allthough.... ;) )
**Problem:** when debugging mail, you want to inspect the headers and often (in case of multipart or HTML mail) the source too. Most emailclients are crap for that (and right so: who other then the odd mail/webdeveloper needs to inspect the source of a mail. ever?)

**Solution:** the brilliant Ruby application named [mailcatcher](https://github.com/sj26/mailcatcher). This is a simple SMTP server and sendmail replacement that shows the mails sent to it in a handy webapplication. The webapplication features debug-tools such as headers, and source displaying.

![Screenshot of a Drupal password recorvery mail in Mailcatcher](http://webschuur.com/files/mailcatcher_031.png)

<!--break-->

Aside: Windows. It is probably possible, but since using even the most basic proper commandline on there requires lots of hassle, all this is far from as trivial as Mac and Linux. I am sorry, but please use the comments if you go mailcatcher running with PHP on Windows.

## Installation

Mac comes with ruby installed. On Ubuntu Linux you may need to install it still:
`$ sudo apt-get install ruby rubygems`

Install mailcatcher (Use sudo for installing systemwide).
`$ gem install mailcatcher` 

Configure PHP to use mailcatcher for delivering mail:

* Edit *php.ini* (Depending on your installation where this lives, but on Ubuntu this is */etc/php4/apache2/php.ini*)
* Under *[mail function]*, if available, change the [sendmail_path](http://php.net/manual/en/mail.configuration.php#ini.sendmail-path) to */usr/bin/env catchmail* and your'e set.

`sendmail_path = "/usr/bin/env /var/lib/gems/1.8/bin/catchmail " `

Find out where catchmail lives by invoking *$ which catchmail*. On Ubuntu it was installed at */var/lib/gems/1.8/bin/catchmail*. Make sure you have the gems installed system wide, else apache (or the user running the webserver) does not have access to catcmail and the required libraries. 

And restart apache.

Start up mailcatcher.
`$ mailcatcher`

Open your browser and visit http://localhost:1080

## Mailcatcher gotcha's and tips

* Just terminate (^C-c) mailcatcher and restart it to flush the recieved mail.
* Don´t forget to start up mailcatcher before you start hacking along on your site, If you forget it, mail will not be sent out, but will fail and PHP (Drupal) will give errors on mailing.


** Happy Mailing on your development machine! **
