---
layout: post_archive
title: Several reasons why I prefer Github over Drupal for Hosting my Drupal Projects.
created: 1332497431
tags:
- 'Drupal'
- 'Github'
lang: en
---
Why I prefer Github over Drupal, a crosspost from [an issue on Drupal.org](https://drupal.org/node/1494882#comment-5769558).

* I do more then "only Drupal". Github allows me to maintain all these none-Drupal modules in the same environment. Just another angle to look at the "but it's good to have everything centralised". It is now centralised for me, the developer; arguably the most important person in a project.
* Collaboration is far easier on Github trough its [forking and pulling mechanism](http://help.github.com/send-pull-requests/). No fiddling with patches, continuous re-rolling them and so forth.
* The entire experience is just simply a lot better worked out on Github. "It's all about the details"[1].
* I firmly believe that Drupal should ditch the entire project-hosting. And leave it to the community members to choose where they host: On their own (companies') servers, on Github, Bitbucket, launchpad, whatever rocks your boat. And no, you can [still have](https://www.ruby-toolbox.com/) central places to find your modules then. In my believe: when there is a competition between hosters and contrib-search-engines, they will be a lot better then what we have now. [2]
* I care for developers, not users. Users give me little in return (other then high-usage rates and self-esteem). Developers are my main target, for they have the tools and skills to help improve my work. Their "payment" comes in patches, bugfixes, performance-improvements, refactorings and so on. For me, the most valuable payment. Obviously, most developers are users themselves. And many user can become a developer. But in the end, I choose a [project-manangement-environment aimed at developers](https://github.com/about), because they are my main target audience, because in my Open Source Projects, they "pay" best. And so, I prefer to lower the barrier to make such a payment.In the end, It should be for the best for all of us.Obviously, Github lacks a few things, most of which are easily solvable due to the distributed nature of Git. Depending on how much Drupal projects I will continue to maintain (I am evaluating that right now), I might release some of my tools which help me here.
* Drupal automatically builds releases. You now need to push to two remotes if you wish nightly builds (the -dev version).
* Update and security infrastructure is built around hosting and maintaining on Drupal.org entirely. You host elsewhere? You won't be able to push out new security releases to your users.
* Drupal has a really strange (and anoyingly [incompatible with de-facto standards](http://nvie.com/posts/a-successful-git-branching-model/)) workflow and branching model. Aliasing and simply ignoring most Drupal standards helps a lot.
* **BUT IF IT IS NOT ON DRUPLA.OGR IT IS NOT OFFICIAL!!11onone.** Sadly a module has to be released on Drupal.org to be taken in consideration in most projects. Personally, I find that smallminded. Since there are [great projects not on Drupal.org](https://twitter.com/#!/github_drupal). But facing the facts: a module has to be on drupal.org, so if you host elsewhere, you still need to host on Drupal.org too. Meaning two environments, twice the fiddling and thrice the amount of Description/readme/changelog copypastig. By hosting on Drupal.org alone, you avoid most of this.

[1]: The most hilarious and sad example is the fact that when I decided to move my tickets over from Drupal.org to Github, I closed the ticket-feature on Tagadelic; you should no longer be able to post tickets there.. But due to some bug, this feature does not work: So now I have to keep replying on tickets on drupal.org, telling people the tickets are closed there. Sigh.

[2]: It will also solve another rediculous problem: that of "too much modules". Right now, the solution to this is to hold back module-development! Hah! Because the mechanism to find The Best Contribs is broken, you simply say: we will stall creation of new contribs: because then people can find the oldest ones best. Edit: due to excessive spamming (my server almost crashed, recieving over a million! spam POSTS per day) comments can be posted [over at reddit](http://www.reddit.com/r/drupal/comments/r9sjz/several_reasons_why_i_prefer_github_over_drupal/). I will reply there.
