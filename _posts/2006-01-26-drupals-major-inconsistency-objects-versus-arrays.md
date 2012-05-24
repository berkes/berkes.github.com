---
layout: post_archive
title: Drupals major inconsistency, objects versus arrays
created: 1138306157
tags:
- Drupal Talk
lang: en
---
Drupal is well known for its clean code (in core at least) and its strict rules to protect that clean code. However, especially since the form API, but actually since the menu made the entrance, we have one mayor inconsistency: use of objects and arrays.Guidelines for the use of objects or arrays are nonexistent, as are any plans for where to go.Drupal uses both, sometimes keyed arrays, often structured objects. In most of the programming languages, the rules of thumbs are: Use objects for structured variables Use arrays for lists of variables.These resemble my preference too. But, I beleive we should not really discuss which our preference is. Rather just choose one now, and maintain that for future.If we choose now, that we are going for structured arrays (Keyed arrays resemble the structured data), then we have a lot of code to rewrite. But at least we know what the Drupal default is.However, in both the form API and the menu API, we use arrays to define and hold structured data. We use keyed arrays, inside keyed arrays. So, if we choose to live by the above-stated two guidelines, to use arrays only for lists and objects for structured data, then we should re-write the complete code of the form API and that of the menu. There probably are some more minor parts that need attention in both scenarios too.So, hereby: my personal preference is to choose Objects for structured data, and arrays for listed data. But that aside, I really hope that the Higher Powers of Drupal choose one, that we can write that down and then work towards a consistent core again.
