---
layout: post_archive
title: Modular modules, how to make modules play together
created: 1144849850
tags:
- project management
- organisation management
- drupal
- drupal
lang: en
---
I am currently helping someone [build a big community site](http://incubator.beauty-coach.nl), and day after day we run into problems that boil down to one problem. Modules hate eachother, do not integrate, and use completely different methods.

Let me take as example, the privatemessage module and the contact module. Both do something similar: allow users to contact eachother one of [the most important parts](http://drupal.org/node/7615) of a social site. However, we all know the Drupal (core) contact tab. And privatemsg does not use a tab, but instead injects links 'write to author' and 'write to User Name'. And when you also want to use "invitations for events (RSVP)" which has again a completely different experience, you will get to a point that you have to choose to either build your own All-in-one messaging module, or don't do all the fancy messaging, and stick to one, probably privatemsg only. Modules often make it near impossible to install and use other modules. The solution to this particular problem is to build some email features into privatemsg and disable contact module, and d the same for RSVP. But this should not be necessary. Because there could be better solutions.

Some are already in place. VotingAPI for example, offers all sorts of voting features to make all voting modules somehow play nice together. This is a small step forward, but it does not guarantee that modules play together for end users. API modules provide a system to make modules play together in the technical area. It helps avoid conflicts in database calls, in function naming and in required code. But it does not guarantee a unified interface and philosophy. Questions I often ask myself are: Why does Foo module make a tab, and Bar module not? Why was the interface for FOO made this way, and not somehow similar to the core BAR? etc.

I do not know a solution, of the top of my head, but I do know that the current growrate of contributions only makes this problem bigger. I am afraid that if we do not start some discussion about this problem, we will get even more incompatible and overlapping modules. Which often means that you cannot use even one third of them. So back to the private message issue: a central messageAPI could be a first step. Having that module handle all messaging to users, having that module render the mailboxes, and user-listings (as in: choose users to send this Foo to). But we know that such projects are almost impossible in a scattered community like Drupals. Developer A needs this developer B needs something else, etc. We see that with that other API project: links. I still see a lot of modules that handle weblinks, but chose not to do that via the links API. I think the ultimate solution is not to look for technical solutions, only, but to organise our modules somehow different. Making some certified module repository has been put forward before, but not as a solution to this incompatibility issue. If we have some contributions repository with only a few committers (3, 20, 50, 200?) and strong guidelines, next to the 'open' repository, we could solve part of this issue. We can ensure quality and guidelines for all the modules in that repository. WE can ensure that all modules in there play nice alongside eachother, that they follow one interface methodology, and that they are secure, too. 
