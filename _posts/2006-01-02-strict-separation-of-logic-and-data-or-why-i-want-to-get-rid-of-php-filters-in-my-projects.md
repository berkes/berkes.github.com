---
layout: post_archive
title: ! 'Strict separation of logic and data (or: why I want to get rid of PHP filters
  in my projects)'
created: 1136217019
tags:
- PHP
- Drupal Talk
- Usability
- sympal.nl
lang: en
---
We all know the mantra "logic and design must be separated". and we all agree with that, or so I assume. Drupal does this quit well,separating them, in structured and layered templating system.

What is lesser known and more often violated is a strict separation between logic and data. In Drupal we all know the so called [PHP blocks and pages](http://drupal.org/node/23220).and while I too abuse these very often, they made me think a lot. As of today I decided that I dislike them. And that I will seek for a better alternative to replace them with.

I dislike them for two reasons. The most obvious is security. One must keep a very very close eye on the site that has php pages. On a few of my sites I found out a bit late that I gave certain people the ability to create php blocks (in older drupal versions it was harder to change that, then in 4.7). I know of one mayor site where I suddenly saw the filter option "PHP code" appear in my node creation forms (yet I was only a moderator). Just examples of how easy this security hole is opened up. The way to avoid this from happening is just to pay attention. Something one should do anyway. But still: switching it all off, is the most secure thing to do. Especially in a multisite hosting environment.

The other reason is less obvious, but seen from the angle of a developer maybe even more important. I found that, for reasons of maintainability, backwards compatibility, and just plain old management of a project, I should keep three things very well separated:Code (logic), design (themes), and data (content).

Those three items, should, in my opinion stay in their own place. And never ever get mixed up. About the separation of logic and design people have said too much already. No need to say more here. But about the separation of our data and the logic I have not read that much. Most probably because not many projects and CMSes allow people to add code in a web interface. So I would like to explain it a little, with a focus on Drupal.

When I need an exotic block, or a more complex page, in Drupal, I often decide not to make a complete module just for that page or block, but I decide to just create some PHP and to paste that in the filtered content and set the filter to PHP filter. Drupal will then get the code from the database and evaluate it, then run it as any-ol' PHP. Drupal.org itself has even a big [library of such custom pages](http://drupal.org/node/23220) and [blocks](http://drupal.org/node/21867). And they become more and more posular, because its just a tad easier to use and share as a module.so, why I dislike this then? First of all let me say that anyone can make mistakes. And that anyone will make them. In that case you have a chance of breaking something in your site. I have helped quite some people in the mailinglists who could no longer access their site, and thus could no longer fix the error they made in their block.

Secondly, it must be known that Drupal is, by no means, backwards compatible. Too often did I have to hunt trough the content, to fix a block that called an old deprecated API, or a page that referenced a no longer existing database table.

And last, the most important part: It is very hard to maintain the code. As the second point already proved, we must maintain our code. Not only with upgrades, but also on various sites, or in various runtime environments (dev.mysite.com, staging.mysite.com and www.mysite.com, production) The more sites one has in his or her portfolio, the harder it gets to maintain all that custom code. The faster one needs to develop the harder it gets to keep various databases in sync. You cannot track it in a revision control system, nor in your private code database. You cannot copy over all the new files, and then release that. It is very hard to develop more complex code in a webform, other then by copy-pasting it from your favorite PHP editor.

So.... While we are there anyway, in that favorite phpeditor, why then, do we want to keep our code in our database, amongst our artworks, recipes, reviews, blog entries, or other content? Why do we not just maintain the logic together with all the other logic: as PHP files. As modules. Or themes?For me the answer to that is only "laziness". Developing a module requires defining a few more functions, help texts and some other required code, not to forget the code comments. While the PHP inside the database does not need all that (in fact, one cannot use functions in there, because of technical limitations).

But as with all these things that we do out of laziness, we find after a little while that we would have saved a lot of work and time, had we not been lazy. Had we just developed a small custom mysitename_com.module then we would have saved time.

I have to add, finally, that while I here only talk about PHP filters, this in fact goes for a lot more, like the new views.module configuration, or our carefull crafted flexinode configuration. For this, I beleive I should find better alternatives too. So that I can keep logic and data truly separated.

So, to conclude: for me, my future projects, for [sympal](http://sympal.nl) and for DrupalCOM, PHPfilters will no longer be active. Instead I will develop more module-creation scripts to scaffold new modules faster. Just like I already decided not to use flexinode anymore, but instead go for small node modules, to define new node types, instead. This also fits better in my model, i envision, where a Drupal site is build by a developer and used by a user. That user should never (have to) have access to any logic, but should only have to bother about the content. The developer is the one building the logic; And that developer has access to the codebase anyway.
