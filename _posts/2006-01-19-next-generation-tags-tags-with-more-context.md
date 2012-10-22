---
layout: post_archive
title: ! 'Next generation tags: tags with more context.'
created: 1137702620
tags:
- drupal talk
lang: en
---
Recently I noticed some interesting use of tags, around the web. On <a href="http://de.lirio.us/rubric/entries/tags/license:gpl">de.lirio.us</a> I found people using the colon to give more meaning to tags, like <em>license:gpl</em>. Another famous one is the for:some_username in del.icio.us. All that triggered me. 

We can use the fact that we have about the most powerfull 'tagging' engine there exists: Taxonomy in Drupal. To get all that tagging tags to a next level. For I often miss some options, in tags:

<ul>
 <li>Relations. How can I tell that rose is related to magnolia?</li>
 <li>Context. How can I tell that Rose belongs to the group Garden?</li>
 <li>Subclasses. How can define that Rose is a child of Flowers</li>
 <li>Importance. I might have much more interests in Roses, and thus want Rose to be more important.</li>
</ul>

We all have these in Drupal, in taxonomy. The exact same engine we use for freetagging!
<ul>
 <li>Relations. We can relate terms Rose and Magnolia</li>
 <li>Vocabularies. We can add the term Rose to the vocabulary Garden</li>
 <li>Hierarchies. We can define the term Flowers as parent of Rose</li>
 <li>Weights. We can give each term a weight</li>
</ul>

It is already possible to do o in the admin area, not very friendly and near impossible if you have a lot of tags, but it can be done. Meaning, that all the functions, code, databases etc are already in place, working and tested. 

So I think all we need is to pull that power to the front-end, where we define the tags. In the textfield (autofilled) where we put "Rose, Garden" now.
<ul>
 <li>Relations. Rose&lt;&gt;Magnolia</li>
 <li>Vocabularies. Garden:Rose</li>
 <li>Hierarchies. Flowers/Rose</li>
 <li>Weights. Rose+4</li>
</ul>

All we need is to add these special characters to a small parsing engine and save the extracted data along with the $term to the database. And viola, <strong>We have the most powerfull tagging ssytem in the World</strong>. Try to beat that, wordpress, with your shiny layouts and Joe-Friendly installers, hah! :)
