---
layout: post_archive
title: ! 'I was wrong: It was not a leak in a Drupalsite.'
created: 1316376171
tags:
- drupal talk
- drupal hosting
- files
- drupal
lang: en
---
I [tweeted](https://twitter.com/#!/berkes/status/114399800132255744) too fast, and wrong:

> Site were the Dutch Government accidentally leaked its 2012 budget, is a Drupalsite. Yes #Drupal does not secure its files. Drupal for govs?

The mayor news outlets in the Netherlands did not link to the leaking site, but instead to the site that carried (a mirror of the) PDFS that were leaked as well as background information. I followed these links, without researching if these sites were the actual leaking sites. This site they, instead, linked to, is a [Drupalsite](http://www.cpb.nl/sites/all/modules/cck/CHANGELOG.txt). The one with the unprotected files was not.

So much for not investigating a little myself! The site that leaked the file, was an ASP (.net?) site. 

I am sorry for this misinformation. And as said, tweeted too fast, did too little investigation and that makes me look stupid. I am glad for those that told me my mistake. And because I got married the next morning, writing this errata took more time then is appropriate. Sorry for that too.

As a bonus, and to make things up a little, some common Drupal leakages that I helped fix in clients projects. Obviously I have responsibilities (and even a few NDAs) so I don't give names and urls. 

<!--break-->

### The avatar-fiasco.

A group of people partook in a grassroots campaign, backed up by a closed (the permission access-content was only given to hand-picked people) forum. 
The party who the grassroots took action against new about that forum, but could not access it. They, however, wrote a silly script that 

1. scanned URL patterns for user-profiles: if they gave a 404, that user did not exist, if they got a 401, they still could not access the content, but new the person existed. 
2. fetched avatars for all users that had one and used that to intimidate the partakers. 

I did three things: migrated existing users and added some pseudorandom numbers to their uid. I hacked core, so it sent a 404 for access-denied pages too. I disabled avatars. 
And explained the users that their Drupalsite was not hacked, but instead leaking some minor privacy-information.

This was minor. But imagine this happening on a sexual-diversity, and/or civil-rights forum in, say, Iran?

### The video-file settlement.

A none-drupalsite ran a (very interesting) documentary on a person with a mental illness. After a Preliminary injunction they had to take the video offline (or pay a fine of X for each day it remained online). The publishers took the article offline, but some journalists/bloggers found that the video could still be accessed, by giving the urls to the video-file. Luckily a settlement was reached and the publishers did not have to pay the fine for all the days the video had remained active. 

We were just then planning to migrate this site to Drupal. The incident caused us to find a solution for this in Drupal: when a node gets unpublished the attached files should no longer be servable. We decided upon a custom-built module with a hook_node that acted upon "unpublishing" and simply renamed the files to some obscure salted-hash-name. Yes, that is security-by-obscurity, but the only affordable solution here.

### The imagecache downloads

A site that (re)sold images used imagecache to watermark the images, resize them and only present small resolutions to users. 
Someone found this out, probably new Drupal, and fiddled with the urls to fetch the original files. Those were >5MB JPEGs, copyrighted and by contract, not allowed to be distributed. Ever.

My client was warned (luckily) and hired me to write a (very ugly) imagemagick hack that moved the original files to a place outside the web-root, but accessible for re-building of the derivatives. 

### The Multisite jokes

Back when I ran our [Drupal-hoster](http://web.archive.org/web/20060202131110/http://sympal.nl/) we thought that multisite was a good solution for hosting. It is not, for many reasons, but one is most interesting here. 

Two domains, for the sake of the example: upload-your-xxx.com and some-brochureware-about-us.nl were multisites

Some funny people found out that by switching the urls, one could present images uploaded on upload-your-xxx.com on the domain of some-brochureware-about-us.nl: and posted that on some forums: 
http://some-brochureware-about-us.nl/files/upload-your-xxx.com/hardcore.jpg with the messages: look company Y us dealing in pr0n. Embarrassing, in this case, but potentially harmfull, especially when one of both sites has user-generated-content, or when sites are tough opponents and involved in smear-campaigning. 
Also potentially harmfull when "good" sites get blocked on schools and in libraries, for "having none-complient or adult content". Or when a multisite acts as a proxy to pass in disallowed content. 

Our solution was to nuke multisite with a thousand flames. 

### But, private-files? 
Drupal has a private-file modus. That is fine for small sites, but it does not scale. You cannot deliver (very) large files that way, and certainly cannot deliver large amount of files concurrently that way.

I see no solution; And earlier research has made me believe this is simply not possible with a classic LAMP (Apache and PHP) stack. One needs a real document-management server, or application (things like Alfresco). Most probably a Java-based solution. Or some thin proxy that knows about who can access what files in front of the app. 

When you need to deliver large (amounts of) files, keep away from simple asp, lamp and such solutions, including Drupal. Maybe, but I have never tested it, Alfresco behind Drupal can offer a real solution?

## Again, sorry.

As you know, I was wrong in my conclusion that (a badly configured) Drupal was leaking governmental information. 
But as you can see, it happens a lot. And it requires quite some effort to avoid Drupal leaking information. Including core hacks if you are really serious.
