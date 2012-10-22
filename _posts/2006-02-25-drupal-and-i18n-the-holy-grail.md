---
layout: post_archive
title: Drupal and i18n, the holy grail?
created: 1140875294
tags:
- drupal talk
- newsphoto eu
- sympal.nl
lang: en
---
Or, how to get the project rolling.

First of all we need to recognise that there is no Ultimate i18n solution. There are many, all depending on the needs, cases and implementations. 
So, I really do not believe in a single i18n module. Or in a holy grail. Therefore I torn the problem apart, and made Lego blocks out of it. That way the problem becomes rather clear.
<!--break-->
On the top level there are a few types of i18n sites:
<ol>
<li>Mixed content. Sometimes I blog in English, sometimes in Dutch.</li>
<li>Mirrored translations. For *every single item* in a "normal" site, you now need X amount (X being amount of active languages). this can be reduced by saying 'I need admin areas only in language A, admin is defined as  Foo and Bar'</li>
<li>Growing translations. For every piece of content there may, or may not, be a translation. Think about freetagging (a tag beer and a tag bier). Or about community efforts to get pages translated.  interlingual connections (read this in langB) lay, or may not be required.</li>
<li>A few pages in langA to explain what its about. Simple, just maintain a few pages in another language.[1]</li>
<li>Inline translations. Only certain elements of content have to be translated. Example: <a href="http://www.newsphoto.nl/node/1456">a photogallery (yes, badly implemented!)</a> with only English and Dutch "descriptions". They may appear on one page even. Or wrapped in a &lt;span class=lang en"&gt; Other elements may not be translated like the title, that can be the same for both languages.</li>
</ol>

We can also differentiate some other translations areas. The clear difference being: 
<ol>
<li>content (day-to-day content like terms, nodes, comments, profiles. oh if only they all were *cough* :))</li>
<li>interfaces (PO file import export)</li>
<li>admin submitted configuration (think menu-titles, or user roles, or flexinode types, or profile fields)</li>
</ol>

The good news, is that all the types have one common denominator: language switching. Except maybe for site type 4.

The bad news is that both workflow and interfaces differ a *lot* between the various types. 

So here is what I propose:
<ul>
<li>locale.module+locale.inc, current implementation MINUS language choosing/switching interface and code! handles "translate area 2".</li>
<li>lang_switcher.module. A *simple* API/library module containing only APIs and a block to select languages. No editing interfaces or forms should be in there. Should also contain the three methods of storing the language in APIs. $SESSION, url prefix /en/node/12 /fr/node/12  and url postfix ?lang=en.</li>
<li>config_translation.inc. the toughest part: a contrib that allows us to translate missions, blocks, menu-items etc. handles "translate area 3". I have a fuzzy vision of some form_alter, combined with table prefixing (ugh!) and variable_get/_set prefixing. Needs clear thought.</li>
<li>Loads of modules and or themes using these APIs and systems to allow a variety of cases and workflows. Node_translator.module, comment_lang_switchers (yes, ever thought of how to avoid EN comments appearing under the DE version, heh?). oh and, off course a contrib user_profile_lang.module, containing the part from locale.module, where you store your language preference in your profile.</li>
</ul>

And now? Fists in the air and *ffoooorwaaaaaaard* :)

Serious: if we think these Lego blocks are well defined, we only need to make them, the blocks. Most of this is ripping stuff from existing modules, putting that in other modules and finetune that. Oh, and occasionally we need to build non-existing stuff, like config_translation.inc/.module.

Starting here, IMO is better then writing down that the industry needs i18n, not? Or developing yet another module for translating the 60% your specific case needs translated (and no-one else will ever need).

BZR? CVS? bright SVN? Drupal.org issues? where to start?

Bèr

[1] unfortunately not /that/ simple, because if you want to have poor SEO and so, you need to add the lang="" entity to the surrounding XHTML.
