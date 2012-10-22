---
layout: post_archive
title: ! 'CSS template: width'
created: 1100197553
tags:

lang: en
---
Template for web sites that are designed with fixed minimum and maximum widths, but also allow text resizing under Gecko and MSIE (and probably others).  There are a couple of tricks to doing this, since MSIE doesn't follow the rules, but it can be done or well approximated.  Here are some of the basics I've come across that are needed in the CSS and (X)HTML:

<pre>
html, body {
  font-size: 90%; /* need to use percentage here so that ems will work later 
with MSIE */
  text-align: center; /* to center container in IE5.x because it does not 
handle margin: 0 auto;  I suppose it can be left out if design need not be 
centered in a maximized window larger than max width of design */
}

h1, h2 {
  /* example -- all remaining text item sizes must be in ems for text resize */
  font-size: 1em;
}

#container {
  /* this div is used to center page and has a max width set in ems */
  width: 45em;
  text-align: left; /* resets real text alignment after the kludge used above 
to center the page for MSIE */
  margin: 0 auto; /* centers the container in CSS compliant browsers */
}

#content {
  /* example column div allows some fluid design but limits min and max widths 
in ems*/
  min-width: 20em;
  max-width: 30em;
  /* MSIE's inability to do real text resize and lack of CSS compliance forces 
us to do the following kludge: */
  width: expression(document.body.clientWidth > (500/12) * 
parseInt(document.body.currentStyle.fontSize) ? "30em" : "auto");
  padding: 1em;
  margin-left: 16em;
}
</pre>
