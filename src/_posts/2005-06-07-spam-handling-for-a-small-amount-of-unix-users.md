---
layout: post_archive
title: Spam handling for a small amount of unix users
created: 1118152972
tags:
- server
lang: en
---
I run a server, where i use the default unix PAM user system for mail users. Dovecot runs as IMAP server, with PAM authentication, and each user has a default directoruy in /home/username, Maildir.

This Maildir is preconfigured in /etc/skelFirst I create global accessible directories, where al spam will go, for teaching spamassassin> cd /etc/skelber@serv-1-1-246:/etc/skel$ sudo maildirmake -f spam Maildir/ber@serv-1-1-246:/etc/skel$ sudo maildirmake -f spam.missed Maildir/ber@serv-1-1-246:/etc/skel$ sudo maildirmake -f spam.ham Maildir/ber@serv-1-1-246:/etc/skel$ sudo maildirmake -f spam.filtered MaildiI then have a directory spam with the sub-directories spam and ham> ber@serv-1-1-246:/etc/skel$ sudo ls -al Maildir/.spamtotal 28drwx------  7 root root 4096 Jun  7 15:05 .drwx------  6 root root 4096 Jun  7 15:05 ..drwx------  5 root root 4096 Jun  7 15:05 .hamdrwx------  5 root root 4096 Jun  7 15:05 .spamdrwx------  2 root root 4096 Jun  7 15:05 cur-rw-------  1 root root    0 Jun  7 15:05 maildirfolderdrwx------  2 root root 4096 Jun  7 15:05 newdrwx------  2 root root 4096 Jun  7 15:05 tmpThen I installed bogofilter. the REason I chose bogofilter and not Spamassassin, is that the latter is very heavy, and requires a rather big PERL installation.> ber@serv-1-1-246:sudo apt-get install bogofilterMy general maildropc then  looks like this> # Global maildrop filter file# Uncomment this line to make maildrop default to ~/Maildir for# delivery- this is where courier-imap (amongst others) will look.

DEFAULT="$HOME/Maildir"xfilter '/usr/bin/bogofilter -u -e -p'if (/^X-Bogosity: Yes/){to "$HOME/Maildir/.spam.filtered"}else{to "$HOME/Maildir"}Then we need the actual training. I prefer to train on error. And As said, i want to have a central spam database. So I set up a central location in /var/spool/bogofilterFrom then on, a simple cron run will keep the spam up to date:@weekly      find /home/ -name .spam.missed -type d -exec bogofilter -B -s {} -d /var/spool/bogofilter \; >> /dev/null 2>&1@weekly      find /home/ -name .spam.ham -type d -exec bogofilter -B -h {} -d /var/spool/bogofilter \; >> /dev/null 2>&1Which runs a weely update on the spam folders; All my users need to do is move spam into the spam folders, and ham into the ham folders.
