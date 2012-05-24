---
layout: post_archive
title: Grid Systems, Drupal and Semantics (why CSS frameworks are not that bad in
  Drupal)
created: 1276854578
tags:
- PHP
- Theming
- CSS
lang: en
---
It seems Grid systems, or CSS frameworks, are being picked up by the Drupal themer community. I think this is a good thing. Some think it is a bad thing. So let us have a look at the downsides and upsides of grid systems in Drupal.

### Grid Systems force you to change your HTML, that is bad. 
This is wrong, for three reasons. 

1. It might be bad, if it were true. But not all grid systems, or their implementations require changes to the HTML, in theory. I love [SASS](http://sass-lang.com/) and its tool-kit [Compass](http://compass-style.org/docs/). Compass pulls in grid systems such as [Blueprint](http://www.blueprintcss.org/) (native) or [960.gs](http://960.gs) (plugin), in such a way, that the CSS is the only thing you rewrite.
<blockquote>... you can apply battle-tested styles from frameworks like Blueprint to your style sheets instead of your markup. </blockquote>

1. The second reason, is that changing your HTML might not be bad at all. More on this in the next argument "semantic by the way. But, summarized: only if you can afford being a purist, is this an argument. In all other cases, there is nothing wrong with changing and moving some HTML around. Off course, only to some extend (see Semantics). But GS usually require only minimal changes to your markup.

1. The third reason lies with Drupal. In order to control the exact outputted HTML, you need not only a huge amount of Drupal theming experience, you need patience. And a gigantic maintainance budget. 
Drupal works with overrides: it will output source X by default, untill you decide you want to change it into Y. Now, for a [theme\_item\_list](http://api.drupal.org/api/function/theme_item_list), that is not too hard. But inherently complex functions such as theme_table, it is. And these themable "things" are themed globally: if you change the item-list-generator, all your lists throughout entire Drupal, will be changed. Not necessarily bad, but it takes a large part of full control of your source away from you.
Drupal also works with nested theme-calls. Theme-page calls theme\_foo, theme\_foo calls theme_bar, calls theme_item-list. Imagine hunting down that one item-list where you insist on having a .first and .last class, or a .horizontal-list, as required by your CSS framework. 
And lastly, Drupal is modular and flexible. Depending on your enabled modules, configuration, context or situation the source will change drastically. A logged in user may see different source and elements then an anonymous visitor. An admin with certain quick-edit-module might get popup-links when hovering certain elements. And dynamic modules, such as Views or CCK allow you to configure not only the data, but also the way the data is shown. These are all examples of modules that alter your source drastically. Again: full control of what is outputted is nearly impossible. So Grid Systems in Drupal are hard to achieve and require a lot of work, especially in details such as smaller elements on your site. But it is not that, when Drupal requires a lot of changes for minor changes in source, the concept of "making minor changes to source to force certain display" is wrong all-together. 
In Drupal it may not be practical, true. But the concept itself is not that wrong.

### Semantics.
Changing the source may be bad because of semantics. Purists say that needing to change your markup (the meaning of the information) in order to change the display (the visualisation of the information) is wrong and was never the idea of HTML.

I agree. 

However, purists may not have to deal with Internet Explorer in their work (Unfortunately, I do). And purists will steer away from Drupal. Or should. 

Taken from a random [Drupal site](http://drupal.nl). Whitespace and identation deliberately left the way it is generated.

                             		<div class="view-content">
                    		<div class="views-row-1 views-row-odd views-row-first views-row-last">
      
  	<div class="views-field-body">
                	<div class="field-content"><p style="font-size:1.2em"><img src="sites/default/files/images/drupal.png" style="float:right; margin-left:20px" />Met Drupal: maken en beheren van simpele tot en met complexe websites. Dit is de site van de Belgische en Nederlandse Drupal-community. Lees hier over Drupal's <a href="over-drupal" rel="nofollow">sterke punten</a>.<a href="node/1819" rel="nofollow"><br /></a></p>
		</div>
  	</div>
	<a href="/sites/default/files/drupal-6.17.tar.gz"><img src="/sites/all/themes/lagelanden/images/download-drupal-btn.png" alt="" title="" width="215" height="32" /></a>  </div>
                	</div>

Font sizes? Inline CSS? Field-content? empty alt tags? No alt tags at all? 4 nested Divs for a single paragraph? rel nofollow on something that clearly should be followed? Empty A-tags? How people, who work daily with a system that outputs such sources by default, dare mention the argument "semantics", is beyond me.

This tagsoup in the example, is mostly the fault of views, which, in practice, adds gigantic loads of meaningless markup. 

A class like "views-row-1 views-row-odd views-row-first views-row-last" is debatable. Some say that these are correct semantics. Maybe. But even if they are, the way some classes are embedded and some are chained makes no meaningful sense. 

Why is .view-content outside of views-row and its subclasses? Why are these subclasses, but us views-field-body not a subclass of field-content? Why do we need these in the first place? 

The answer is technical: because that markup it is dynamically generated with hilghly flexible and complex code, and we still want to provide enough handgrips for desingers to attach their CSS to. 

Certainly not semantic. You cannot convince me that the subclasses  _views-row-odd views-row-first views-row-last_ make any semantic sense. Last and first together? It is the only item in the list, so it, technically is correct that it is both the last and the first item. And since it is the first, it is also the odd item. But semantic, meaning. Certainly not more then some additional grid-two-column class. Odd, even classes are just as semantic as classes used to identify columns in a grid. 

Now, I will agree with you that the difference between:

    <p class="paragraph teaser">
     <img src="sites/default/files/images/drupal.png" alt="Drupal screenshot showing the coolness of Drupal" />
     Met Drupal: .... Lees hier over Drupal's
     <a href="over-drupal">sterke punten</a>
    </p>

and:

    <p class="paragraph teaser grid-left">
     <img src="sites/default/files/images/drupal.png" alt="Drupal screenshot showing the coolness of Drupal" />
     Met Drupal: .... Lees hier over Drupal's 
     <a href="over-drupal" class="inline-button">sterke punten</a>
    </p>

is important. And that the latter is worse then the first. But Drupal's markup does not even get close to my handcoded and cleaned example. Adding a .grid-left to the tagsoup from the example output of views makes absolutely no semantic difference. At all. Adding it to the corrected, and cleaned examples below does make a difference. 

My random example may be a particularly bad example. But before you comment with urls to examples that are cleaner, consider the heading-layout. Consider the source for logged in admins. And evaluate the entire source/markup ratio. It will be bad in Drupal. Please prove me wrong. :)

The other point is that semantics are a little overvalued. Not that I think we should abandon the idea of putting meaning in our HTML and go for the dirty solutions such as table-based layouts. I just say we should be pragmatic.
Source order, for example. 
Most screen-readers and Braille terminals "look" at CSS. That's because, in practice, most sites change "meaning" by chaning the layout. A form-label that stands above the form-element (like, by default in Drupal), even if done with CSS, will force the Braille terminal to insert a linebreak": users must take an action to enter the form-field. Changing the CSS so that a label is not display:block, but display:inline will make your forms a lot more accessible. 
Being a purist gets you only halfway in this: you will still need to look at the entire picture: javascript, CSS and HTML. 
No (sane) web-indexer will ignore javascript entirely. The google bot may not execute all javascript, but will certainly evaluate it to see if the source is altered trough these scripts.

Good semantics are not just putting a navigation below the content and providing a "skip to navigation"-link. Good semantics are about the entire picture. From source order, via minimalistic source (four nested divs around a single paragraph, for goodness sake!), via correct weight of elements (heading layout etcetera's), untill meaning-altering javascript or CSS. In practical Drupal this is as good as impossible; you can develop and design a minimalistic Drupal, but those are not the sites that stand for Drupal examples. It will, most probably, be considered an ugly, boring or not-very-representative site. Views is a de-facto standard. Zen a theme for theme-developers probably has the worst source/content ratio of all themes. And it is the most used theme. 

Good semantics is about the big picture. And no Drupalsite will manage be semantically correct in that big picture. Not without a huge amount of work, that leaves you with a maintainance nightmare, overrides that, in lines of code, will be far larger then their originals. And a content- and editors- handbook that will make all editors depressed. 

## Are grid systems bad?
In theory: yes. In practice: hardly; but only in a place where you control your source and therefore can afford to be entirely semantically correct. They require minimal changes to your source. Adding style to a place that should only contain meaning. Adding a class="horizontal-list" to an UL, in order to make it horizontal is bad practice. *In a place where the rest of the source is perfect*. But in a tagsoup like that of  Drupal, a single class="horizontal-list" will not make anything worse. Provided you can add that class in the first place, without large code changes (that need to be maintained). 
And having to re-order some HTML, but keeping it valid, is always a lot better then getting into ugly IE6 CSS hacks, that not only make your CSS invalid, but often add huge amount of extra CSS complexity to your designs.

Any Drupal themer, who does not want a CSS framework, because it does not use HTML like it should be used, is acting silly. Drupal, by default, renders HTML that is so far from semantically correct, that the additional downside of a few extra non-semantic classes, or the downside of a few extra not-so-well-source-ordered blocks does exactly nothing: and certainly not make your source less correct. If you really care for semantics, start with the low-hanging fruit and make Drupal, or its contributions, a little more semantically correct.
A Drupal themer who says that using a grid framework is not very practical, because Drupal is far too dynamic and full control of the outputted HTML, is more correct. 
