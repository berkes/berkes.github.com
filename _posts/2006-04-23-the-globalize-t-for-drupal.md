---
layout: post_archive
title: the globalize.t for Drupal?
created: 1145785452
tags:
- Drupal Talk
- Ruby
- Ruby on Rails
lang: en
---
More a note to myself, but this could be interesting for others to look at too.

In Ruby on Rails there is this [very powerfull localization plugin](http://globalize-rails.org/wiki/). It uses a very simple concept of .t. For those new to the concept of OOP and Ruby more specific, anything is an object. So "today" a variable containing todays date, is an object too. As is the number 23.4599, or the string "Drupal". Any object can have a method. "Drupal".length calls the method lenght for "Drupal", it will return 6..t is a method to anything localisable. todays_date.t will return a localised version of today."My Title".t will return a translated version of "My Title".

But why in planet Drupal?Drupal can translate strings, but strings are about all we can translate. I cannot translate prices (€20.34 in some countries, 20.34€ in others). Or numbers (12'000 in some countries, 12,000 or even 12 000 in others). And off course dates. We have some date formats that can be chosen, but they can (and will) never contain all formats used all over the world. We all agree that we need to pull these options to the localisation engine. But we all disagree on how this should be done. I put this note to myself up, to investigate this .t idea further and see how it can be used in a Drupal environment. The simplicity is what we really want for Drupal, as is the power of it. But the implementation could be ha bit harder :)
