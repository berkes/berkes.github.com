---
layout: post
title: Minor sidenotes for Tagadelic users, regarding SA-CONTRIB-2011-013
created: 1300302500
tags:
- Drupal
- PHP
- Drupal Talk
lang: en
---
[Tagadelic](http://drupal.org/project/tagadelic), Drupals tag-cloud module, was found with a security vulnerability. From the [advisory](http://drupal.org/node/1095030): 

> The module does not sanitize some of the user-supplied data before
> displaying it on abovementioned cloud pages, leading to a Cross Site
> Scripting [XSS](http://en.wikipedia.org/wiki/Cross-site_scripting)
> vulnerability that may lead to a malicious user gaining full
> administrative access.


> This vulnerability is mitigated by the fact that the attacker must have
> a role with the 'administer taxonomy' permission which should generally
> only be granted to trusted roles.

[The fix simply escapes](http://drupalcode.org/project/tagadelic.git/commitdiff/da68e63) the description and the title before they are passed along. 

This may cause problems to the people who "abused" this vulnerability. Admins who, for example, had embedded video, HTMl markup or javascript in the description of their tag cloud page, will no longer see this after upgrading.

For them, there is no simple solution, other then the strongly discouraged "solution" of not upgrading. I discourage this not only for security reasons, but also, because any future release will re-introduce this issue. 

Taxonomy descriptions and titles were never meant to hold any markup in the first place, so if this upgrade hits people, they were abusing a Drupal-non-feature in the first place. 

A better solution would be to place such markup in a block and embed that in the theme (in a region). That way you use the proper Drupal-tools for the proper job. 

Also note that the **unreleased Drupal 7 branch is not yet fixed**.
