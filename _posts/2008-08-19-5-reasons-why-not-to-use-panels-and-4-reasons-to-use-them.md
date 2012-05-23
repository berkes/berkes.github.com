---
layout: post_archive
title: 5 reasons why not to use panels (and 4 reasons to use them)
created: 1219158959
tags:
- Project Management
- PHP
- Tips and tricks
- Design
- Theming
- Drupal Talk
- Drupal
lang: en
---
Drupal's block system is far from ideal. It was designed back in the threecolumn-era, was improved to work beyond three-columns-content-in-middle layouts, but is still unsuited for more complex layouts. 

If you want real complex layouts, you will have to turn to [Panels](http://drupal.org/project/panels), or Panels2. Or so they say.

A client of mine, a large Dutch media company uses Drupal for all its new sites -about four, five each month-, and untill today used panels in these sites. 

After some discussion, with quite some panels experience, we chose to drop them entirely in future projects; below are the thoughts and reasonings behind this choice.

1. Panels take you far away from Drupals core concept of blocks and regions, its page-handling, content-display and even its router system (the menu system).<br/>
The way of architecturing your site, using panels, is so fundamentally different from Drupal core, that panels module has to redo almost all the core page-building, core navigation, core argument-handling and core pageflow handling. This can never be a good thing; rebuilding the mayority of core concepts in a single (set of) module(s). I'll get back on this later.
1. Panels takes the layouting and design entirey to the interface. In theory, this may be handy for Bob Blogger who wants to play with his design, but has no CSS or HTML knowlede. In practice this is also not the case. Back on this later too. <br/>
With panels lying on the interface level, one can hardly program on top of it. Sure, with the proper knowlegde you can develop modules specially for panels, or create panels-specific CSS, but nearly all the work is done in the UI; most of the layout variables live in the database, and, obviously, the code for panels are a huge lot more complex then a simple region with some CSS and a theme override. If you approach [Drupal as a CMF](http://jeff.viapositiva.net/archives/2005/12/what_would_a_drupal_framework_lo.html), a framework, to develop your site with, you don't want the core structure of that site to sit in the Database (because that is where a UI stores its settings). You want your structure to live in your code: the place to build your workflows, interrelations between various content-items, and the behaviour of all your content. The samme goes for the layout: panels stores this in the database too, to some extend it still lives in the theme layer, but the mayority of layouting is done in the UI. Storing your layout in the database breaks with all rules of [MVC](http://wiki.rubyonrails.org/rails/pages/UnderstandingMVC). This can never be a good thing. And it is not. More on that later.
1. Partly because panels has to re-do a large part of Drupals core behaviour, it is extremely cluttered. Not only the tagsoup is way too complex for the average CCS-ing, the ideas and concepts of "contexts", "argument-handling", "panes" and so forth are way too complex and hard to grok. As soon as you get yourself into grey areas in Drupal such as wizards or relations (grey in Core, that is) panels make this even harder, not simpler. Panels tries to do far too much -it has to-, but in doing so, it shoots past its target: making block-handling better and easier.
1. Panels often come with the promise that "our editors can then build their own pages, and move around content". The cannot. Unless they truly understand context, various flavors of arguments, passing around variables, numerous views-settings and so forth. There is really hardly a site I worked with in panels where a block could be move from page A to page C without changing contexts, breaking workflows and often breaking an entire site. And then I am the developer. There is no distinction in interface for me or the editor; they get all the power, responsibility and complexity. Not that Drupal core blocks interfaces are friendly, but at least they have a long history, are well known and a big lot simpler.
1. When construction work is done in the interface, this interface must work at all thime. Always. Under any circumstance, including with partly broken elements in your site. Panels works with a nifty javascripted interface, to drag and drop and emulate popups and so forth. This really improves usability quite a lot, in fact! But it makes debugging and developing a site a lot harder, sometimes alsmost impossible. For example a block that -for some reason- has a javascript error (say, it shows a gmap with an invalid API key), panels break completely! The interface breaks so badly that there is really no way to disable the block that breaks it all. You need to poke around in the database, and toggle some values there to get your interface back. Panels may be usefull in a situation where you really don't develop anything, and all the components you use are  known to work flawless and stable, but on a site under-development, it breaks really often and requires quite some work to fix things again.

In short, panels tries to solve three mayour shortcomings in Drupal's core block handling, but instead of just solving these shortcomings, it comes with such an enormous bunch of extras and doing-things-different, that it shoots past its targets: 

1. Blocks can go in only one region. A login-block placed on the frontpage in the "branding" region can never be placed anywhere else, even if your followup-pages don't render that "branding", or rather show the login-block in the sidebar-region.
1. Blocks have only one place (a weight) in that one region, no matter what page you are on. You cannot give blocks on other pages another order.
1. You can switch blocks on and off with various systems, such as path-patterns, or simple permission toggles like 'show only to admins'. You can even provide PHP code to toggle a block. But this is either too hard to maintain (imagine maintaining that huge list of paths where a block should show up on a site that changes its navigation every month). It is too complex to grok (you can really not tell that editor to change the regular expression in your PHP-code everytime she adds a new section to a site) or it is too simple (show only to users in role 'editor', who have not yet visited page X).
1. All regions are loaded entirely, whether or not a page needs them or not. Say your frontpage has 12 regions and all other pages at most 4. then for each and every page the 12 are loaded and processed. Drupal finds out that in 8 of them there is nothing to show (blocks toggle to OFF for all the page but the frontpage) and hence don't show up. But the processing time and overhead is completely wasted. There is no way to toggle on or off an entire region.

My point is, that to solve above issues, you can, most of the time, choose far simpler and more effective measures then panels. I won't go into them all too deep, but I have solved each and every. And now, my client gets a few new modules to solve most of them for once and for all. Those are simple modules, without interfaces, javascript or layouts-in-databases. 

We build our layouts with CSS. Our workflows, relations and information-structures using code. And leave the finetuning for the default core interfaces. And maybe in future a module to allow editors to move around blocks and nothing more. On top of regions and blocks. 

That way we leave the V of the MVC where it belongs: in the Theme layer, and the C in Drupals modules. And with that, have managable, simple to understand CSS, theme overrides and code. And we flatten our learning curve again, which may sound strange: since Panels looks like it makes layouting a lot easier.
