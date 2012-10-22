---
layout: post_archive
title: Help maintainers maintain. And helping contributors help the maintainers.
created: 1178024359
tags:
- drupal
lang: en
---
This morning I found an email in my inbox telling me that I am a bad maintainer and that I am making people fork my modules. The mail was not meant to go to me, but the sender hit reply and thought he was moaning about me to someone else. Basically I was asking for my modules to be forked because I was too ### to release a new version. I don't release a version unless I am confident it is release-worthy: when I have used it myself.

Not a big deal, but it gave me food for thought about maintainance and release of Drupal modules, in general. And about how to improve the general issue of not having enough time to dedicate to a contributionIn general, I think there are three reasons to maintain a module on Drupal.org* You think it is fun or/and like to "give something back"* It allows you to have your module improved without having to invest much time and money* It works as marketing for you, as a highly visible portfolio: people see you, see your work and therefore might hire your services.

The second is what makes me and other most often not release new versions, or let a module die a slow death. Even if many others depend on your work, that should not be a reason for you to sit trough sleepless nights of code and coffee. If people apparently depend so much on your module, then they would scratch their own ithces: you would find patches and improvements in other forms appearing.

As a maintainer, without much time, there are a few things you can do. As a contributor there also are a few things you can do to help.

The maintainer can and should communicate clearly what is going on. Try to at least leave a comment in every submitted issue. This gives contributors the signal that their work is noticed.

The maintainer can, and should give good developers CVS access. What makes a "good" developer depends on your own wishes and standards: in my book, people who come up with cosmetic patches are often good developers: they care about the details. Also developers whom run the code themselves on more then one site (you can read about this in the issues, most of the times) are often to be considered serious. They have a reason to make it work well. Developers who run a contrib on only one site, often make worse contributors: their sole purpose is to make that one site run well: not to make good re-usable and modular code.

The contributor, the one creating a patch or another improvement should consider the fact that the the maintainer is low on time. At all costs. First read some other issues in the project. You will often find out what the maintainer is aiming for, why he or she is not taking features or when new bugfixes are allowed in again.

Make self-containing patches. A patch that contains both cosmetich changes, a nifty new feature, a few typofixes and an upgrade to 5.x is a very tough one to review. Especially if people are pressing on a module to be upgraded to 5.x. That new feature may be disputable. The cosmetic changes may not be what the maintainer had in mind. And typofixes are always nice, but often clutter the real issue. I personally dislike this way of working, because it requires eye-shades. Instead of actually improving a module, you are making it worse, even if it works after your changes, the code is often far from what it could be, had you kept the helicopter-view.

To solve that, use SVN, or another revision system. If running an SVN server is too hard, ask someone else: I don't mind giving contributors to my code an svn account on my server, if that helps improve the patches and modules. I bet most maintainers with access to an svn server think the same. Once something is in your SVN, you can create many kinds of patches from there. Obviously you must commit to your SVN very often. And you must work in an issue-based manner. My preferred way is:cosmetic changes: indentation, comments, whitespace function order etc. Then commit.# bugfixes: one bug a time. After every tiny bug, make a commit. It will allow you to create patches per bug if the maintainer prefers that (I prefer that).features: one feature a time. After every feature make a commit.

And so forth.

This way you can make patches against any version, or between any versions. You can then re-create a patch for a certain bug without loosing all the cosmetic changes, and without them being in the way of the actual bugfix. If you really want the cosmetic improvements in first: you should tell the maintainer so, and promise to come with the bugfixes only after the general improvements are committed.

And last: don't see a maintainer as some God. They often are no more, or even less, experienced then you are. Just ask for CVS access. Ask what they are looking for, and send a personal mail to tell them what you are up to, and what they can expect from you.

Oh, and doublecheck the reciepient if you are sending a mail in which you gossip or moan about somebodies attitude, it might happen that you do this to your boss one day... But better is to just tell it to the person in question, in a nicer tone, off course.
