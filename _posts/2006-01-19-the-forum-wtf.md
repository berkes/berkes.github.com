---
layout: post_archive
title: the forum WTF
created: 1137670155
tags:
- theming
- drupal talk
lang: en
---
I fear this is just one of those things where my perception of Drupal is just different then that of Dries et al.

<a href="http://aymanh.com/archives/2006/01/18/flatforum-into-drupal-core">There seem to plans to move flatforums into drupal core!</a>.

when I read that, my blood began to boil :). Well, no. But I <em>did</em> think "WTF to they think they are doing, trying to lure phpBB users in"? Trying to scare away our already small group of savvy themers and views developers?

Again, this is about the developer looking at Drupal, about that Dev vs User issue. I <strong>know</strong> that flatforums is a quite popular feature. But I fail to see how it can be done right.

<h3>views</h3>
Flatforum, is, in its essence, just another <strong>view</strong> of the forums. Nothing more and nothing less. 
Views, are handled by a nice combination of modules (handling the structured data) and themes (displaying that data). Or, it should be that way, in an ideal world. 

In that ideal world the theme would contain <strong>no logic</strong>. Or else very, very little, just a few conditions to prevent empty HTML elements from showing up.
We violate that mantra/guideline already quite often, by presenting options on the theme pages to toggle certain chunks of HTML on and off. The themes need all sorts of conditions to handle those toggles. We are required to build quite some logic in the themes because of this. That is BAD. For themers that makes stuf hard, because they have to design with all the (vcombinations of) all the different options on and off.
What we see, now, is that alot of themers just ignore it, and hardcode stuff in. Resulting in non-working toggles. It shows that those options should ideally live in the theme itself, not in config options.

<h3>Core options and theming</h3>
The only way I see flatforums being incorporated in core, in a Joe-friendly way is by presenting some options. Options that will require a lot of exeptions and conditions in the themes. Options that will make theming a LOT harder too. Since we then need to deal with several ways of viewing one piece of content. Hoe Friendly options are cool for Joes, but a pain in the *** for (theme) developers. If I design my site, then I *know* that i do not want certain data, like a search box on top, or like a certain forum presentation. Then why should I make (or even bother about) that an option. I will rather just theme it that way. For I will never ever change that option anyway. 

<h3>Let themes handle it</h3>
So if we do this The Right Way [tm], from developer perspective, we will do nothing in core. In fact, we could (should) even remove some more hardcoded forum styling from core. But hat is really a different issue. 

So, instead of adding this flatforum stuff as options, in drupal.css (!!) and inside forum.modules to core, let us please reconsider this. 

Themers can handle this. We should rather encourage them, to make one or two flatforum-based themes (or even one core theme). They should use the above-explained views method, to display the forums in a flatforum style. 
If one of our core themes supports this. Then the Joe Users can use that theme to display flatforums out of the box. And others can hunt for themes that display forums in flatforum (or even more fancy) ways. 

So, as soon as there is an issue for this (if ever) then I will certainly vote against anything that is not at least as developer friendly as stated above. Anything that uses options or logic in themes. Anything that makes developing a proper theme even harder then it already is, will get a -1 from me too. :)

Remove more Joe-options: power to the developers! :)

PS: the reason why I take such a strong position here, is that I would like to be ahead of all this. To make sure that there is some discussion on whether or not we should even consider starting this debate, so to say :)
