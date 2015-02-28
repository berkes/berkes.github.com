---
layout: post
title: "Tagadelic: TDD, OOP and seeking maintainer"
tags: [tagadelic, Drupal, TDD, OOP]
lang: en
---

**TL;DR**: [Tagadelic](http://drupal.org/project/tagadelic) is close to a Drupal 7 release, with an easy upgrade
path to Drupal 8. It is completely rewritten, Object Oriented and Test
Driven. Since I don't do any Drupal anymore, I am looking for someone who can maintain
a clean, OOP and TDD-module, to take it over from me.

There is just so much you can do when porting an age-old module again
and again. Tagadelic has been around since mid-2005, has been ported
over and over again. Mind you: not upgraded but ported. Quick, dirty and
"works-for-me" ports. Like most other modules, actually. There never was
a stable release for Drupal7, because the module never was really stable
in the first place. Yes, it might work (for you), but that is far from
*stable* and releasable. 

Between 2005 and now, I learned programming properly. I mean, OOP,
unit-testing, patterns and all that (This also lead to me, [abandoning all
my Drupal work, mostly](http://berk.es/2012/10/01/farewell-drupal/)).

None of my publicly released Drupal-modules ever
resembled that progress I made; mainly because Drupal itself is not OOP. Has poor
testing abilities (please read on, I will explain later) and applies
quite a few anti-patterns. This makes writing really clean and pretty code,
somewhat discouraging. Most of its examples, best practices and defaults
go straight against what is in general considered best practice.

But since Tagadelic is used by a lot of people, I wanted to create a
*proper* replacement. A module with pretty code, easy to implement APIs
and some additional, turnkey modules for those who cannot or will not write these
few lines of PHP. A module that resembles what I now consider good code
and properly developed. As a replacement for what I thought proper 8
years ago.

I coded for several months and today released the first alpha.

In the long run, I can conclude three things: 

Drupal is not really ready for OOP development. The interfacing between my module and Drupal
required me to write wrappers (so that Tagadelic classes access
Drupal-functions in an OOP-manner) and to write the modules themselves
with global functions, since that is how Drupal expects the hooks and
implementations.

DrupalWebTest is way, way too slow and feature-poor for Test Driven
Development (TDD). Tagadelic only has about 150 DrupalWebTests, but running
them all takes over 5 minutes (on my machine: quad-core Intel 2.67GHz, SSD drives
only). Note that in a typical Rails (being -rightfully- known for being very
slow) with cucumber suite of over 600 tests takes under 30 seconds;
that includes selenium opening Firefox and clicking around in a few
tests. 30 seconds is considered unacceptably slow there.

When developing test-driven (or Behaviour Driven) you typically
run the isolated tests five, six times. And the entire suite of tests at
least once. So aside from the actual coding, the testing alone takes 30
minutes. This is both discouraging (meh, I'll just assume everything is
still green, will test in next iteration) and very hard for your "flow"
and concentration.
It is feature-poor in a sense that I ended up writing most assertions
and several set-up functions myself. assertXpath()? Nope. assertHasId()?
Nope. assertIdenticalArrays()? Nope. And worse is that it breaks a very
important rule for testing: isolation. If you want to test whether some
admin-setting can be saved and creates the proper variable, you are also
testing whether a Drupal is installed properly, user can log in, is admin,
can access a page, has nodes, has access to creating these nodes and so
on. I ended up poking into the database (not even "my" tables) because
somewhere in the clutter of setup-tasks stuff was created but it failed.

It is really fun to write unit-tests with [phpUnit](https://github.com/sebastianbergmann/phpunit/). I was very much
positively impressed by that test-environment and by using it. The
biggest adventure was how to stub out Drupal. Drupal, using global
functions for stuff like `check_plain()` is nearly impossible to mock
and stub. I solved this by extending my [DrupalWrapper](https://github.com/berkes/tagadelic/blob/7.x-2.x/tests/TagadelicCloudTest.php#L106) and
stubbing that. After all: I don't care whether `check_plain()` itself
works and clears out XSS, I only care whether or not my classes call
that function in proper places to ensure clean output. Testing whether
`check_plain()` works is not my concern, here. I chose phpUnit over
DrupalUnit, because the latter is pretty much [unusable for
unit-testing of arbitrary classes](http://stackoverflow.com/questions/6045241/unit-testing-drupal-with-drupalunittestcase-fails-on-database-setup/6046100#6046100).

And now it is time for someone, or several someones to slowly take over the module. Together
we will release a Drupal7 2.0 version and then I can carry over all
project rights on my last Drupalproject.

Interested? You should be:

* Familiar with PHP OOP development. You should probably feel that the
  usual way of Developing Drupal modules in a none-OOP manner is not
  a very good way.
* Familiar with PHPunit and Drupal Tests. You should feel strongly for
  TDD and good test-coverage. You should probably feel that even though
  writing Drupal Web Tests is not (yet) perfect and requires time and
  effort, it always should happen.
* Able to maintain such a module for a substantial time. It being TDD
  and all, means that it won't take you a lot of effort or time. But it
  would be a shame if three months after a release you abandon it
  altogether because you like Node.js better. Or so.
* Wanting to develop on Github. At least until the 2.0 release.
