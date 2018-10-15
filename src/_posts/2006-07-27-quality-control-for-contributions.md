---
layout: post_archive
title: Quality control for contributions.
created: 1153987351
tags:
- drupal
lang: en
---
In the past, this issue has come up every so often. Lately it seems the talk about this has not really stopped. Quality control for contributions. In this article I try to explain why I beleive quality assurance, or else other radical matters are a necessity for the health of Drupal.

## Can I use Drupal for my FooBar? Sure you can: use the foo, bar and glue_bar modules.
Most answers to questions like "can I use Drupal for my ThisThatAndMore site?" are answered with a list of pointers to modules and how to configure them. Contributed modules.

But a lot of these pointers contain warnings too: Foo and Bar are released, but they don't work together yet, and right now glue_bar, which solves that conflict is not released. Or worse: no-one gives that warning and people get the idea that Drupal can do things for them which it cannot. At least not without coding, tweaking, debugging and patching.

## But what about the Big Fat Warning above contributions?
A good thing, and necessary. But because the community (Drupal) leans so heavy on these contributions, this warning is rather useless. If we really beleive in that warning, we should tell everyone: "Sorry no. Drupal cannot do that. But you might have a look in our contributions section where there is a chance that some uncontrolled module could help you further" instead of "Sure, Drupal has that, just use this and that contrib". So no: Drupal for you blog has no trackbacks. Drupal has no e-commerce, and Drupal certainly has no image features.

Drupal savvy people, those who are involved in forums, mailing-lists or IRC can follow the Buzz, and tell by that if a module is nice or not. But people with less time, or people who simply want to use Drupal (as opposed to study Drupal) are left out of this loop. All they have, is a description on the module page. And these descriptions sometimes promise the Heaven, but give Hell. Or talk about "very alpha, use at own risk", when in fact, it is more stable then 90% of the contribs.

## Again: Whom is Drupal for?
A question that lots of people (probably good they do so) refuse to answer. But if the answer is partly "End-users" or "none-coders", then this problem grows even bigger. Pure statistically seen, you will have a security hole in your site if you release with over twenty contributed modules. Probably minor security hole, but serious enough to be worried. One really cannot run a bunch of contribs without reading through them. One really cannot install a larger range of modules without hacking at least a very few, simply because of bugs, incompatibilities, rough edges, or Fugly interfaces.

## Voting, Ranking, Golden-Few, or maybe even No More Contribs.
Let me start with the last: No More Contribs. This is the most radical idea, and I am sure a lot of people might disagree, but at least we would be fair to ourselves, while offering the world a more solid product. Move all contributions out of Drupal.org. Leave them to a few decentralised third-party sites. Not some contributions.drupal.org, but really outside of Drupal. 

Some less radical ideas are voting and ranking. Derek, Dries, Gerhard and probably some other I forget, have been doing a fabulous job in improving the project module. Most was done to make them more accessible, and I have heard some rumours of ranking and voting. Even-though a high rank does not mean good quality per-sé, but at least it tells us something.

Golden-Few, but extended far beyond core:
Core has a very good quality control of what goes in, unfortunately it lacks control for what *is* in or what should go out. So relying only on core for quality-control is not enough. Sure: We can include twenty more modules in core, but these will still not suit *your* needs. Especially since that strict control for core leads to slack: we all have our favourite "man, I should really sit down and rewrite this (part of) ...". So: A Golden-Few. Any module that meets a range of criteria (amount of downloads, amount of ping-backs, positive code-reviews by X people, no outstanding bugs, etc.) could be allowed. And a same range of criteria can push a module out again. Drupal supports these modules alone. Speaking about other contribs becomes strictly forbidden :). And if we combine this with the No More Contribs, we end up with a small range (fifty, ten, hundred?) modules that we can actually support and rely on. Instead of that huge pile of code where none of us knows enough about.
