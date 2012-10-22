---
layout: post_archive
title: Help maintainers maintain
created: 1218813939
tags:
- project management
- organisation management
- drupal talk
- drupal
lang: en
---
So, there is a good thing you, as non-coder can do: clean up your mess :)Submitting issues is a good thing. Without that, there is hardly a way to improve a piece of software; after all: the only relevant test is real use.

I have been maintaining many Drupal modules for years. And I tend to give out CVS access to other people I like, trust or think are good developers. Still maintaining a module is hard work. Today, after nearly four weeks, I went trough a backlog of open issues on various of my Drupal modules. And here are some rather disturbing numbers:* **78** issues in total had to be dealt with. They were issues on my projects (yes, I had little time, lately)* **44** were duplicates. Fourty Four people who did not search properly, or did not understand the nature of the other issues[1]. * From that: **21** were marked duplicate not by me, but by the authors or others who help maintaining. Thanks for that! * That leaves: **23** issues that I had to mark as duplicate.* **12** were solved, fixed or no longer relative according to the last comments, but not marked as fixed, closed or so. * **4** were re-opened because someone did not agree with me marking it as either "as built", "by design" or "fixed" (the latter because the fixe is not yet in a stable release-package but only in a -dev version)* **18** were relevant issues. Some with patches, po-files or good feedback, others with questions on how to achieve something and again others with ready-to-commit code. Thanks for that!But that score is really bad: 18 out of 78 issues that were relevant. 23%, less then a quarter. I spent, in total, 2:30hours on all these issues. So, if my calculations are correct, I could have spent just under 2 hours improving code, fixing issues, testing patches and so forth. If only people would have looked a bit better for duplicates and similar issues. If only people would have marked issues fixed when they had them solved. And so forth.

So, a call to everyone: help the maintainer of your favorite module, and read some issues every week, and mark them properly, help the maintainer by trying to get the people involved to explain in more detail what happened (I had four issues with titles such as "error", "module not working") or to mark issues as duplicates.

That is, if you don't feel able to test patches, commit code and/or improve a module yourself, because that, IMO is still the greatest help. Thanks!Note[1] I must admit that one issue, named "make tagadelic more modular" may be cryptic and fuzzy. But if you read the contents, you would have seen that many of your feature requests were actually mentioned in there.
