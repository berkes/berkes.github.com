---
layout: post_archive
title: The problem of Drupals exponential complexity
created: 1277294977
tags:

lang: en
---
Over the last days, I helped a client with some bugs in a really complex Drupal site. The site is that complex, because clients "needs" and "wishes" were to be met. So gradually more and more modules were stacked onto this Drupal. Resulting in a site that no-one can really grasp. At all. Now, if modules in Drupal were entirely self-contained and very loosely coupled, something I [consider good practice](/publications/blogs/2010-06-10-design_principles_for_creating_good_classes_let_you_write_good_drupal_modules), this would be of little problem.

The issue, however, lies at the conceptual side, not so much the technical side. Technically such systems suffer from what is called [Exponential Complexit](http://en.wikipedia.org/wiki/Programming_Complexity) _For every feature (module) added, the overall complexity increases exponential_Hence the amount of breaking features, bugs and regressions will grow exponentially too. For every feature introduced in your site, several new modules are required. For every new module, the complexity can grow N times. Let us say 5 times: an eaverage module contains about 5 hooks and overrides. A Drupal-site with 10 modules might suffer from 6 bugs; big change you won't see any of them become a problem on your project. A Drupalsite with 12 modules would then suffer from 150 bugs, part of which _will_ become a problem at some time. The solution can be sought on the technical side, but frankly, I don't believe there is a holy grail. A system built from self-contained, loosely coupled entities, will, typically, suffer [far less bugs and related problems then tightly coupled entities](http://www.cs.umd.edu/projects/SoftEng/ESEG/papers/82.78.pdf)In web-development you will see that e.g. a project in Django, due to its loosely coupled design will suffer from a lot less "exponential complexity": if there is a bug in the blogs, that is where the bug is. > A key advantage of such an approach is that components are loosely coupled. That is, each distinct piece of a Django-powered Web application has a single key purpose and can be changed independently without affecting the other pieces. For example, a developer can change the URL for a given part of the application without affecting the underlying implementation. A designer can change a page’s HTML without having to touch the Python code that renders it. A database administrator can rename a database table and specify the change in a single place, rather than having to search and replace through a dozen files.

The bug will not travel trough the entire site and pop-up in random other places. Drupals design philosophy is exactly the opposite: it is entirely horizontal. Due to this horizontal design bugs can travel troughout the entire project. When you introduce a bug in the messaging system and pow! all mail stops working: maybe (in the case of this clients projecte, that was true) the whole cron stops working: search indexes, sessions, garbage collection etceteras no longer work. One small bug, a misconfiguration, caused a PHP error that could have brought down the entire site in due time.

One bug caused at least 7 things to break. These 7 things would cause again X new problems in due time. How to fix this? In Drupal, the only way to fix this is to use as few modules as possible. And even then, to select these modules on their "loosely coupled-ness". So avoid modules that depend on certain Views configurations. Avoid modules that go sit inbetween all your mail transports, avoid modules that depend on other modules. In practice that would mean: just avoid all modules alltogether :). Not very practical. Again, this comes down to common sense: at the very least, avoid Drupal-projects that are so complex that no-one understands them. If you don't understand the messaging-system-modules, then don't use them. Look for an alternative. Even outside of Drupal. Choose the simplest solution. You can always let your site grow over time: add features when they are really needed. That way, at least, you will have to deal with the exponetial complexity only one-step a time: even if those steps will become bigger while your site grows, they are still smaller then the giant leap at a single delivery of a huge site.