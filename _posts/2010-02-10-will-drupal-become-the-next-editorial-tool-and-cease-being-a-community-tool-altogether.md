---
layout: post_archive
title: Will Drupal become the next editorial tool (and cease being a community tool
  altogether?)
created: 1265808462
tags:
- social software
- drupal talk
- drupal
lang: en
---
Recently, I came to realise that Drupal is not a community platform any more, it has grown into an editorial tool over the last years. Sure, you can build a community on top of Drupal, but the tools to do so, are underdeveloped, stale, or even simply unfinished. 
I see more and more high-profile editorial sites being build, and see fewer successful or high-profile community being released. 

Not that there are no good examples of Communities built on Drupal, there are! But their amount is so small that they hardly count. And in all the Drupal projects that I developed for, managed, or simply built myself, the Community-sites were hardest to get right: Drupal simply lacks the high quality community-building components, that we are used to for editorial sites.

What a community is (in this article)
One of the problems is the term "community" in itself. It is very broad. Some people call a blog with comments enabled a community. Others a mailing list. But the majority will think of a facebook-alike site. Or orkut, or twitter. Maybe even one the various PHPBB forums counts as such. In this article, I mean sites where "People" are central. And where content is organised around them. Facebook would be a community, but so would a simple site with Drupals blog-module enabled be: content is centred around people. Content is a piece of meta-data around the entity "User", or "Person". A community-site is one where "People are the centre of it all".

<h3>The architecture</h3>
As such, a community platform should not be a "Content Management System", but should be a "People Management System". In a CMS, the person is meta-data around the central entity "Article". Or, in Drupal speak: Node has an author. Drupal architecture is all built around content, with users being a "thing that belongs to the content", almost an afterthought, almost nothing more then a necessary entity for logins and permissions. Certainly not the heart of a site.

<h3>The Tools or modules</h3>
Nodes have tens of thousands of tools (modules and the likes) to work with, enhance them, workflow them, access-model-them and so on. People very few. Only since views2 could we make lists of users; while cck still lacks all abilities to enhance users. 

It is a good thing that Drupal7 has chosen not to limit the fields (or: customisation) to nodes, but extended it to people. 
Because when we talk about a proper community, the heart of that community is the users. And therefore their profiles. And I think just calling that one name, says it all: profile module.

1. Profiles in Drupal suck. You can avoid this by taking the one of the nodes-as-profile routes, and that will get you far. This, however gives you lots of side-effects, most notably on the data-integrity side, and on the usability side: it is pretty tough to get the flow "just right". Not impossible! Just hard. Very much harder then to get a proper editors-flow set up right, for example.
1. Access-models for users are almost undo-able: Viewing users and profiles remains mostly an all-or-nothing thing. Unless you abuse nodes as people (see above) you cannot provide a proper privacy model, where data is viewable to only a subset of the other users.
1. Workflow-systems for users are hard to come by. The only one working rather well, is the logintoboggan, to enhance login workflows and to e.g. put users in a quarantaine untill they performed a certain action. 
1. Many modules, such as votings, queuing, automating, adding video's, images, making relationsships are all node-only. You can relate nodes. Add video's to nodes, import nodes, add nodes to queues, add complex votings and ratings to nodes. But not to people. 

Another way to look at this, is to take <a href="http://acquia.com/products-services/acquia-drupal-modules">Aquia's</a> community modules and look whether they provide community-tools, editorial tools or can be used for both: editorial: 15; community: 1; both: 7. Where I considered modules that come in one tarball as one module. 
Aquia provides Drupal core community features and <em>one</em> additional community tool: Comment notify. The Drupal download modules page (ordered by popularity) shows us the same sort of numbers.

<h3>Some statistics</h3>
And then there are the numbers. Let me mention explicitly that I don't consider (the very non-academic) statistics below as any proof. I consider them a sign. And the conclusion is not that you can tell by the numbers that Drupal is hardly used as community-tool, but that there are a lot fewer developers working on community-implementations then on editorial-implementations. And that as a result the latter will develop a lot better, faster, while the development of community tools will fall behind. 

For that I counted the amount of sites Dries spoke about in his "<a href="http://buytaert.net/tag/drupal-sites">\* uses Drupal</a>", where he highlights high-profile Drupalsites.

I counted *8 community sites* and *31 editorial*.

And I even took "community" very liberal, if I would take earlier mentioned "People (or organisations) are the central entity", the balance shifts to 3/36. Another side note is that from the 8, at least 4 are in "labs", testing or otherwise rather unofficial status. While all 31 editorial are "final status".

<h3>The ongoing development.</h3>
And last there is the improvements in Drupal 7. The only improvement that makes building communities easier is a large and great one: <a href="http://buytaert.net/drupal-7-fields-in-core-status-update-and-next-steps">Ability to add fields to people</a>: leverage people to a level that they are almost as important as the(ir) content. All other improvements are aimed at the editors: many usability improvements in the back-end, administration and daily management. Hardly any that make interaction of your users easier, none that I could find, anyway. Please prove me wrong on this one, and show me improvements that benefit a community site.

<h3>Okay, but what then?</h3>
I think calling Drupal a community platform is no more really valid. Sure, you <em>can</em> build a community on top of it. And sure, Drupal offers more interaction(-tools) then most other CMS-es. But a site with interaction is not a community as we have come to know it. 

If you want to build a community in the sense of "putting people in the centre", you will have trough a lot more development, and far more often you "will be on your own"; the work done and the manuals or posts explaining how to build your community features. And seeing the amount of editorial sites being developed compared to community, I think this will only become worse. 

We can either stop calling Drupal a community platform, or we can put more weight behind the community-tools in Drupal. Removing profile module from core was a great first step, pointing out, leveraging and fixing the other problems is the next.
