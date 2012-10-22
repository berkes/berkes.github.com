---
layout: post_archive
title: Centering an item vertical and horizontal
created: 1078181040
tags:
- coding corner
lang: nl
---
Guess. How hard would it be to position something horizontal and vertical on the canvas (the space in youtr browser where you see the content)? Not hard? No, indeed. If Internet-Explorer would be a good kid, it would not.<pre>    .centered {      position: absolute;      top: 0;      right: 0;      bottom: 0;      left: 0;      width: 752px;      height: 429px;      margin: auto;    }</pre>An then making a simple div, with the content you want centered inside it, should do.. Should, yes indeed. The margin-auto thingy should make all centered, if the div's sizes are fixed. But, yea you guessed it, it does not work in Internet Explorer six. So forget this little nifty thingy. The way to go is the old table trick. Sorry.

But there are some ways around, when using CSS, all with their own little problems though. Yust read thru the bloat of [ these people](http://milov.nl/forum/1/28)
