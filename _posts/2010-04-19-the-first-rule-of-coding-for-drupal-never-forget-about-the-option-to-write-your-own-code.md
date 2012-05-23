---
layout: post_archive
title: ! 'The first rule of coding for Drupal: never forget about the option to write
  your own code.'
created: 1271665784
tags:
- Project Management
- PHP
- Drupal Talk
- Drupal Blog
lang: en
---
<a href="http://www.yelvington.com/content/first-rule-coding-drupal">yelvington writes</a>: "The first rule of coding for Drupal: We do not write code for Drupal." I must say, that after years , I come to the exact opposite conclusion. Right now, I should be writing another webshop (instead I am writing a blog-post, but this article is not about procastrination :)).

I was one of the most outspoken for getting the first CCK, flexinode into core. Not that project itself, per sé, but the concept. I have been a firm believer of "don't duplicate code", as such I even introduced the rule in Drupal <a href="http://drupal.org/node/23789">Join forces with others</a>. I consider myself a moderate programmer (speaking some Perl, Bash, rather good Ruby, almost Fluent PHP and rusty C, C++ and even som Java; hardly a hardcore programmer), I am lazy and tend to be pragmatic (and most often disguise the former by calling it 'pragmatic' :)).

Why write yet another shop-system when you can pick from several e-commerce tools? Because face it: e-commerce is not ready. Übercart -no offence!- simply sucks, for extendability, usability and flexibility. But that was not the main reason, that was more technical. More on that later.

Views has a performance horror luring around the corner. It might not hit you, but often will -- Views is not bad performant per sé, but it can be. CCK - well, exactly the same. And panels. Don't get me started on that! If you sincerely hate your frontend developers, give them panels. I have seriously had a person resign from his job because of panels used int their project (panels 2 in his defence, 3 is an improvement). But I do use Views in most projects, together with -obviously- CCK and about 20 other modules.  

Views, CCK, Panels are all great tools for the average quick project. Typically projects where the 80/20 rule is applied as: we build 80 and forget about the 20.  And we all know the problem that <a href="http://drupal.org/node/580026">features</a> tries to solve: you create CCK fields, use these in (dependant!) views, and override that in -PHP- templates. The always returning staging-horror. AKA 'simply repeat the creation on LIVE all over again'.  But I do not want to go into more details on the technical downsides of these modules. However important, a far greater concern outshadows these by far.

The problem that made me switch 180° was the development <em>for and in</em> CCK, views, panels and all these high-level buildingbricks. To illustrate, let me give you some quit often repeating questions; try to build them with CCK, views and related modules:

* An event-listing: next upcoming item, whose end-date is not yet passed (event is not yet finished), grouped by day.
* An article with some fields extracted (live) from a webservice: content lives not in the local database, but is pulled over SOAP, REST or similar. E.g. the editor fills in the "trailer\_id" and the trailer is pulled from a filmtrailer service.
* On Cron, fill certain nodes with data from a service or an XML-file. 
* Validate a postal-code field against a city-field; a postal-code implies a certain city. (using, e.g. a local lookup-table or some provided library). 
* People must provide either a telephone OR an emailfield. 
* After submitting a node (say a classified ad) people are redirected to the next node form (say, to add photo's), of wich parts are pre-filled and which is related to the first (in database or ORM speak: one classified has_many photo's)
* A table, listing all profile-nodes, but where the fields Prefix, FirstName, middlename, SurName, Postfix are aggregated into one column, sortable by Surname.

Right? Off course, with the right combination of computed fields, custom template logic(!) and maybe some views and CCK addons  it is possible. But far from easy.

Now, I developed each and every of above in custom modules. Let me summarise how I did that, and how many code it required.

* Eventlisting: Custom node, defined in an event.module, with a (really simple) date-field, and a (slightly less simple) database query, pushing that to a theme('table'). Done. Isolated code for this is less then 200 lines, one small module! The module became more complex, because we changed the model into "event has\_many playdates" later. Now bearing less then 600 lines, still small.
* Extraced content from a webservice: Very small custom node, defined in movie.module, on hook\_insert etc. insert the ID into a local joined table, hook\_load request external source using the value from the table. Tiny module, without  theme functions, less then 400 lines of PHP.
* Fill from an external resource: On cron, fill some custom module-defined nodes. Before we filled CCK-nodes, but the dynamic use of database (database layout changes when reconfiguring fields) made us decide to simply push all data to our custom joined table. Simple. Effective. Less then a thousand lines code, with most code on the XML parsing and validation. 
* Telephone or mailfield: A custom node, joined table, with hook_validate checking existence of one of both fields and presenting user with a proper message. Less then 40 lines of PHP. 20 minutes development or so. Other fields on this custom node are added with CCK.
* A module with several custom nodes, extendable with CCK, but some fields are stored in the database (e.g. the abovementioned telephone/mail fields) module does redirecting, validating and pre-filling on several hooks provided by Drupal. One of the larger modules, still less then 1000 lines of PHP.
* Simple SQL pager-query, some PHP looping over the items and aggregating them at wish. Less then 50 lines of PHP. Less then an hour development. 

I am not trying to look cool and say "look how fast and small I can develop", nor do I want to thumb down CCK or views, or any of the other buidling blocks. I am trying to point out how an often forgotten, simple tool can aid. 
And that writing Views addons, CCK plugins and the likes requires far -FAR- more development, complexity. Will introduce a lot more (unhandled) edge cases (seen a module that does not handle multiple fields correct lately?). And offers hardly any benefit other then the -theoretically- better re-usability. Theoretically, because when being pragmatic, you can just as easy copy paste some code from an old project, then wrinting a perfectly flexible and generic solution.

To illustrate: we spent a month on addons for übercart, views and CCK: simgle-click-checkout, insert barcode in invoices, hacking the Übercart interface in templates, writing complex -dependant and relating- fields for CCK, and so on. The client was not very happy with the workflow, we were far less happy with the enormous amount of (dependant!) code for all the addons and overrides. Loosing all the benefits of re-using code. A complex form-alter introduces just the same amount of tight coupling as a fork would: you have to maintain your form-alter code on every change of the altered form, just as well. An amount of override and template code that extends the amount of re-used code, defeats the purpose of getting a quick start. 

Rewriting the entire thing in my own modules took less then 3 weeks. And we are far futher then then 80% now, nearing 90. While the generic solution left us entirely stuck at 80%. Not being able to get out, with the only solution "convince the client that the last 20% is not very important". Well it was, and right so. We killed a project wich required over 30 modules and 3000+ lines of template code to be replaced by two custom modules (4000+lines, so rather large) and no template logic.

As if a carpenter only uses his completely computerised drilling robot, automated sawing machines and super-hightech-glue-gun. When often a handsaw, nail and hammer will get to planks together in less then 5 minutes. <em>A good carpenter might have all the hight-teck tools, but never forgets about the ease and speed of a hammer and a nail.</em>

So, yes. Using Views and CCK helps you forward. And will get your to the 100% if your 100% is not that demanding. Say, in rapid prototyping; get up a CCK+views+panels version in a few hours, see if the general idea is good, throw it out and rerite it in your own code.

But when you're requirements are slightly more specialised then a few simple modules, -developed in PHP-, are the quickest, cleanest and most pragmatic way. The only way that will make your client 100% happy. Especially when you are your own client!

<strong>edit</strong> we had over 3000 lines, not over 300 lines of template code.
