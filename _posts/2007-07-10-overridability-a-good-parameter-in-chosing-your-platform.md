---
layout: post_archive
title: ! 'Overridability: A good parameter in chosing your platform'
created: 1184100249
tags:
- Project Management
- Programming
- PHP
- Drupal Talk
- Ruby
- Ruby on Rails
lang: en
---
A good practice. A notorious problem when working with Drupal. An impossibility when moulding Joomla! 1.x into your customers wishes: how to override defaults without forking off (within a tight planning and budget).

![Graphical representation of the overridability stack](http://webschuur.com/sites/webschuur.com/files/overridability.png "The overridability stack")

Every single CMS, Framework or development toolkit, in some way, allows you to start off, with what the makers think you need. And then allows you to change that into your own wishes.
I have written before on this subject, and drew a [CMS landscape](http://webschuur.com/publications/blogs/2006-12-26-the_cmc_and_cmf_landscape). That landscape draws one thing: the flexibility. How far a tools can be stretched, so to say. 

A sentence in [Pro Drupal Development](http://www.drupalbook.com/) made me realize I was wrong there. That I looked at the wrong feature. It is not about _flexibility_, it is about _overidability_.

Overridability can be achieved in two ways: By providing online, pre-programmed options. And by providing development methods.

__Programmed options__ are often called "features and options". Joomla! comes with an online option to tweak about every pixel in your site (except, off course that _one_ pixel your client insists on having changed). Wordpress comes with options to toggle every possible _blog option_, offering people all they can configure and tweak, within their narrow case of blogging. Same goes for phpBB. Options allow you to override, but offer no real overidability. It only allows you to override options that the developer chose as being overridabel. If it was friday, 17:00 when a person was developing a part of a CMS, chances are big, you cannot override the part wich was developed: the developer wanted to go home and decided against it being overridabel. Sometimes [Feature nazis](http://www.osnews.com/story.php/12956/Torvalds-Use-KDE) Think you are better off with less options, and decide against something being overridabel. But most important: if the developer did not come up with your specific case, when deciding on options and toggles, then its also bad luck for you: no overridability in that specific part.

__Development options__, is what I, as of today, call the development stack. This is the real shizzle. Where _you_ decide.
On the lowest level you see the OS, with a server and its modules. Say apache and modPHP. Obviously you can develop [a CMS with its own server](http://plone.org), circumveting all the limitations apache and its modules lay on you. 
Above that first layer, you find the programming languages and all their modules, extensions and libraries. PHP forces you in a different direction then Java does, simply because PHP cannot do (proper) OO. One is not better then another, it simply allows you to override certain behaviour easier. Making a language "overridabeler".
One higher in the stack is the framework. Many CMSes are their own framework, or have it tightly woven into them (often very hard to find, too). This is the layer where you find ASP.net, Ruby on Rails, CakePHP, jBoss and so fort.
Above, and a little next to them, that layer you find most CMSes, such as Drupal. The overridability, by development, of a CMS depends on how low in the stack it stops. Drupal stops low, thus presenting you with a nice layer on which you can build your own site. PHPBB stops very high. Thus presenting you with virtually no options to override by development.

It all depends on audience, and not, as I thought when drawing the CMS landscape, on case. It is not the _project_, or type of site that makes a certain CMS the best choice for you, it is your own skills and knowledge.

Drupal is often considered hard to learn, unuserfriendly. Well, consider Ruby on Rails. That is even unfriendlier, becuase you start off with nothing more then a commandline! No checkboxes there to tweak options on your site. People who think Drupal should become more userfriendly <strong>in general</strong> should best move one step higher up in the stack.

Drupal is often considered a better framework then, say, jBoss or Ruby on Rails. I say it is not. Drupal is merely higher up in the stack. Wich means you don't _have_ to decide on- and develop the lower stacks. But is also means you _cannot_ decide on them. Drupal developers and all their itches decided that for you. By being higher up in the stack, you need to do less, but also _can_ do less.

This metric of overridability is a nice one. I would like to see more CMS and CMF comparisons look at that, rather then at "can it do Foo". Doing Foo is of very little value, if you, or your client want to do Foo, but in a different way then the CMS thinks you should. "Being able to easily override Foo" is of much more value then
