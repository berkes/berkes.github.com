---
layout: post_archive
title: whitepaper Taxonomy and freetagging as the spine of the site
created: 1158053410
tags:
- Organisation management
- Collaborative Writing
- Social Software
- Weblogging
- Drupal Talk
lang: en
---
## Taxonomy and freetagging as the spine of the site

I just finished the first phase of [Kaisu.org](http://kaisu.org). A site alike Nowpublic, in the sense that it allows __you__ to make the news. The main difference is the angle to look at the news. KaiSu looks at the news from a 'regional' angle; allowing to look for local news near you.

![KaiSu frontpage](http://webschuur.com/sites/webschuur.com/files/kaisu_front_thumb.png) 

Main features the client asked for were:

 * a clear mechanism to "write to places". You write news, or upload photo's ad add them to a region.
 * a way to allow adoption of a region.
 * multiple vectors to search on. We chose Regions (places) and Tags (categories).
 * a unique theme

For now, the most interesting part is, how we achieved the part that allows the taxonomy browsing. This whitepaper dives a bit deeper in the technology behind it.

### Subdomains
Each and every tag under "places" has a subdomain, and can therefore be "adopted". In near future we have a front-end to choose an alternative theme for an adopted subdomain.
To achieve subdomain rewriting I created a small module that (ab) uses the init hook to perform a rewrite of the url based on the aliases. With pathauto we now have a sort of mechanism to create subdomains on the fly.

    function kaisu_redirect_init() {
      if(($subdomain = kaisu_redirect_get_current_sub()) && ($_GET['q'] == '' || $_GET['q'] == variable_get('site_frontpage', 'node'))) {
        $src = db_result(db_query("SELECT src FROM {url_alias} WHERE (src LIKE 'taxonomy/term/%' AND dst like 'places/%s')", $subdomain));
        $_GET['q'] = $src;
      }
    }

To rewrite in-site urls Drupal has nothing. You either need to preg-replace strings on the moment they are printed (in theme_page()) or nothing. This is a missing feature, for which several patches were written, but all were dropped for sake of "performance".

Luckily the taxonomy url alone received something that can be abused to achieve what we wanted. It works only for taxonomy urls! If you change the "module" that "owns" a vocabulary (poke around in the vocabulary table), you can make your module that overrides the url.

    function kaisu_redirect_term_path($term) {
      $name = pathauto_cleanstring($term->name);
      return "http://$name.kaisu.org";
    }

### Filtering taxonomy.
By using [refine_by_taxo](http://drupal.org/project/refine_by_taxo), I can present blocks in the sidebars that only contain tags that were used in the posts of a certain subdomain. Its behaviour is somehow similar to the "related tags" in [simpy](http://www.simpy.com/user/berkes/tag/drupal).

### Better taxonomy display
A lot of Drupal developers and users might have noticed the fact that each term can have a 'description'. Currently the only module using this, is forum.module (that I am aware of). I wrote a small module that creates a block containing the description of the "current active term list". By placing that block in a [region](http://drupal.org/node/29140) at the top, I can show really nice descriptions on the top. See for example [the place Paddington](http://paddington.kaisu.org/).

### categories, next step.
The plan is to move all these concepts over to a complete "[category](http://category.greenash.net.au/)" implementation. That way we can still use tags/terms for what they are (a single flag on a node), but use "places" in a much more general way, by adding metadata (images, geodata, users, permissions) to such a tag: it becomes an entity on its own.

    $node->tag = 'politics' is what tagging should be (IMO) about, in Drupal.
    $node->category = $category_node, is what categories is about, $category_node is a complete entity, on the same level as the $node.

As you see, categories are a much better candidate for what we aimed at with places. But category module is still new, so I did not yet dare to go down that new road yet, so this is a thing for a next phase. By now I am confident that moving there is a good choice.

### Conclusion
Taxonomy can be used for a lot more then tagging some nodes. It can be a perfect navigation system, in a community site. It is simple enough to allow simple modules to enhance it. Its limitations, however are that a term is neither "an entity", nor a "simple tag", but something in-between: it can have a description, but that is not filtered. It has a title, but cannot have an image. So it is too limited for use as standalone entities, for that we need nodes-as-terms: categories. But it is a little too complex for simply flagging nodes.
