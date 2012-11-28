---
layout: post_archive
title: jabber at webschuur
created: 1127473538
tags:
- server
- drupal
lang: en
---
I have been a long time fan of Jabber. And now that <a href="http://talk.google.com">google talk</a> runs on jabber too, I decided to take the plunge and have a look at the server, hows, if and why's.

Great stuff jabber. Just installed it from the debian repositories and it works (on localhost). 

And by following the clear <a href="http://jabberd.jabberstudio.org/1.4/doc/adminguide#intro">adminguide</a> you will see both how extremely simple it is to get a server goign ,as well as the full potential of jabber. 
The thing that makes jabber so extremely powerfull is its simplicity. everything goes over XML. And is answered with XML. It seems very well thought out, and within half an hour you can even chat over telnet with yourself (or a friend, if you add people to your roster).

I will roll out a full blown jabber server soon, for all our clients. It will authenticate either against the drupal user table (MySQL authentication) or against the LDAP we are rolling out to store our users. 

Once that is done, we have a nice helpdesk feature (live support), all our clients have a jabber account by default, and we have a lot more potentials. 

Think about opportunities like live monitoring of your Drupal watchdog (watchdog2jabber.module) or receiving site updates over jabber (as opposed to the slower RSS/RDF). Or posting blogs with your jabber client. Hell, its XML, so anything is possible. And now that google is playing with it, it is not a small niche, but it opens a huge userbase. 
