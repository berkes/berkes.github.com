---
layout: post_archive
title: ! 'Iteration 01: Whats in a name, define the framework'
created: 1150745984
tags:
- Theming
- CSS
- Drupal Talk
- WhatsInItsName theme design blog
lang: en
---
If you have been following some of the recent CSS and webdesign trends, you might have noticed the trend slowly bending towards semantic correct designs. As it should have been from the start. 

This means that you don't just design a site, but really build it. Starting with its foundation. No, starting with a good blueprint, which results in a good foundation. 
<!--break-->
Such a foundation must be semantically best. This way we fulfil three of our four mayor requirements, __for free__: 

 * be fully SEO supporting
 * be accessible on mobile devices
 * highlight the content, content comes first

In fact we want to use three buzzwords: 

 * [Source order](http://www.usability.com.au/resources/source-order.cfm)
 * [Tableless](http://www.hotdesign.com/seybold/everything.html)
 * [What's in a name](http://www.stuffandnonsense.co.uk/archives/whats_in_a_name_pt2.html)

Lets look at one by one:
## Source order ##
Basically this means that you order your (X)HTML the way you want your stuff to __be__, rather then the way you want it to __look__. Pragmatics often call this «puristic bull», but they tend to forget that HTML has nothing to do with presentation. HTML is to your site, like the database is to your CMS: it hands the data. But has nothing to do with the way that data is shown. 
We therefore want an HTML source that comes closest to the way we want the data to be correlated. Source order generally means: Most important first, less important stuff later. Again, forget about how it will look. That is for the CSS, the design, to sort out. That is for later.

## Tableless ##
Need I say more? Lets conclude: It is nothing puristic, but just pragmatic to use CSS for designing your content. It will save you time, money and lots of annoyances. Yes, CSS has its downsides (in fact, it has [only one](http://en.wikipedia.org/wiki/Internet_explorer)), but if you dive into it, it is nothing like black magic. Besides, three of our four requirements cannot be met when using tables for design. 

## Whats in a name ##
[Malarkey started](http://www.stuffandnonsense.co.uk/archives/whats_in_a_name.html) this buzz. [Eric Meyer picked it up](http://www.meyerweb.com/eric/thoughts/2004/06/18/elemental-nomenclature/). Then Malarkey [finished it up](http://www.stuffandnonsense.co.uk/archives/whats_in_a_name_pt2.html) by providing a nice draft for a naming convention.
Not some new law to superimpose on the web, nor some XML standard RFC. Just a good start-off. Saves you from going «I want a search block there, should I call it _#search-block_, or rather _#top-search_?». It saves you precious thinking. 

## The result ##
The result is a solid HTML source that we can slowly mould into a Drupal theme.
Since I did not even think about what my pages might contain, or how they might look, the HTML source is very raw. It is a nearly 1 to 1 copy of Malarkey's CSS namings. Also, this is more of a sketch, then a real blueprint. CSS trickses, like sliding doors might require some additional fiddling with the source. But we will see that later on.

    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
    <html>
    <head>
      <title></title>
      <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    </head>
    <body>
    <div id="container"><!--Page container (usually a <div>)-->
      <div id="branding"><!--Used for a header or banner to brand the site.-->
        <img id="branding-logo"/><!--Used for a site logo-->
        <h1 id="branding-name"></h1><!--Used for the sites name -->
        <span id="branding-tagline"></span><!--Used for a strapline or tagline to define the site's purpose-->
      </div>
    
      <div id="content"><!--Used for content rather than for another purpose such as navigation-->
        <div id="content-main"><!--The main content area -->
        </div>
        <div id="content-news"><!-- News related content  -->
        </div>
        <div id="content-blog"><!-- Blog content  -->
        </div>
        <div id="content-events"><!-- Event content  -->
        </div> 
        <!-- #content-(whatever) Could include any form of content, including #content-related, #content-quote etc. Often referred to as "blocks"-->
        </div>-->
      </div>
    
      <div id="navigation">
        <ul id="nav-main"><!--primary AND secondary menu navigation-->
          <li>nav 1</li>
          <li>nav 2</li>
          <li>nav 3</li>
        </ul>
        <ul id="nav-section"><!--Navigation to pages within the current site section-->
          <li>subnav 1</li>
          <li>subnav 2</li>
          <li>subnav 3</li>
        </ul>
        <ul id="nav-external"><!--Navigation to pages outside the site-->
          <li>subnav 1</li>
          <li>subnav 2</li>
          <li>subnav 3</li>
        </ul>
        <ul id="nav-supplementary"><!--A supplementary list of links, perhaps in a footer. This can replace the common, but presentational #footer-->
          <li>subnav 1</li>
          <li>subnav 2</li>
          <li>subnav 3</li>
        </ul>
        <!-- #nav-(whatever) -A list of links named at a designer's discretion -->
      </div>
  
      <div id="search"><!-- Related to search interface and search results  -->
        <form id="search-input"></form><!--A search form -->
        <dl id="search-output"><!--Search results which could include a <div> or other markup including definition lists. For live search and so.-->
        </dl>
      </div>
    
      <div id="siteinfo"><!--Used for various site related information-->
        <p id="siteinfo-legal"></p> <!--Copyright information etc.-->
        <p id="siteinfo-credits"></p> <!-- Designer or other credits -->
      </div>
    </div>
    </body>
    </html>
