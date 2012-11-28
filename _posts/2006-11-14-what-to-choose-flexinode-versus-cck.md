---
layout: post_archive
title: ! 'What to choose: Flexinode versus CCK!'
created: 1163515843
tags:
- project management
- tips and tricks
- theming
- drupal
- drupal
- flexinode
lang: en
---
<img src="http://webschuur.com/sites/webschuur.com/files/406969_knights.jpg" style="float:left" alt="fighting knights"/>On the forums, the mailinglist and in my personal inbox I see a lot of people who don't know what to choose: Flexinode or CCK. So I decided to write down all my ideas about this in a single article.

Both Flexinode and CCK do the same, but have a complete different architecture. Both have pros and cons, so there is no general _best_ option, yet. People in the forums telling you to '_choose CCK because it is better_' (or Flexinode for that matter) must know exactly what your case needs, or are simply giving bad advice. 
And because there is no best option, I want to give some general advice and some insight int the differences, rahter then compare features and numbers, so that you can choose your best option for your specific case. 

## Flexinode is rather old.
Something that is old is also proven technology, and has been used and investigated a lot, which is good. But it is also often surpassed by newer, better options. In this case the designers of CCK took all they learned from Flexinode and designed CCK with the (bad and good) Flexinode experiences in mind.

If you don't mind uncertainty, and if you don't mind upgrading several times during or after development and deployment (CCK APIs are still changing a lot, for example), then CCK may be the best option. Else Flexinode is the better option, because you know what you can expect and what you cannot expect. You know what works and what does not work. And in (budget-)critical project _knowing what does not work_ is often worth far more then _hoping that something might work (in the next release)_.

## CCK has a better architecture.
True. A fact is, that the Flexinode database tables are badly normalised. Another fact is that Flexinode brings down performance on your site quite a lot, because of this architecture. See more about performance below.
It becomes even worse when you want to 'warehouse' your (node) data. When you build an external application that connects to the databases ad uses the node data in some way (import export, for example) then the Flexinode database architecture makes this very hard for you. CCK's database is very well normalised and will make external access a lot easier. 

## Flexinode performs bad.
Some people say that CCK performs a lot better, but so far no-one proved this with factual data. I only know from daily use, that CCK performs not to well either, compared to simple 'title-teaser-body' nodes (wich is obvious, but still worth noting). But, as said, until today no-one has benchmarked Flexinode versus CCK. A fact is that CCK caches its data very well, something that Flexinode does not do that well. This makes CCK perform _theoretically_ better then Flexinode. But Flexinode has far less (complex) code, wich might have a positive effect.

## CCK has far less fields available
Developing a field for CCK is a lot harder than for Flexinode. See more about development below. This results in far less fields being available for CCK then for Flexinode. This is changing rapidly, as people commit new CCK modules, so if you dare to take the risk of '_hoping there will be more available soon_' you can ignore this part, because there are more (active) CCK developers right now, and thus the amount of _working_ CCK fields might overtake the amount of _working_ Flexinode fields in the coming months.

## Flexinode is on a dead end.
Not true. Allthough it is not as heavy under construction as CCK, and has far less active developers it is not on a dead end. Flexinode is old, and CCK is presented as its replacement, but until now there is no upgrade from Flexinode to CCK available, nor is CCK out of the box as stable as Flexinode. As you can read in this post, CCK is not yet the absolute replacement for Flexinode.

I am not sure about the exact numbers, but a rough guess, based on the download statistics, tells me that there are still more Flexinode-using-sites out there then CCK-using sites. 

Flexinode's upgrade to 4.7 was a horrible experience. At the time of upgrading it was unmaintained, resulting in about 5 developers working independent on new features, upgrades to 4.7 and on bugfixes. This broke Flexinode so badly that when I took over the project as maintainer, I spent two full weekends only undoing CVS commits. Right now the 4.7 download tarballs are still a mess, because of incorrect branches and merges made during that "age of chaos". For the 5.

X upgrade I am doing this in a much more structured way, this post being the first step in that project. But I can assure that there will be a 5.

X release of Flexinode, simply because I need it :).
After that release, we will branch off into a stable bugfix 5.

X branch (which will ensure you don't need tough upgrades etceteras) and a clean branch, which will be a branch that allows us to clean out Flexinode code and API's as well as introduce new features and so. 

## CCK is going to go into core.
I doubt it. Not in its current form anyway, if I understood Dries correct. The chances are there that the upgrade from CCK to some fields system in core will be easier then the one from Flexinode, due to the architectural differences, but choosing CCK because 'in future it will be part of the official Drupal' is a bad idea. 

## Flexinode is easier to develop for.
Both true and untrue. It is _far_ easier to hack together a field for Flexinode, then to develop one for CCK. But due to its weird database architecture, it is very hard to make modules that do 'stuff' with the Flexinode nodes, while this is easy to achieve for CCK.
If you need to develop your own fields (optionally with some behaviour such as validation) Flexinode is a far better option. If you need to develop modules that use the metadata (field data, in the database) then CCK is a better option. 
After five months of CCK development, I, personally, still need over 8 times as much time to develop a CCK field then to develop a Flexinode field, which means that a simple field for CCK is 8 times as expensive (and possibly 8 times as hard to maintain) then a Flexinode field.

## Flexinode has no views implementation.
True. Due to its strange architecture this is very, very hard to make such a views library for Flexinode (see above about developing for Flexinode). If you depend heavily on views, then CCK is the only option. 

## Flexinode is easier to aadministrate then CCK.
CCK allows more complex administration, wich comes with a price. The focus with CCK seems to lye on the architecture primarily (still). The interface is harder to grok then Flexinode's, and all the complex features make it hard to understand and might not be needed at all. The modularity and flexibility in CCK potentially allow a lot more usefull things, but until today most of these complex features have no real use yet, and seem to only confuse administrators, according to a quick scan in the support forums. So if you need a simple interface, then Flexinode is a better option. Though this may change once the focus in the CCK development shifts towards more userfriendliness.

## CCK has no teasers.
This is a missing feature in CCK, but one that has been implemented in Flexinode rather well. In Flexinode one can set the teasers by checking a show in teaser' checkbox. In CCK one has to build complex PHP in his or her theme to achieve the same. I am not following the last development on CCK as close as I did, so there might be a solution in some future version, but in 4.7 stable release a full node and a teaser are always the same.

## Documentation is bad
By now  think both Flexinode and CCK are both badly documented. A few months ago Flexinode was the only one being badly documented, because CCK was not documented at all. CCK is a lot more complex, the learning curve is steeper and it is still heavy under development. This results in a much larger effort needed to document and understand CCK then needed for Flexinode.

## Themability hardly differs
There is hardly any difference between Flexinode and CCK. Flexinode uses less complex variables then CCK, so it looks friendlier in a theme, but featurewise and codewise both hardly differ. For both Flexinode and CCK there are modules that make development of themes for the nodes easier. CCK nodes, however, look better out of the box, then the Flexinode fields, so when you might be 'forced' to theme your flexinodes, the CCK nodes might be good enough for you.

## Conclusion 
__Out of the box, click-n-run, with little extra demands Flexinode might be the best option for you on a small site.
For a development project CCK, for complex configurations and for coupling with external applications CCK is a better option.__ These conclusions are not absolute, and a small detail in your program of demands (such as the availability of a certain field) may make the balance over tip to the other side.
