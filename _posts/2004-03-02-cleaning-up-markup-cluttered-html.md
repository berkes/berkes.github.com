---
layout: post_archive
title: Cleaning up markup cluttered HTML
created: 1078183440
tags:
- Coding Corner
lang: nl
---
The nifty little-but powerfull commandlinetools [Wv](http://wvware.sourceforge.net/) and [unrtf](http://www.gnu.org/software/unrtf/unrtf.html) (only for linux/unix),  can be used for converting microsoft word files and rtf files into HTML. And then I don't mean the very ugly stuff that word itself produces when exporting to html.<br /><br /><!--break-->However, you are then stuck with html files that are loaded with markup stuff. fonts, div's etceteras.<br /><br />This little piece of regexp can help you remove all that:<br />It removes comments and formatting html from a html page<br /><br />(\&lt;!---? ?[^-]+ ?-?--\&gt;)|(\&lt;/?font ?[^&gt;]*\&gt;)|(\&lt;/?span ?[^&gt;]*\&gt;)|(\&lt;/?div ?[^&gt;]*\&gt;)|(\&lt;/?u\&gt;)|(\&lt;/?b\&gt;)|(\&lt;/?i\&gt;)
