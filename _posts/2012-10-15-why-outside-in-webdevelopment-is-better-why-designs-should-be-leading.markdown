---
layout: post_short
title: "Why outside in Webdevelopment is Better; why Designs should be Leading."
tags: [webdevelopment, webdesign, projectmanagement, TDD, BDD,
outside-in]
lang: en
---


Designs should be leading when building a website or -application.
There! I said it.

Sure, form follows function; content is king and so on: a design should be a Good Design to begin
with: it should carry the function, content and user-experience to a
higher level. So, for the sake of the argument, let us assume you have the Perfect Design For Your Project,
Audience and Branding. It is UX-tested. It is 
delivered as valid, clean HTML and CSS, backed with PSDs, Wireframes and looks stunning.
It has passed numerous PR- and marketing sessions, and even the boss
wants it implemented like this.

Enter "the technical guys". People like me, a _backend-guy_. **Sorry, but
the CMS we are going to build it with, makes it really hard to implement
this design.**, sometimes followed with the really pragmatic solution to
**Have the CMS dicate the way the application works**. To **redo the
wireframes according to how the CMS works, because that will save lots
of time and budget**. That last word, being the most important one:
**Budget**.

People think visual. People talk visual. And our delivery is mostly
visual: people interact with our -technical- solutions through the "interface",
that which was in "the Design".

But most important: the design, that interface, is most prone to change;
from small changes in wording in a footer, to a grand
rebranding-overhaul: mostly interface changes. When I calculate the
tickets in the projects I am now involved in, 80% of the tickets are
"interface"- or "interface-related". First because this interface is
where any problems below surface and second because this is what 80% of
your and my clients care about: the interface.

Yet, Even though most of the communications and deliveries are
outside-in; we work inside out; starting with database-designs,
CMS-configurations from which we work towards the interfaces.

## But how?

You'll be developing the innards of the application (its models,
controllers) and then, in the end, need a giant hammer to beat the
views, glued to it, into shape to match as closely as possible to your
designs. 

It gets worse when these innards are fixed, because you use a CMS that
has them built in, for example. You'll be writing extensions, hacks and 
overrides all trough that CMS, just to make it output its interfaces as
close as possible to designs.

The solution lies in **outside-in development**. I encountered that term first in [The
Rspec Book — A
Comprehensive Handbook for Behaviour Driven Webdevelopment](http://www.pragprog.com/titles/achbd/errata). And I am loving it.

The idea is as simple as pragmatic: [you develop by making the views, the
interface first](http://teachmetocode.com/screencasts/introduction-to-outside-in-development-with-cucumber). Then fixate them in tests (specs), so that the
interface, the HTML is fixed in your project. From there on, you develop 
the underlying application, whether those are modules for a CMS, models
and controllers for an MVC-framework or configurations of a
point-and-click-tool.

Once the HTML (and thus the CSS and interaction) is fixed, a test will
start to fail the moment someone touches that HTML. Developers can
therefore develop, refactor, and rewrite the underlying application as
often as they wish, without breaking the Designs. Sounds cool, not?

## Flexibility.

Well, maybe not if that underlying application lacks the flexibility to
be rewritten, altered and changed without making these views-tests fail.
If, the moment you install an extension, all your tests turn Red (they fail), 
your tests, the fixed interfaces, become a burden. It is then near
impossible to keep them passing, without all the hacks, extensions and
configurations. That is probably the moment that you decide to rather
change the view-specs (i.e. Divert from the original Designs) just to
get forward.

It means you have the wrong tool. It means you have a tool at hand where
you'll simply never get 100% according to design. Where the tool
dictates the designs and workflows of the application. If that works for
you, then outside-in development makes little sense; but in that case,
be very aware of this all trough the process; It really makes no sense
to have a UX-lab test all the wireframes and mockups, if two weeks
later, you find you cannot implement these wireframes and mockups 
anyway, due to the underlying inflexible tools.

Most RAD frameworks like Rails, Django, and various or their PHP-clones,
are flexible enough in this, because they don't (ever) assume anything
about your wireframes and designs. 
Some, very few actually, CMSes allow this too.

## An example?

In Rails many people test with Rspec; Views are (arguably) best
described in cucumber features. The exact syntax and setup goes way
beyond this post, so let's look at some pseudo-code:

    Scenario: I want to log in
      Given I am signed in
      When I click on my name
      Then I should see my profile-page

A simple feature, described in [Gherkin](http://cukes.info) and fixates the actual views
with so-called step-definitions: 

    Given /I am signed in/ do
      @me ||= Factory(:valid_user)
      When %(I go to the new user session page)
      When %(I fill in "Username" with "#{@me.username}")
      When %(I fill in "Password" with "#{@me.password}")
      When %(I press "Sign in")
    end
    When /^I click on my name$/ do
      click_link("#{@me.first_name} #{@me.last_name}")
    end
    Then /^I should see my profile-page$/ do
      page.should have_xpath('//*/h1.name', :text => "#{@me.first_name} #{@me.last_name})
    end

This is a really simple test to ensure that a logged-in user, who clicks
on a link with her name, gets to see the profile-edit page, containing
an _H1-tag_, with class "name" and contents of the users' name. Real
world tests, with more detail [over at Jared Carroll's blogpost on this](http://blog.carbonfive.com/2012/02/14/beginning-outside-in-rails-development-with-cucumber-and-rspec).

## Downsides?

Certainly. As you can see, just to describe a login-form, a link with my
_username_, and a generic _H1-tag_, I already need one entire _story_. Depending on your
test-suite and your application, you may have to write far, far more test-code then "actual"
code.

But outside-in development is just one of many reasons why one
might choose for test-driven development. Writing tests requires
effort, time and dedication. Without tests you have no way to describe
and fixate the interfaces. And without that, there is no outside-in
development (And you'd best tell your designers and clients right-away
that you are not going to get 100% pixel-perfect interfaces, within
agreed budget and time... :) ).

The upside, is that your application is tested, and can easily remain
so. With each release, a few commands ensure you that your (ever
growing) application works. That all the work by all your colleagues or
contributors remains working. And that the interfaces, the one thing
your users care most about, work and look the way they expect them to
look.
