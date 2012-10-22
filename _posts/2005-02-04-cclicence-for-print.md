---
layout: post_archive
title: CClicence for print
created: 1107505864
tags:
- coding corner
lang: nl
---
Because of some reason webdesigners seem to have no cluen about the power of CSS when it comes to printing. I was pointed to this fact once aghain, by a blog entry on [Karl Jonsson's Weblog� Creative Commons "Bug"](http://www.cyberlaw.se/kalle/index.php?p=256 "Karl Jonsson's Weblog � Creative Commons %u201CBug%u201D")<!--break-->> What is the reason for this bug? Surely, I cannot be the first person to notice it? I actually like reading on screens (especially that of my PDA) so I rarely print anything. I did notice the bug when I first applied a CC license to my blog and changed it by hand (see top right) but the severity of the problem only just struck me.

The solution would be to add some well-formed CSS to your CC button:(see print-preview and note that additional text will show up)<div id="ccwrapper">[![Creative Commons License](http://creativecommons.org/images/public/somerights20.gif)](http://creativecommons.org/licenses/by-sa/2.0/)<br style="clear:both" />This work is licensed under a [Creative Commons License](http://creativecommons.org/licenses/by-sa/2.0/). <span id="ccprint">Read the licence here: http://creativecommons.org/licenses/by-sa/2.0/</span></div>in the HEAD <pre>&lt;style type=&quot;text/css&quot; media=&quot;screen&quot;&gt;  #ccprint {visibility:hidden;}  #ccwrapper {border: 1px solid #bdca00;}&lt;/style&gt;</pre>And in the licence HTML<pre>&lt;span id=&quot;ccprint&quot;&gt;Read the licence here: http://creativecommons.org/licenses/by-sa/2.0/&lt;/span&gt;</pre>Everything in the span tag will be hidden on screens, and shown on other media. 
