---
layout: post
title: Menu System, url scheme and Google
created: 1094733842
tags:
- Thermal-Elements
lang: en
---
Using Drupals menu's can help you improve your search-engine rating a lot. Provided you structure your menu well. This article summarises the details on how this is achieved in one of my projects.

For the menu's in thermal-ements.nl i decided to use the menu system that is default in drupal. <br />
But I decided to create a second menu, called navbar. That block will not be displayed in a sidebar, but instead in the top, as tabs. <br /> <br />

The system uses a structured URL scheme, that should be followed for consistency. <br /> <br />

Lets assume the following tree 
<pre>
Drink
--Milk
--Coffee
Food
--Sandwich
--Frieten met mayonaise
</pre>

the urlscheme should follow this and thus look like: <br />
drink <br />
drink/milk <br />
drink/coffee <br />
food/sandwich <br />
food/frieten_met_mayonaise <br /> <br />

note that all is small fonts and note that spaces are replaced by and underscore. It is not required, but search engines like Google rate very high on a well designed structure. So if someone searches for "Coffee Drink" and the urlscheme is simply /coffee it will not rate as hight as /drink/coffee.
