---
layout: post
title: HOWTO create a real menu trail in primary and secondary links
created: 1160748265
tags:
- PHP
- Tips and tricks
- Theming
- CSS
- Drupal Talk
- STL_stella
lang: en
---
The menu system in Drupal is very complex, both from the inside and from the outside. One part of the menu is the  concept of primary and secondary links. these links are usually printed across the top of your page. The good news is that they are menu-items, like any other, the bad news is that the HTML is different from the other menu's.  

One of the things I miss most is a class on the menu-items to distinguish expanded items from closed items.  

I want my primary links to look like this:   
![Expanded primary links with proper trail](http://webschuur.com/sites/webschuur.com/files/stella_active_tab_trail_thumb.png)
_[zoom](http://webschuur.com/sites/webschuur.com/files/stella_active_tab_trail.png)_  

When we are looking at a sub-page of _info_, I want _info_ to represent that, by being "active" too.  Which requires a class set on the _list item_:  

    <ul id="primary">
      <li><a href="/agenda" >agenda</a></li>
      <li><a href="/producties/voorstellingen/lopend" >voorstellingen</a></li>
      <li><a href="/producties/projecten/lopend" >projecten</a></li>
      <li class="active"><a href="/info/stella_den_haag" >info</a></li>
    </ul>
    <ul id="secondary">
      <li><a href="/home">nieuws</a></li>
      ...
      <li><a href="/wie-wij-zijn" class="active">wie wij zijn</a></li>
    </ul>

The most important part is the _class="active"_ on the li in the top list. Note that Drupal does print a class="active" on the active menu, by default. You can see this in the bottom list, the last item. But it only does so on the active item, not on the trail. Drupal does not give that class to us, so we need to extract it from somewhere.  

This is what it looks like with the Default Drupal output:    
![Expanded primary links with no proper trail](http://webschuur.com/sites/webschuur.com/files/stella_active_tab_trail_broken_thumb.png)  
_[zoom](http://webschuur.com/sites/webschuur.com/files/stella_active_tab_trail_broken.png)_  

Luckily, Drupal returns keyed arrays to the theme layer, in [menu_primary_links](http://api.drupal.org/api/4.7/function/menu_primary_links)   we see the following bit of code:  

    foreach ($menu['visible'][$pid]['children'] as $cid) { 
       $index = "menu-$start_level-$count"; 
       if (menu_in_active_trail_in_submenu($cid, $pid)) { 
         $index .= "-active"; 
       } 
       $links[$index] = menu_item_link($cid); 
       $count++; 
     }

So we know that our index of the returned array with primary (and secondary) links contains the word "_-active_" if it appears in the active trail.

Just add this small function to your template.php, wich we can call to create proper classes from our indexes. (my theme is called "_stella_").

    function stella_menu_item_build_class($index) {
      //"menu-$start_level-$count" and optional -active appended
      $chunks = explode('-', $index);
      $class = "level-$chunks[1]";
    
      if ($chunks[3]) {
        $class .= " active";
      }
    
      return $class;
    }

While we are at it, why not add some more <a href="http://www.quirksmode.org/css/multipleclasses.html">classes</a>?  

Now we have a function, but still no classes in our lists. In _page.tpl.php_, where the menu-s are printed, we can use the function to create a class:

    <ul id="primary">
      <?php if (count($primary_links)) : ?>
      <?php foreach ($primary_links as $index => $link): ?>
        <li id="<?php print $index ?>" class="<?php print stella_menu_item_build_class($index) ?>"><?php print $link ?></li>
      <?php endforeach; ?>
      <?php endif; ?>
    </ul>
    <ul id="secondary">
      <?php if (count($secondary_links)) : ?>
      <?php foreach ($secondary_links as $index => $link): ?>
        <?php $class = stella_menu_item_build_class($index) ?>
        <li id="<?php print $index ?>" class="<?php print stella_menu_item_build_class($index) ?>"><?php print $link ?></li>
      <?php endforeach; ?>
      <?php endif; ?>
    </ul>

Most important is the class, but the ID is worth mentioning too. While we are at it, let us just add the key as ID. It is unique after all.  
But the most important part is _stella\_menu\_item\_build\_class($index)_. This is where we feed the indexes to the just created function and print that inside our _class=""_ part. 
Of course we must assign the key to the variable _$index_ too. In PHP that is achieved with the _as $index => $link_ in the foreach loop.

The result is usable HTML. But be aware that you are adding some overhead to each uncached page! The result can be seen on the [development site](http://staging.stella.nl) of [stella](http://www.stella.nl)
