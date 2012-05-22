---
layout: post
title: Five serious security issues and configurations, I found in recent clients
  sites
created: 1223737347
tags:
- Drupal
- Drupal Talk
lang: en
---
Part of my job is to help existing Drupal-users with their projects and sites. Sometimes this means upgrading, fixing some bug, or helping them get some new feature implemented. 

What strikes me, is the amount of security hazards I encounter. I am not saying that I am the Perfect Developer, but I have a good knowledge of what makes a secure site secure, about what [configuration break that security and so on](/publications/blogs/2006-02-12-some_tips_for_adminstrators_and_multisite_providers_to_make_drupal_more_secure)
The amount, and criticalness of the issues I encounter make me often think that we should really get some ranking or rating done in the Consultants-pool. Most of my clients are clueless themselves, so the ones who deliver or install a Drupal site for them, should really spend more time on educating the client, good configurations and considerations and overall on quality and security in general.

Five of the worst things I found recently: <!--break-->

1. **Setting filter format "full HTML" as default**. A lot of people seem to think: "handy, then I don't need to toggle the filter on everytime I post a new item". Or "It's okay, I am the only one who posts content anyway". setting FULL HTML as default filter, enables such a large security hole, that you should never even consider it. It simply means that you switch of most, if not all, filtering of data that goes into your Drupal. 
1. **Running way outdated Drupal core and contributions**. I was handed a Drupal only last week that ran Drupal 5.3! Often in combination with the reasoning "But I removed CHANGELOG.txt, so no-one can see what version I am running." Wrong. There _will_ be automated hack-scripts for certain security holes. They hardly look at your version, instead just simply try (and get in). From that moment on, changes are big that your Drupal installation, probably your whole server, is infected and needs complete re-doing. Often you cannot even put recent backups back, loosing weeks of precious data and content. Always keep your Drupal site up-to-date. If you (or any contractor) cannot do this, don't run Drupal. Period. In fact: best not run a site at all. Having a site means upgrading, it's as simple as that. 
1. **Working on your site as Root**. It is a bad idea to do your daily work as Superuser (user with UID1). Better, is to make a role SuperUser and assign one or more people to that role. But even then, don't do your daily work under that role. 
 * SuperUser always gets around all security checks in Drupal. Access always makes hardcoded exception for UID1. If this account is hacked, you cannot limit what the person can do.
 * You cannot delete nor block UID1. Well, technically seen, you can, but that means you cannot get in , upgrade or manage your site anymore. Any other user, can be blocked. As soon as you think your password is hijacked, or anything else, you can block that user.
 * You can choose a ridiculous long and hard password. You only need it when you are at home doing your upgrades or module-installations. Hardly ever, compared to every-day blogging, for example.
1. **Having ridiculously simple passwords**. (often even for the UID1 user). I recently had a client whose theme was broken. He sent me his passwords for UID1 (first mistake!). The password was literally the name of the site! It takes a script about 2 minutes to guess such a pasword, using a [Dictionary Attack](http://en.wikipedia.org/wiki/Dictionary_attack). See above for a better solution, and never! Ever! send your UID password around. Again: you cannot block that user. Here too, the solution is to make a superuser role and grant your contractors account that role. Once he or she is finished, all you have to do, is to remove the account from that role (or entirely).
1. **Leaving all sorts of maintenance scripts on your server** Some examples I encountered recently: \_\_remove_files_from_upld.php (to remove the files mentioned in the arguments, &files=file1.doc pma/ (yup, that is where phpmyadmin, without login, was running). Best is to never have this kind of junk in the first place. But if you insist on needing them, then at least only use them on a closed development server. But my experience, is that most of the junk comes from "quickly putting this Dev online, we have a deadline to catch". Where the junk sticks and goes online with the other stuff.
