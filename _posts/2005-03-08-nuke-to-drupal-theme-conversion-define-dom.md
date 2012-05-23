---
layout: post_archive
title: ! 'Nuke to Drupal Theme conversion: define DOM'
created: 1110290358
tags:
- osViews *nuke2Drupal
- Drupal Talk
lang: en
---
Now that the sizes, the positions and some extras are known, I can make a DOM out of this:
<h3>DOM</h3>
<pre>
&lt;div id=&quot;logo&quot;&gt;1&lt;/div&gt;
&lt;div id=&quot;header&quot;&gt;2&lt;/div&gt;
&lt;div id=&quot;banner&quot;&gt;3&lt;/div&gt;
&lt;div id=&quot;wrapper&quot;&gt;
  &lt;div id=&quot;sidebar-left&quot;&gt;4&lt;/div&gt;
  &lt;div id=&quot;main-content&quot;&gt;
    &lt;div id=&quot;sidebar-right&quot;&gt;6&lt;/div&gt;
    5
  &lt;/div&gt;
&lt;/div&gt;
&lt;div id=&quot;footer&quot;&gt;7&lt;/div&gt;
</pre>
<h3>CSS</h3>
I will not get into the details of the CSS here, only show the results of the layout CSS.
<pre>
body,
#logo,
#header, 
#banner,
#wrapper,
#main-content,
#sidebar-left,
#sidebar-right,
#footer {
  padding:0;
  margin:0;
}

#logo {
    background:#f669ff;
    height : 80px;
    width : 132px;
    position : absolute;
    left : 0px;
    top : 0px;
  }
  
#header {
    background:blue;
    height : 80px;
    width : 648px;
    position : absolute;
    left : 132px;
    top : 0px;
  }

#banner {
    background:yellow;
    height : 80px;
    width : auto;
    position : absolute;
    left : 10px;
    top : 80px;
    right: 0;
  }

#wrapper {
    position:relative;
    background:#73ffcd;
    margin-top : 160px;
  }

#main-content {
    position:relative;
    background:yellow;
    margin-left:132px;
    margin-right:10px;
  }

#sidebar-left {
    position:relative;
    background:green;
    margin-left : 10px;
    top : 0;
    width:122px;
    float:left;
  }

#sidebar-right {
    position:relative;
    background:blue;
    width:122px;
    float:right;
  }
  
#footer {
    position:relative;
    background:pink;
    clear:both;
    height : 73px;
  }
</pre>
<h3>mockup</h3>
see the result <a href="/misc/Regions_cutout.html">here</a>
