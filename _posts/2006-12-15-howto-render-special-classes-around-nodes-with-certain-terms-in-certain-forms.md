---
layout: post
title: ! 'HOWTO: render special classes around nodes with certain terms (in certain
  forms)'
created: 1166195042
tags:
- PHP
- Theming
- CSS
- Drupal Talk
- WhatsInItsName theme design blog
lang: en
---
An often requested feature for sections module (or Theming in general) is to be able to style nodes with certain terms (and therefore forums) different.

Off course you can build a module for this, with a nice interface an all that. And off course you can do this with sections module. But both are quite over the top, for such a simple tasks; Worse: such modules will be big, but will never be able to cover all the cases and questions. A few lines of PHP in your theme is all you need. and PHP is as flexible as you want it to be.

This small howto will help you create some template code to add classes to your nodes, based on wether or not they contain certain terms. It will check for terms in a certain vocabulary only.

First we create a [template.php](http://drupal.org/node/11811) if it is not in the theme yet.

In that file we will [define new variables](http://drupal.org/node/16383):

    /** Make additional variables available and override some core variables **/
    function _phptemplate_variables($hook, $vars) {
      switch ($hook) {
        case 'node':
          $node = $vars['node'];
          if (count($node->taxonomy)) {
            foreach($node->taxonomy as $term) {
              if ($term->vid == 1) { //only check terms in vocabulary with ID 1;
                $classes[] = sympal_map_string_to_class($term->name);
              }
            }
            $vars['class_string'] = implode(' ', $classes);
          }
        break;
      }
      return $vars;
    }

You will need to change the __1__  in _if ($term->vid == __1__) {_ into the ID of your vocabulary.

Find the vocabulary ID by browsing to example.com/admin/taxonomy and hover "edit" the number in the URL, is the ID. 

Off course you can ignore this check and get all terms in your node, but it might bring down performance, if you are making classes from each and every term.

If you want to do this only on certain content types (even better performance), for example 'story' types, then you will need to chance _if (count($node->taxonomy)) {_ into _if (($node->type == 'story') && count($node->taxonomy)) {_

And then we need to create a helper function:

    /** 
    * Maps a term to a class, for use in variables and node*.tpl.php files 
    * @param $term any string.
    * @param $prefix string to append to the mapping. Optional; defaults to term-
    **/
    function sympal_map_string_to_class($term, $prefix = 'term-') {
      // Find a valid, computer-friendly type name.
      $class = trim($term);
      $class = drupal_strtolower($class);
      $class = str_replace(array(' ', '_'), '-', $class);
      $class = preg_replace('/[^a-z0-9_]/', '', $class);
      $class = $prefix . $class;
      $class = substr($class, 0, 32);
      return $class;
    }

The name of our theme here is 'sympal' best is to use your own themename, to avoid collisions.

Now we need to alter the node.tpl.php (create a new one if it does not exist), to print the classes. My default [sympal_theme](http://cvs.drupal.org/viewcvs/drupal/contributions/themes/sympal_theme/) node template was:

    <div class="article <?php print $type; print ($sticky ? ' sticky' : NULL); print (!$published ? ' unpublished' : NULL); print ($page ? ' full-page' : ' teaser'); ?>"><div class="sliding-door">
      <?php if ($page == 0): ?>
        <h3 class="<?php print $type; ?> title"><a href="/<?php print $node_url ?>" title="<?php print $title ?>"><?php print $title ?></a></h3>
      <?php endif; ?>

      <div class="body">
        <?php print $content; ?>
      </div>

      <?php if ($links): ?>
        <div class="links"><?php print $links; ?></div>
      <?php endif; ?>
    </div></div>

This will render the complete class, for a non sticky node, in full page mode, as follows:

    class="article full-page"

I want it to become:

    class="article full-page term-theming term-drupal"

For nodes tagged with "Theming" and "Drupal". So all that needs to change is the first line. Change it into:

    <div class="article <?php print $type; print ($sticky ? ' sticky' : NULL); print (!$published ? ' unpublished' : NULL); print ($page ? ' full-page' : ' teaser'); print ($class_string ? " $class_string" : NULL) ?>"><div class="sliding-door">

From now on you have the classes at your disposal. I am not going into CSS magic here, there are a gazillion sites out there that aer better resources. A quick example to get yo going, though:

    .article.term-drupal {
      background-color:green;
    }
    .article.teaser.term-drupal {
      background-color:blue;
    }

Will render all your teasers that were tagged with Drupal in blue, it will render all the other node views with a green background.

I am working on addition for this in the sympal_theme, but will insert a small admin frontend for this, too. Small, because the best way to change the behaviour is to change the PHP. Nothing more powerful then that.
