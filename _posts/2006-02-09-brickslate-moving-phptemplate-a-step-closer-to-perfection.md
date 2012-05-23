---
layout: post_archive
title: ! 'Brickslate: Moving phptemplate a step closer to perfection :)'
created: 1139479454
tags:
- Drupal Talk
lang: en
---
It is still a proof of concept: More of a hacked up phptemplate engine, with loads of documented ideas, then a downloadable project. but, since I beleive in early releases (peer reviews++) I decided to blog about this. 

The very basic idea is that I wanted to pull the Form API idea into the theming layer. Build the data structured and in a tree, then render it with *one* system: A brick.

For those who do not like reading, the idea is simple and threefold:
* Everything is a brick
* A brick can be made from other bricks.
* A page contains no "left-bars" or other location specific HTML but a clean content-aimed DOM.

The good part of this is fourfold:
* We get very *very* consistent classes and IDs. All trough the site.
* Themers have only one method to do everything. with that One Way they can theme stuff to the smallest tiny bit of HTML (the smallest brick)
* No more thinking of nodes, comment, pages, sidebars and other odd Drupalish ideas. We can think in (X)HTML again. 
* One DOM to hold them, Many CSS to style them. 

The idea is so simple, the code could be/is so simple too, that I was surprised by myself :)
It all boils down to one very very simple theme function: 
<code>
/**
 * The main brickfactory. This is where all the bricks come from!
 */
function theme_brickslate_brick($brick) {
  if (!$brick['body']) {
    return NULL;
  }
  else {
    //first we iterate over all our siblings to build the brick from possible sub-sub-sub-bricks.
    if (is_array($body)) {
      foreach ($body as $sub_brick) {
        $body .= theme('brickslate_brick', $sub_brick);
      }
    }
    else {
      $body = $brick['body'];
    }
    $output .= "<div class=\"$brick['id']\">";
    $brick['title'] ? $output .= "  <span class=\"title\">$brick['title']</span>" : NULL ;
    $output .= "  <span class=\"body\">$body</span>";
    $output .= "</div>";
    return $output;
  }
}
</code>
It needs some more smartness, to be fair, but this is in fact all. The smartness it needs, lies mostly in reducing HTML clutter and in using HX for the title, whenever possible (X is the hard part, because it must be generated dynamically). 

The hardest part and the most work is to write all the theme_foo functions as wrappers around this one brick function.

The other hard part is the stuff that calls this brick. We first make sure that all the existing theme functions return structured arrays, instead of homebrewn HTML chunks. Then the next step is to build one huge array from that.
That huge tree, is then the whole page, yet structured. 
We then allow a hook to alter that array. 
Then we run that array trough the templating engine: first we look for foo.bar.baz.tpl.php ($array['foo']['bar']['baz']) which we use. 
If not found we take the default theme('brick') and create a default chunk. 

Lets assume I want to style a blog node:
all.blog-node.tpl.php
or if I want to style all the blog nodes that appear in my branding (in Drupal that would be: a blog node that is rendered in the header, silly example, but still valuable)
branding.blog-node.tpl.php
But if I want only to style ALL the "submitted by" parts:
all.submitted.tpl.php
You probably understand that the word all refers to "all", as in whatever child it is.

From the readme:

Bricks are what you expect them to be: blocks that allow you to build a beautiful house. Or if you want, a cheap house. Or even the most normal house you can think of. In this case the bricks allow you to build a site.

Brickslate thinks from the DOM. Not from a nice design, nor from nifty CSS tricks, or the latest table hacks. It helps you all the way, from foundation to the flower in the vase on the window. From a good HTML structure, to the "post by" messages.

We start of at the DOM. That should be good. Your blueprint and your foundation of your site must be solid, and well thought trough. We don't go into any details yet, there. Just a nice HTML structure, that you can fill at your wish.

branding
  branding-logo
  branding-title
  branding-tagline
main
  messages
  help
  content-details
  content-tools
  content-info
nav
  nav-main
  nav-sub
  nav-page
tools
  tools-main
  tools-sub
siteinfo
  siteinfo-copyright
  siteinfo-details

You will think: Where is the header? Or the Footer? There is none. your HTML does not, ever, describe WHERE things will go in the design. Thus naming your siteinfo the "footer" is rather silly. Even-though 90% of the designs put them at the bottom, the footer, nothing prevents you from printing huge "COPYRIGHT 2006 MEMEME" across the top of your page. And it then is still not the logo!
More here: <a href="http://www.stuffandnonsense.co.uk/archives/whats_in_a_name_pt2.html">http://www.stuffandnonsense.co.uk/archives/whats_in_a_name_pt2.html</a>

In our world, a brick is a simple array that contains an id, a class, a title, and a body. The id is required, class, title and body can be empty. But when the body is empty, we do not show that brick.
A brick looks like:
array(
  'id' => 'foo-1',
  'class' => 'foo private'
  'title' => 'Your private foo',
  'body' => 'Did you know Foo? <br/>And bar?',
)
Which renders like:
<div id='foo-1' class="foo private">
  <span class='title'>Your private foo</span>
  <span class="body">Did you know Foo? <br/>And bar?</span>
</div>

Now, here is the cool thing: Everything is a brick. Nothing is nodes, or comments, they all become bricks.

But that is not all, because I hear you think "hell, a node is so complex, I want more power over it then just a general brick stuff". True, and that makes the idea even cooler: if you need a complex brick, such as the brick to build the corner-above-your-door-that-holds-the-verandas-roof, then you build that brick.... from other bricks.
So even the most complex bricks are bricks. They can be bricks, in bricks, in bricks (in... and so on).
