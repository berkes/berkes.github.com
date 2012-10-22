---
layout: post_archive
title: ! 'Iteration 02: Layout of the page.'
created: 1150890088
tags:
- drupal
- whatsinitsname theme design blog
lang: en
---
The next step is to make a decision about the layout. Off course I have discussed several concepts and skethces with my client by now, so in reality I am not playing entirely fair. I already know what my site will look like, with some undefined details.

But we already defined the layout of the site, which dictates the CSS concepts. It is a two column layout, with the tools on the right and the main area on the right. A masthead containing the branding and navigation and a footer over the whole width of the bottom.

### Layout
I used [inkcape](http://www.inkscape.org/), with [my browser template](http://kde-files.org/content/show.php?content=31560&vote=good), to design the site layout, and also the actual design of the site. But I will get back in some future post, on that layout.

![Layout](/sites/webschuur.com/files/whatsaname_layout_small.png)

### HTML Changes
In order to make the CSS as clean and nice as possible, I need to fiddle a little with the original framework. Most notably are some additional classes, moving one of the navigation lists out of the navigation wrapper and into the #siteinfo
Another important change is the wrapper around some content and nav panes called #tools. Tools are what people often call sideblocks. 

### CSS concepts
I am not a big fan of floats and strange margins to make a layout. There are literally millions of layout-concepts using CSS tricks and hacks, but in essence the most simple is the one using some absolute positioning. 
Because I know that my masthead (#identity) will have a fixed height, it is safe to use some absolute positioning. I therefore use a [rather old method called "Holy grail"](http://glish.com/css/7.asp). For other examples, I advice a [great page called Layoutgala](http://blog.html.it/layoutgala/).
Floats, as used in these layoutgala examples, have one downsite in Drupal: Administration does not play nice with this. Most of the time you will see your layout falling apart completely in admin areas. 

### The result
After some tweaking and fiddling I have a basic HTML page that presents my layout. It has not been tested on any other browser then konqueror yet, but the code is so simple that any glitches should not be hard to fix.

[View the page](/sites/webschuur.com/files/HTML_source_framework.html).

And the source:
<pre style="height:16em; overflow:auto;">
<span style="font-weight: bold;color: #800000;">&lt;!DOCTYPE </span><span style="color: #000000;">html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd"</span><span style="font-weight: bold;color: #800000;">&gt;</span>
<span style="font-weight: bold;color: #000000;">&lt;html&gt;</span>
<span style="font-weight: bold;color: #000000;">&lt;head&gt;</span>
<span style="color: #000000;">  </span><span style="font-weight: bold;color: #000000;">&lt;title&gt;&lt;/title&gt;</span>
<span style="color: #000000;">  </span><span style="font-weight: bold;color: #000000;">&lt;meta</span><span style="color: #008000;"> http-equiv=</span><span style="color: #aa0000;">"Content-Type"</span><span style="color: #008000;"> content=</span><span style="color: #aa0000;">"text/html; charset=utf-8"</span><span style="font-weight: bold;color: #000000;">&gt;</span>
<span style="color: #000000;">  </span><span style="font-weight: bold;color: #000000;">&lt;script</span><span style="color: #008000;"> type=</span><span style="color: #aa0000;">"text/javascript"</span><span style="color: #008000;"> src=</span><span style="color: #aa0000;">"ftod.js"</span><span style="font-weight: bold;color: #000000;">&gt;&lt;/script&gt;</span>
<span style="color: #000000;">  </span><span style="font-weight: bold;color: #000000;">&lt;script</span><span style="color: #008000;"> type=</span><span style="color: #aa0000;">"text/javascript"</span><span style="font-weight: bold;color: #000000;">&gt;</span>
<span style="color: #000000;">  </span><span style="color: #008000;">window</span><span style="color: #000000;">.onload=</span><span style="font-weight: bold;color: #000000;">function</span><span style="color: #000000;">(){</span>
<span style="color: #000000;">      AddFillerLink(</span><span style="color: #dd0000;">"ftod1"</span><span style="color: #000000;">,</span><span style="color: #dd0000;">"ftod2"</span><span style="color: #000000;">,</span><span style="color: #dd0000;">"ftod3"</span><span style="color: #000000;">,</span><span style="color: #dd0000;">"content-news"</span><span style="color: #000000;">,</span><span style="color: #dd0000;">"content-blog"</span><span style="color: #000000;">);</span>
<span style="color: #000000;">      }</span>
<span style="color: #000000;">  </span><span style="font-weight: bold;color: #000000;">&lt;/script&gt;</span>
<span style="color: #000000;">  </span><span style="font-weight: bold;color: #000000;">&lt;style</span><span style="color: #008000;"> type=</span><span style="color: #aa0000;">"text/css"</span><span style="font-weight: bold;color: #000000;">&gt;</span>
<span style="color: #000000;">    * </span><span style="font-weight: bold;color: #000000;">{</span>
<span style="color: #000000;">      </span><span style="font-weight: bold;color: #000000;">outline:</span><span style="color: #000000;"> </span><span style="color: #800000;">1px</span><span style="color: #000000;"> </span><span style="color: #800000;">dotted</span><span style="color: #000000;"> grey </span><span style="font-weight: bold;color: #000000;">!important;</span>
<span style="color: #000000;">    </span><span style="font-weight: bold;color: #000000;">}</span>
<span style="color: #000000;">    html div *</span><span style="color: #0000ff;">:hover</span><span style="color: #000000;"> </span><span style="font-weight: bold;color: #000000;">{</span>
<span style="color: #000000;">      </span><span style="font-weight: bold;color: #000000;">outline:</span><span style="color: #000000;"> </span><span style="color: #800000;">1px</span><span style="color: #000000;"> </span><span style="color: #800000;">solid</span><span style="color: #000000;"> </span><span style="color: #800000;">#004D99</span><span style="color: #000000;"> </span><span style="font-weight: bold;color: #000000;">!important;</span>
<span style="color: #000000;">      </span><span style="font-weight: bold;color: #000000;">background-color:</span><span style="color: #000000;"> </span><span style="color: #800000;">#E0E0E0</span><span style="font-weight: bold;color: #000000;">;</span>
<span style="color: #000000;">    </span><span style="font-weight: bold;color: #000000;">}</span>

<span style="color: #000000;">    </span><span style="font-style: italic;color: #808080;">/** layout **/</span>
<span style="color: #000000;">    body </span><span style="font-weight: bold;color: #000000;">{</span>
<span style="color: #000000;">      </span><span style="font-weight: bold;color: #000000;">margin:</span><span style="color: #800000;">0</span><span style="font-weight: bold;color: #000000;">;</span>
<span style="color: #000000;">      </span><span style="font-weight: bold;color: #000000;">padding:</span><span style="color: #800000;">0</span><span style="font-weight: bold;color: #000000;">;</span>
<span style="color: #000000;">    </span><span style="font-weight: bold;color: #000000;">}</span>
<span style="color: #000000;">    </span><span style="font-weight: bold;color: #800080;">#branding</span><span style="color: #000000;"> </span><span style="font-weight: bold;color: #000000;">{</span>
<span style="color: #000000;">      </span><span style="font-weight: bold;color: #000000;">height:</span><span style="color: #800000;">150px</span><span style="font-weight: bold;color: #000000;">;</span>
<span style="color: #000000;">    </span><span style="font-weight: bold;color: #000000;">}</span>
<span style="color: #000000;">    </span><span style="font-weight: bold;color: #800080;">#branding-name</span><span style="color: #000000;"> </span><span style="font-weight: bold;color: #000000;">{</span>
<span style="color: #000000;">      </span><span style="font-weight: bold;color: #000000;">position:</span><span style="color: #800000;">absolute</span><span style="font-weight: bold;color: #000000;">;</span>
<span style="color: #000000;">      </span><span style="font-weight: bold;color: #000000;">top:</span><span style="color: #800000;">22px</span><span style="font-weight: bold;color: #000000;">;</span>
<span style="color: #000000;">      </span><span style="font-weight: bold;color: #000000;">right:</span><span style="color: #800000;">0</span><span style="font-weight: bold;color: #000000;">;</span>
<span style="color: #000000;">      </span><span style="font-weight: bold;color: #000000;">font-size:</span><span style="color: #800000;">22px</span><span style="font-weight: bold;color: #000000;">;</span>
<span style="color: #000000;">    </span><span style="font-weight: bold;color: #000000;">}</span>
<span style="color: #000000;">    </span><span style="font-weight: bold;color: #800080;">#branding-tagline</span><span style="color: #000000;"> </span><span style="font-weight: bold;color: #000000;">{</span>
<span style="color: #000000;">      </span><span style="font-weight: bold;color: #000000;">position:</span><span style="color: #800000;">absolute</span><span style="font-weight: bold;color: #000000;">;</span>
<span style="color: #000000;">      </span><span style="font-weight: bold;color: #000000;">top:</span><span style="color: #000000;"> </span><span style="color: #800000;">58px</span><span style="font-weight: bold;color: #000000;">;</span>
<span style="color: #000000;">      </span><span style="font-weight: bold;color: #000000;">right:</span><span style="color: #800000;">0</span><span style="font-weight: bold;color: #000000;">;</span>
<span style="color: #000000;">    </span><span style="font-weight: bold;color: #000000;">}</span>
<span style="color: #000000;">    </span><span style="font-weight: bold;color: #800080;">#search</span><span style="color: #000000;"> </span><span style="font-weight: bold;color: #000000;">{</span>
<span style="color: #000000;">      </span><span style="font-weight: bold;color: #000000;">position:</span><span style="color: #800000;">absolute</span><span style="font-weight: bold;color: #000000;">;</span>
<span style="color: #000000;">      </span><span style="font-weight: bold;color: #000000;">top:</span><span style="color: #000000;"> </span><span style="color: #800000;">4px</span><span style="font-weight: bold;color: #000000;">;</span>
<span style="color: #000000;">      </span><span style="font-weight: bold;color: #000000;">right:</span><span style="color: #800000;">0</span><span style="font-weight: bold;color: #000000;">;</span>
<span style="color: #000000;">    </span><span style="font-weight: bold;color: #000000;">}</span>
<span style="color: #000000;">    </span><span style="font-weight: bold;color: #800080;">#tools</span><span style="color: #000000;"> </span><span style="font-weight: bold;color: #000000;">{</span>
<span style="color: #000000;">      </span><span style="font-weight: bold;color: #000000;">position:</span><span style="color: #800000;">absolute</span><span style="font-weight: bold;color: #000000;">;</span>
<span style="color: #000000;">      </span><span style="font-weight: bold;color: #000000;">right:</span><span style="color: #800000;">0</span><span style="font-weight: bold;color: #000000;">;</span>
<span style="color: #000000;">      </span><span style="font-weight: bold;color: #000000;">top:</span><span style="color: #800000;">150px</span><span style="font-weight: bold;color: #000000;">;</span>
<span style="color: #000000;">      </span><span style="font-weight: bold;color: #000000;">width:</span><span style="color: #800000;">210px</span><span style="font-weight: bold;color: #000000;">;</span>
<span style="color: #000000;">    </span><span style="font-weight: bold;color: #000000;">}</span>
<span style="color: #000000;">    </span><span style="font-weight: bold;color: #800080;">#content-main</span><span style="color: #000000;"> </span><span style="font-weight: bold;color: #000000;">{</span>
<span style="color: #000000;">      </span><span style="font-weight: bold;color: #000000;">margin-right:</span><span style="color: #800000;">210px</span><span style="font-weight: bold;color: #000000;">;</span>
<span style="color: #000000;">    </span><span style="font-weight: bold;color: #000000;">}</span>
<span style="color: #000000;">    </span><span style="font-weight: bold;color: #800080;">#siteinfo</span><span style="color: #000000;"> </span><span style="font-weight: bold;color: #000000;">{</span>
<span style="color: #000000;">      </span><span style="font-weight: bold;color: #000000;">clear:</span><span style="color: #800000;">both</span><span style="font-weight: bold;color: #000000;">;</span>
<span style="color: #000000;">    </span><span style="font-weight: bold;color: #000000;">}</span>
<span style="color: #000000;">    </span><span style="font-weight: bold;color: #800080;">#nav-main</span><span style="color: #000000;"> </span><span style="font-weight: bold;color: #000000;">{</span>
<span style="color: #000000;">      </span><span style="font-weight: bold;color: #000000;">position:</span><span style="color: #800000;">absolute</span><span style="font-weight: bold;color: #000000;">;</span>
<span style="color: #000000;">      </span><span style="font-weight: bold;color: #000000;">top:</span><span style="color: #000000;"> </span><span style="color: #800000;">91px</span><span style="font-weight: bold;color: #000000;">;</span>
<span style="color: #000000;">      </span><span style="font-weight: bold;color: #000000;">left:</span><span style="color: #000000;"> </span><span style="color: #800000;">0px</span><span style="font-weight: bold;color: #000000;">;</span>
<span style="color: #000000;">      </span><span style="font-weight: bold;color: #000000;">width:</span><span style="color: #800000;">100%</span><span style="font-weight: bold;color: #000000;">;</span>
<span style="color: #000000;">    </span><span style="font-weight: bold;color: #000000;">}</span>
<span style="color: #000000;">    </span><span style="font-weight: bold;color: #800080;">#nav-section</span><span style="color: #000000;"> </span><span style="font-weight: bold;color: #000000;">{</span>
<span style="color: #000000;">      </span><span style="font-weight: bold;color: #000000;">position:</span><span style="color: #800000;">absolute</span><span style="font-weight: bold;color: #000000;">;</span>
<span style="color: #000000;">      </span><span style="font-weight: bold;color: #000000;">top:</span><span style="color: #000000;"> </span><span style="color: #800000;">120px</span><span style="font-weight: bold;color: #000000;">;</span>
<span style="color: #000000;">      </span><span style="font-weight: bold;color: #000000;">left:</span><span style="color: #000000;"> </span><span style="color: #800000;">0px</span><span style="font-weight: bold;color: #000000;">;</span>
<span style="color: #000000;">      </span><span style="font-weight: bold;color: #000000;">width:</span><span style="color: #800000;">100%</span><span style="font-weight: bold;color: #000000;">;</span>
<span style="color: #000000;">    </span><span style="font-weight: bold;color: #000000;">}</span>
<span style="color: #000000;">    </span><span style="color: #800080;">.horizontal-list</span><span style="color: #000000;"> li </span><span style="font-weight: bold;color: #000000;">{</span>
<span style="color: #000000;">      </span><span style="font-weight: bold;color: #000000;">display:</span><span style="color: #800000;">inline</span><span style="font-weight: bold;color: #000000;">;</span>
<span style="color: #000000;">      </span><span style="font-weight: bold;color: #000000;">list-style-type:</span><span style="color: #800000;">none</span><span style="font-weight: bold;color: #000000;">;</span>
<span style="color: #000000;">    </span><span style="font-weight: bold;color: #000000;">}</span>
<span style="color: #000000;">  </span><span style="font-weight: bold;color: #000000;">&lt;/style&gt;</span>
<span style="font-weight: bold;color: #000000;">&lt;/head&gt;</span>
<span style="font-weight: bold;color: #000000;">&lt;body&gt;</span>
<span style="font-weight: bold;color: #000000;">&lt;div</span><span style="color: #008000;"> id=</span><span style="color: #aa0000;">"container"</span><span style="font-weight: bold;color: #000000;">&gt;</span>
<span style="color: #000000;">  </span><span style="font-weight: bold;color: #000000;">&lt;div</span><span style="color: #008000;"> id=</span><span style="color: #aa0000;">"branding"</span><span style="font-weight: bold;color: #000000;">&gt;</span>
<span style="color: #000000;">    </span><span style="font-weight: bold;color: #000000;">&lt;img</span><span style="color: #008000;"> src=</span><span style="color: #aa0000;">"logo.png"</span><span style="color: #008000;"> width=</span><span style="color: #aa0000;">"91"</span><span style="color: #008000;"> height=</span><span style="color: #aa0000;">"91"</span><span style="color: #008000;"> id=</span><span style="color: #aa0000;">"branding-logo"</span><span style="font-weight: bold;color: #000000;">/&gt;</span>
<span style="color: #000000;">    </span><span style="font-weight: bold;color: #000000;">&lt;h1</span><span style="color: #008000;"> id=</span><span style="color: #aa0000;">"branding-name"</span><span style="font-weight: bold;color: #000000;">&gt;</span><span style="color: #000000;">#branding-name</span><span style="font-weight: bold;color: #000000;">&lt;/h1&gt;</span>
<span style="color: #000000;">    </span><span style="font-weight: bold;color: #000000;">&lt;span</span><span style="color: #008000;"> id=</span><span style="color: #aa0000;">"branding-tagline"</span><span style="font-weight: bold;color: #000000;">&gt;</span><span style="color: #000000;">#branding-tagline</span><span style="font-weight: bold;color: #000000;">&lt;/span&gt;</span>
<span style="color: #000000;">  </span><span style="font-weight: bold;color: #000000;">&lt;/div&gt;</span>

<span style="color: #000000;">  </span><span style="font-weight: bold;color: #000000;">&lt;div</span><span style="color: #008000;"> id=</span><span style="color: #aa0000;">"content"</span><span style="font-weight: bold;color: #000000;">&gt;</span>
<span style="color: #000000;">    </span><span style="font-weight: bold;color: #000000;">&lt;div</span><span style="color: #008000;"> id=</span><span style="color: #aa0000;">"content-main"</span><span style="font-weight: bold;color: #000000;">&gt;</span>
<span style="color: #000000;">      </span><span style="font-weight: bold;color: #000000;">&lt;div</span><span style="color: #008000;"> class=</span><span style="color: #aa0000;">"content article"</span><span style="font-weight: bold;color: #000000;">&gt;</span>
<span style="color: #000000;">        </span><span style="font-weight: bold;color: #000000;">&lt;h2</span><span style="color: #008000;"> class=</span><span style="color: #aa0000;">"content article title"</span><span style="font-weight: bold;color: #000000;">&gt;</span><span style="color: #000000;">Title article 1</span><span style="font-weight: bold;color: #000000;">&lt;/h2&gt;</span>
<span style="color: #000000;">        </span><span style="font-weight: bold;color: #000000;">&lt;p</span><span style="color: #008000;"> class=</span><span style="color: #aa0000;">"content article body"</span><span style="color: #008000;"> id=</span><span style="color: #aa0000;">"ftod1"</span><span style="font-weight: bold;color: #000000;">&gt;</span>
<span style="color: #000000;">        </span><span style="font-weight: bold;color: #000000;">&lt;/p&gt;</span>
<span style="color: #000000;">      </span><span style="font-weight: bold;color: #000000;">&lt;/div&gt;</span>
<span style="color: #000000;">      </span><span style="font-weight: bold;color: #000000;">&lt;div</span><span style="color: #008000;"> class=</span><span style="color: #aa0000;">"content article"</span><span style="font-weight: bold;color: #000000;">&gt;</span>
<span style="color: #000000;">        </span><span style="font-weight: bold;color: #000000;">&lt;h2</span><span style="color: #008000;"> class=</span><span style="color: #aa0000;">"content article title"</span><span style="font-weight: bold;color: #000000;">&gt;</span><span style="color: #000000;">Titlearticle 2</span><span style="font-weight: bold;color: #000000;">&lt;/h2&gt;</span>
<span style="color: #000000;">        </span><span style="font-weight: bold;color: #000000;">&lt;p</span><span style="color: #008000;"> class=</span><span style="color: #aa0000;">"content article body"</span><span style="color: #008000;"> id=</span><span style="color: #aa0000;">"ftod2"</span><span style="font-weight: bold;color: #000000;">&gt;</span>
<span style="color: #000000;">        </span><span style="font-weight: bold;color: #000000;">&lt;/p&gt;</span>
<span style="color: #000000;">      </span><span style="font-weight: bold;color: #000000;">&lt;/div&gt;</span>
<span style="color: #000000;">      </span><span style="font-weight: bold;color: #000000;">&lt;div</span><span style="color: #008000;"> class=</span><span style="color: #aa0000;">"content article"</span><span style="font-weight: bold;color: #000000;">&gt;</span>
<span style="color: #000000;">        </span><span style="font-weight: bold;color: #000000;">&lt;h2</span><span style="color: #008000;"> class=</span><span style="color: #aa0000;">"content article title"</span><span style="font-weight: bold;color: #000000;">&gt;</span><span style="color: #000000;">Title article 3</span><span style="font-weight: bold;color: #000000;">&lt;/h2&gt;</span>
<span style="color: #000000;">        </span><span style="font-weight: bold;color: #000000;">&lt;p</span><span style="color: #008000;"> class=</span><span style="color: #aa0000;">"content article body"</span><span style="color: #008000;"> id=</span><span style="color: #aa0000;">"ftod3"</span><span style="font-weight: bold;color: #000000;">&gt;</span>
<span style="color: #000000;">        </span><span style="font-weight: bold;color: #000000;">&lt;/p&gt;</span>
<span style="color: #000000;">      </span><span style="font-weight: bold;color: #000000;">&lt;/div&gt;</span>
<span style="color: #000000;">    </span><span style="font-weight: bold;color: #000000;">&lt;/div&gt;</span>
<span style="color: #000000;">  </span><span style="font-weight: bold;color: #000000;">&lt;/div&gt;</span>

<span style="color: #000000;">  </span><span style="font-weight: bold;color: #000000;">&lt;div</span><span style="color: #008000;"> id=</span><span style="color: #aa0000;">"navigation"</span><span style="font-weight: bold;color: #000000;">&gt;</span>
<span style="color: #000000;">    </span><span style="font-weight: bold;color: #000000;">&lt;ul</span><span style="color: #008000;"> id=</span><span style="color: #aa0000;">"nav-main"</span><span style="color: #008000;"> class=</span><span style="color: #aa0000;">"horizontal-list"</span><span style="font-weight: bold;color: #000000;">&gt;</span>
<span style="color: #000000;">      </span><span style="font-weight: bold;color: #000000;">&lt;li&gt;</span><span style="color: #000000;">nav 1</span><span style="font-weight: bold;color: #000000;">&lt;/li&gt;</span>
<span style="color: #000000;">      </span><span style="font-weight: bold;color: #000000;">&lt;li&gt;</span><span style="color: #000000;">nav 2</span><span style="font-weight: bold;color: #000000;">&lt;/li&gt;</span>
<span style="color: #000000;">      </span><span style="font-weight: bold;color: #000000;">&lt;li&gt;</span><span style="color: #000000;">nav 3</span><span style="font-weight: bold;color: #000000;">&lt;/li&gt;</span>
<span style="color: #000000;">    </span><span style="font-weight: bold;color: #000000;">&lt;/ul&gt;</span>
<span style="color: #000000;">    </span><span style="font-weight: bold;color: #000000;">&lt;ul</span><span style="color: #008000;"> id=</span><span style="color: #aa0000;">"nav-section"</span><span style="color: #008000;"> class=</span><span style="color: #aa0000;">"horizontal-list"</span><span style="font-weight: bold;color: #000000;">&gt;</span>
<span style="color: #000000;">      </span><span style="font-weight: bold;color: #000000;">&lt;li&gt;</span><span style="color: #000000;">subnav 1</span><span style="font-weight: bold;color: #000000;">&lt;/li&gt;</span>
<span style="color: #000000;">      </span><span style="font-weight: bold;color: #000000;">&lt;li&gt;</span><span style="color: #000000;">subnav 2</span><span style="font-weight: bold;color: #000000;">&lt;/li&gt;</span>
<span style="color: #000000;">      </span><span style="font-weight: bold;color: #000000;">&lt;li&gt;</span><span style="color: #000000;">subnav 3</span><span style="font-weight: bold;color: #000000;">&lt;/li&gt;</span>
<span style="color: #000000;">    </span><span style="font-weight: bold;color: #000000;">&lt;/ul&gt;</span>
<span style="color: #000000;">  </span><span style="font-weight: bold;color: #000000;">&lt;/div&gt;</span>
<span style="color: #000000;">  </span><span style="font-weight: bold;color: #000000;">&lt;div</span><span style="color: #008000;"> id=</span><span style="color: #aa0000;">"tools"</span><span style="font-weight: bold;color: #000000;">&gt;</span>
<span style="color: #000000;">    </span><span style="font-weight: bold;color: #000000;">&lt;ul</span><span style="color: #008000;"> id=</span><span style="color: #aa0000;">"nav-admin"</span><span style="color: #008000;"> class=</span><span style="color: #aa0000;">"relatedcontent"</span><span style="font-weight: bold;color: #000000;">&gt;</span>
<span style="color: #000000;">      </span><span style="font-weight: bold;color: #000000;">&lt;li&gt;</span><span style="color: #000000;">subnav 1</span><span style="font-weight: bold;color: #000000;">&lt;/li&gt;</span>
<span style="color: #000000;">      </span><span style="font-weight: bold;color: #000000;">&lt;li&gt;</span><span style="color: #000000;">subnav 2</span><span style="font-weight: bold;color: #000000;">&lt;/li&gt;</span>
<span style="color: #000000;">      </span><span style="font-weight: bold;color: #000000;">&lt;li&gt;</span><span style="color: #000000;">subnav 3</span><span style="font-weight: bold;color: #000000;">&lt;/li&gt;</span>
<span style="color: #000000;">    </span><span style="font-weight: bold;color: #000000;">&lt;/ul&gt;</span>
<span style="color: #000000;">    </span><span style="font-weight: bold;color: #000000;">&lt;div</span><span style="color: #008000;"> id=</span><span style="color: #aa0000;">"content-news"</span><span style="color: #008000;"> class=</span><span style="color: #aa0000;">"relatedcontent"</span><span style="font-weight: bold;color: #000000;">&gt;</span>
<span style="color: #000000;">      list with newsentries</span><span style="font-weight: bold;color: #000000;">&lt;br</span><span style="color: #000000;"> </span><span style="font-weight: bold;color: #000000;">/&gt;</span>
<span style="color: #000000;">    </span><span style="font-weight: bold;color: #000000;">&lt;/div&gt;</span>
<span style="color: #000000;">    </span><span style="font-weight: bold;color: #000000;">&lt;div</span><span style="color: #008000;"> id=</span><span style="color: #aa0000;">"content-blog"</span><span style="color: #008000;"> class=</span><span style="color: #aa0000;">"relatedcontent"</span><span style="font-weight: bold;color: #000000;">&gt;</span>
<span style="color: #000000;">      list with blogentries</span><span style="font-weight: bold;color: #000000;">&lt;br</span><span style="color: #000000;"> </span><span style="font-weight: bold;color: #000000;">/&gt;</span>
<span style="color: #000000;">    </span><span style="font-weight: bold;color: #000000;">&lt;/div&gt;</span>
<span style="color: #000000;">  </span><span style="font-weight: bold;color: #000000;">&lt;/div&gt;</span>

<span style="color: #000000;">  </span><span style="font-weight: bold;color: #000000;">&lt;div</span><span style="color: #008000;"> id=</span><span style="color: #aa0000;">"search"</span><span style="font-weight: bold;color: #000000;">&gt;</span>
<span style="color: #000000;">    </span><span style="font-weight: bold;color: #000000;">&lt;form</span><span style="color: #008000;"> id=</span><span style="color: #aa0000;">"search-input"</span><span style="font-weight: bold;color: #000000;">&gt;&lt;input</span><span style="color: #008000;"> type=</span><span style="color: #aa0000;">"text"</span><span style="font-weight: bold;color: #000000;">/&gt;&lt;input</span><span style="color: #008000;"> type=</span><span style="color: #aa0000;">"submit"</span><span style="color: #000000;"> </span><span style="font-weight: bold;color: #000000;">/&gt;&lt;/form&gt;</span>
<span style="color: #000000;">    </span><span style="font-weight: bold;color: #000000;">&lt;dl</span><span style="color: #008000;"> id=</span><span style="color: #aa0000;">"search-output"</span><span style="font-weight: bold;color: #000000;">&gt;</span>
<span style="color: #000000;">    </span><span style="font-weight: bold;color: #000000;">&lt;/dl&gt;</span>
<span style="color: #000000;">  </span><span style="font-weight: bold;color: #000000;">&lt;/div&gt;</span>

<span style="color: #000000;">  </span><span style="font-weight: bold;color: #000000;">&lt;div</span><span style="color: #008000;"> id=</span><span style="color: #aa0000;">"siteinfo"</span><span style="font-weight: bold;color: #000000;">&gt;</span>
<span style="color: #000000;">    </span><span style="font-weight: bold;color: #000000;">&lt;ul</span><span style="color: #008000;"> id=</span><span style="color: #aa0000;">"nav-siteinfo"</span><span style="color: #008000;"> class=</span><span style="color: #aa0000;">"horizontal-list"</span><span style="font-weight: bold;color: #000000;">&gt;</span>
<span style="color: #000000;">      </span><span style="font-weight: bold;color: #000000;">&lt;li&gt;</span><span style="color: #000000;">siteinfonav 1</span><span style="font-weight: bold;color: #000000;">&lt;/li&gt;</span>
<span style="color: #000000;">      </span><span style="font-weight: bold;color: #000000;">&lt;li&gt;</span><span style="color: #000000;">siteinfonav 2</span><span style="font-weight: bold;color: #000000;">&lt;/li&gt;</span>
<span style="color: #000000;">      </span><span style="font-weight: bold;color: #000000;">&lt;li&gt;</span><span style="color: #000000;">siteinfonav 3</span><span style="font-weight: bold;color: #000000;">&lt;/li&gt;</span>
<span style="color: #000000;">    </span><span style="font-weight: bold;color: #000000;">&lt;/ul&gt;</span>
<span style="color: #000000;">    </span><span style="font-weight: bold;color: #000000;">&lt;p</span><span style="color: #008000;"> id=</span><span style="color: #aa0000;">"siteinfo-legal"</span><span style="font-weight: bold;color: #000000;">&gt;</span><span style="color: #000000;">© 2006 Bèr Kessels</span><span style="font-weight: bold;color: #000000;">&lt;/p&gt;</span>
<span style="color: #000000;">    </span><span style="font-weight: bold;color: #000000;">&lt;p</span><span style="color: #008000;"> id=</span><span style="color: #aa0000;">"siteinfo-credits"</span><span style="font-weight: bold;color: #000000;">&gt;&lt;a</span><span style="color: #008000;"> href=</span><span style="color: #aa0000;">"http://webschuur.com"</span><span style="font-weight: bold;color: #000000;">&gt;</span><span style="color: #000000;">carpentered in webschuur.com</span><span style="font-weight: bold;color: #000000;">&lt;/a&gt;</span><span style="color: #000000;">  </span><span style="font-weight: bold;color: #000000;">&lt;a</span><span style="color: #008000;"> href=</span><span style="color: #aa0000;">"http://web-graphics.com/mtarchive/001667.php"</span><span style="font-weight: bold;color: #000000;">&gt;</span><span style="color: #000000;">Filler text on demand</span><span style="font-weight: bold;color: #000000;">&lt;/a&gt;&lt;/p&gt;</span>
<span style="color: #000000;">  </span><span style="font-weight: bold;color: #000000;">&lt;/div&gt;</span>

<span style="font-weight: bold;color: #000000;">&lt;/div&gt;</span>
<span style="font-weight: bold;color: #000000;">&lt;/body&gt;</span>
<span style="font-weight: bold;color: #000000;">&lt;/html&gt;</span></pre>
