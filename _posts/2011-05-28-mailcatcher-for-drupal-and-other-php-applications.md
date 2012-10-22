---
layout: post_archive
title: Mailcatcher for Drupal and other PHP-applications
created: 1306591723
tags:
- php
- drupal
- drupal
- drupal blog
- ruby
- ruby on rails
lang: en
---

**UPDATE** Please see the [newer version of this article](/2011/05/29/mailcatcher-for-drupal-and-other-php-applications-the-simple-version/), the latest malcatcher has its own sendmail replacement, making installation for PHP a lot simpler.

**Problem:** on development (and test) you don't want to send out mail. But you /do/ want to test it. You certainly don't want to be in my shoes when a client called me, telling she recieved dozens of confused and angry mails from users on her site, after I fired up cron on my local development machine. And sent out approximately 3000 notification mails to users, with stuff like "new post for you: "W000t, fieldz0rz developmentz in CCK is workinggggg!". Not cool.

**Problem:** when debugging mail, you want to inspect the headers and the source (in case of multipart or HTML mail). Most emailclients are crap for that (and right so: who other then the odd mail/webdeveloper needs to inspect the source of a mail. ever?)

**Solution:** the brilliant Ruby application named [mailcatcher](https://github.com/sj26/mailcatcher). This is a simple SMTP server, which shows the mails sent to it, in a handy webapplication. The webapplication features debug-tools such as headers, and source displaying.

![Screenshot of a Drupal password recorvery mail in Mailcatcher](/images/inline/mailcatcher.png)

Additional problem: PHP on none-windows machines, cannot deliver mail to an arbitrary SMTP server. It requires a sendmail program being invoked somewhere. Drupal does not allow sending mail to any smtp server without additional configuration. Solution for that is the ultralight sendmail alternative [msmtp](http://msmtp.sourceforge.net). If we configure msmtp to act as sendmail and deliver mail to mailcatcher, we are fine: *Drupal » PHP mail() » /bin/msmtp --foo --bar » Mailcatcher*

Aside: Windows. It is probably possible, but since using even the most basic proper commandline on there requires lots of hassle, all this is far from as trivial as Mac and Linux. I am sorry, but please use the comments if you go mailcatcher running with PHP on Windows.

## Mac
Install mailcatcher (Use sudo for installing systemwide).
`$ gem install mailcatcher` 

Install msmtp, using MacPorts. 
`$ sudo port install msmtp`

Configure PHP to use msmtp for delivering mail:

* Edit *php.ini*
* Under *[mail function]*, if available, change the *sendmail_path* variable. Else just add it to 
*php.ini*.

    sendmail_path = "/usr/bin/msmtp -t "

And restart apache.

[Configure msmtp](http://masterleep.com/2010/configuring-msmtp-on-osx-snow-leopard-to-send-through-gmail) with some defaults (this file should probably be named */etc/msmtprc*)

    account mailcatcher
    host localhost  
    port 1025       # MailCatcher will tell you the port it listens to.
    # Enable logfile for additional troubleshooting.
    # logfile /var/log/msmtp.log
    auto_from on    # From does not work 100% with me, yet, because the envolope-from 
                    # is still wrong. But leaving this out makes msmtp fail with PHP.

    account default: mailcatcher 

Start up mailcatcher
`$ mailcatcher`

Open your browser and visit http://localhost:1080

## Linux (Ubuntu, Debian and derivatives)
install ruby and rubygems first (if you don't already have it) 
`$ sudo apt-get install ruby rubygems`
Then install mailcatcher.
`$ gem install mailcatcher`

Install msmtp. 
`$ sudo port install msmtp`

Configure PHP to use msmtp for delivering mail:

* Edit */etc/php5/apache2/php.ini*
* Under *[mail function]*, change the *sendmail_path* variable.

    sendmail_path = "/usr/bin/msmtp -t "

And restart apache (*$sudo service apache2 restart*) to load the new php.ini.

[Configure msmtp so it accepts PHPs sendmail calls](http://serverfault.com/questions/235723/testing-php-mail-in-localhost-problem) with some defaults. Edit */etc/msmtprc*.

    account mailcatcher
    host localhost  
    port 1025       # MailCatcher will tell you the port it listens to.
    auto_from on    # From does not work 100% with me, yet, because the envolope-from 
                    # is still wrong. But leaving this out makes msmtp fail with PHP.

    account default: mailcatcher 

Start up mailcatcher
`$ mailcatcher`

Open your browser and visit http://localhost:1080

## Troubleshooting
If things don't work out, check the main apache error log. Errors by msmtp will show up there and tell you what went wrong. Use the Logs Luke, use the logs!

You can turn on msmtp logging with *logfile /var/log/msmtp.log* in *msmtprc*. No need to restart apache for that. Msmtp will tell you what calls it recieved and what parameters it got.

Cut out PHP and [send a mail with msmtp](http://serverfault.com/questions/235723/testing-php-mail-in-localhost-problem) to mailcatcher on the commandline

    echo -e "Subject: Test Mail\r\n\r\nThis is a test mail" |msmtp --debug --from=default -t me@example.com

If that works, then the problem is between Drupal/PHP and msmtp, and the apache-logs should give a hint (see above).

## Mailcatcher gotcha's and tips

* Just terminate (^C-c) mailcatcher and restart it to flush the recieved mail.
* On firefox (4) the web interface from mailcatcher did not look that well. Chrome(ium) rendered it fine, though.
* Don´t forget to start up mailcatcher before you start hacking along on your site, If you forget it, mail will not be sent out, but will fail and PHP (Drupal) will give errors on mailing.


**Happy Mailing on your development machine!**
