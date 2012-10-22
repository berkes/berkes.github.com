---
layout: post_archive
title: Design principles for creating Good Classes let you write Good Drupal Modules.
created: 1276166851
tags:
- project management
- programming
- php
- tips and tricks
- drupal
- drupal
lang: en
---
Drupal is not object oriënted (OO). No really, <a href="http://drupal.org/node/547518">it is not</a>! It merely borrows some design principles from OO, and uses some design concepts (such as the <a href="http://en.wikipedia.org/wiki/Observer_pattern">Observer Pattern</a>, or hooks, in Drupal) from OO. 
Though many Module developers actually use another design principle, that of Classes. When creating a module, one can borrow almost all ideas from the (good) design of classes, to create a good design for a module. 

Maybe you think: "Why should I design my module"? (When I say design, I do not mean graphical, or UI design, but technical design, often called software architecture). If you ask yourself that, then get back to your developed modules. They may be so small, and welldesigned that you are a natural talent. But more often, you will let them grow, maintain them, add features and think everytime "I should really rewrite this module from scratch". The problem is't that the ad-hoc is a bad way of coding. But that good abstraction, good design, offers many benefits. It not only make your projects easier to run, it also makes your sites a lot more stable, predictable and -overall- better to use maintain and extend.

Good classes, and hence good modules, have several benefits: 

 * You can hide implementation details
 * Changes don't affect the whole Drupal environment
 * The Drupal environment is more obviously correct
 * You don't have to pass data all over your entire Drupal
 * You are able to work with real-world (and website) entities rather then with low-level implementation structures. 
   —Taken, and adapted from <a href="http://cc2e.com">Code Complete, second edition</a> Working Classes, p127-128

But first let me answer the question whether modules can be compared to classes, at all. 
The Drupal handbook, <a href="http://drupal.org/node/292">Introduction to Drupal modules</a> writes:
  <blockquote>...[a module] is more of <em>a concept that encourages good design principles</em>. Modularity also suits the open-source development model, because it allows a number of developers to contribute functionality to Drupal <em>without risk of interference</em>.</blockquote> (emphasis added)

Those are reasons why classes were created in the first place: as a good design principle, to lower the risk of interference. Or, to avoid changes infecting your entire Drupal site.

But, more important, is that modules in Drupal are supposed to be highly focused: do one task and do that well.
The general idea in Drupal, is that not a forum module offers all features phpBB offers, but that a phpBB-alike forum is achieved by pulling together many modules: often one module for each feature you wish to introduce. This mathces that other great benefit of Classes: <em>You are able to work with real-world (and website) entities rather then with low-level implementation structures.</em>.

The <a href="http://drupalmodules.com/module/user-display-api">User Display api</a>, offers a consistent, focused programming interface to deal with statii of users.  When I talk of interfaces, I mean programming interfaces, not user interfaces (UIs). Interfaces in Drupal are hooks, theme-functions, database-api functions, and public functions. 
Eventhough Drupal, or actually PHP, has no proper support for setting the scope of data and methods (functions), the Drupal convention is to prefix private functions with an \_underscore(). 

So, instead of a forum module that has several features to control the display of the online status of users, Drupal encourages the use of several modules, on top of Drupal core, to introduce such features <em>by themselves</em>.

The answer therefore is: "no, modules are not really classes", but rather "Good Drupal modules follow a lot of design principles of classes in OO". You cn approach a module as you would approach a class. But you cannot use all the concepts from classes in a Drupal module. 

I took the liberty to modify McConnells, the author of Code Complete, checklist from the book Code Complete and adjusted it to suit module development. He writes a checklist that you can use to see if your classes and their use is Good. Another book to read on this is <a href="http://c2.com/cgi/wiki?DesignPatternsBook">Design Patterns</a> by the Band of Four. The latter is slightly more academic, but still great if you want to become a better Drupal developer.

I adjusted the checklist from Code Complete, so it becomes a checklist that shows you if your module is Good. It makes a great checklist for writing awesome modules: 

### Abstract Data Types

 * Have you thought of the modules in your drupal implementation as Abstract Data Types and evaluated their interfaces from that point of view? (Where, again, interfaces are programming interfaces, not UI's)

### Abstraction

 * Does the module have a central purpose? 
 * Is the module well named, and does its name describe its central purpose? 
 * Does the modules's interface present a consistent abstraction?
 * Does the modules's interface make obvious how you should use the class? 
 * Is the modules's interface abstract enough that you don't have to think about how its services are implemented? Can you treat the module as a black box? 
 * Are the modules's services complete enough that other modules don't have to meddle with its internal data? 
 * Has unrelated information, user interfaces and functionality been moved out of the module? 
 * Have you thought about subdividing the module into smaller modules, and have you subdivided it as much as you can? 
 * Are you preserving the integrity of the modules's interface as you modify the class? (i.e: Can you provide backwards compatibility, without losing the ability to change the code in your module?)

### Encapsulation
 * Does the module minimize accessibility to its internal functions? 
 * Does the modules avoid exposing data, such as global or accessible variables? 
 * Does the module hide its implementation details from other modules as much as the used concepts (hooks, theme, etc.) permit? 
 * Does the module avoid making assumptions about its users (the other modules using this module, not users visting the site), including its derived modules (modules depending on this module)? 
 * Is the module independent of other modules? Is it loosely coupled? (i.e a form_alter that expects forms to be in an exact state are tightly coupled, a nodeapi inserting a new piece of data into a node is loosely coupled.)

### Inheritance
 * Is inheritance used only to model "is a" relationships? (i.e. dog.module, depends on mammal.module, but never on user.module)
 * Does the class documentation describe the inheritance strategy? (i.e. when Module Cat depends on module feline, does it tell this to the users?)
 * Do derived modules avoid "overriding" non overridable routines? In PHP and Drupal only achievable by well-commented code. 
 * Are inheritance trees fairly shallow? 

### Other Implementation Issues
 * Does the module contain about seven data members (public functions) or fewer? 
 * Does the module minimize direct and indirect routine (function) calls to other modules? 
 * Does the module collaborate with other modules only to the extent absolutely necessary? 

If you want more in-depth information on these statements, please refer to Code Complete, second edition, Chapter 6. Or leave a comment below so that I can try to explain it in more detail.

In general, the idea is that all rules of thumb that apply to designing good Classes, are usefull for designing good modules. Keep it small, simple, focused and try to hide as many as possible for others. 
In Drupal that would mean: provide hook_implementations, but keep all the other functions private. That function that iterates over the latest coffee-mugs to extract their avialability in the shop: should never be available to other modules. 

You can prefix private functions with an underscore, such as _\_coffeemugs_extract\_availability(). Or stick them in include-files, and mention in the code-comments that others should keep away from your inc files, at all times! 
Avoid calling functions in include files. Avoid calling any function in any other module, unless it is explicitely advertised as "usable by others". 
Try to avoid introducing such functions as often as possible, rather create a new hook, which, by its nature, is public.

Keep your module focused. A _print\_and\_pdf\_and\_mail\_for\_nodes.module_ is a bad module. An "alternative\_rendering.module", with inheriting modules "print.module", "pdf.module" and mail.module" is far, far better design.

And go read <a href="http://www.amazon.com/Code-Complete-Practical-Handbook-Construction/dp/0735619670">Code Complete</a>. It will make you a happier Drupal developer. 
