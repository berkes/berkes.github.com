---
layout: post_archive
title: Clean and maintainable pattern for blocks development in Drupal 6
created: 1293798762
tags:
- Drupal
- Programming
- PHP
- Tips and tricks
- Drupal Talk
- Drupal Blog
lang: en
---
# Clean and maintainable pattern for blocks development in Drupal 6

Drupal7, has finally [removed the confusing $op parameters](http://drupal.org/node/224333#remove_op) from hooks. And replaced them with a family of related hooks instead; one hook per *op*.

Here is a way to achieve the same in Drupal 6; by building a simple router in [hook_block()](http://api.drupal.org/api/drupal/developer--hooks--core.php/function/hook_block/6). We use a user function for this, a patter well known in Drupal as *hook*.

    /**
     * Implementation of hook_block().
     */
    function example_block($op = 'list', $delta = '', $edit = array()) {
      if ($op == 'list') {
        return _example_block_list();
      }

      $callback = "_example_block_#{$op}_#{$delta}";
      if (function_exists($callback)) {
        if ($op == 'save') {
          return call_user_func($callback, $edit);
        }
        else {
          return call_user_func($callback);
        }
      }
      # @TODO remove debug
      # else {
      #   dvm("block callback not found: #{$callback}")
      # }
    }

From here on, we can implement a simple family of functions, instead of cramping everything in one huge and cluttered multifunctional hook implementation.

For example, we implement the list callback as 

    function _example_block_list() {
      # ...build blocks...
      return $blocks;
    }

Note the preceding _underscore before the function. This has no special technical meaning, but is a de-facto standard in PHP to indicate a function [should be considered private](http://drupal.org/node/70335). This way, we tell other developers to never even consider using our callbacks; leaving us the freedom to change our functions at will.

But first, dissecting our hook_block will show what we actually do:

    if ($op == 'list') {
      return _example_block_list();
    }

This makes an exception for list. $op list, is the operator that does not recieve a delta, because it defines those *delta's*. A delta, is a severe misnoner in Drupal, because it is simply an identifier. However, Drupal calls it a delta, so should we. Another common misunderstanding, is that a delta must be numeric; beacause that is what the name delta implies. **This implementation works best for simple textual identifiers**.

With the **list** we define the blocks. For example to define two blocks, *foo* and *bar*

    function _example_block_list() {
      $blocks['foo'] = array(
        'info'       => t('Renders block foo'),
      );
      $blocks['bar'] = array(
        'info'       => t('Renders block bar'),
      );
      return $blocks;
    }

There are a lot more paramters you can define, they are all added in the final example implementation.

Back to the hook_block, we see

    $callback = "_example_block_#{$list}_#{$delta}";
    if (function_exists($callback)) {
      if ($op == 'save') {
        return call_user_func($callback, $edit);
      }
      else {
        return call_user_func($callback);
      }
    }

A function callback is built, code checks if that exists and if so calls that function. 
We do make another exception, for save. Save takes another paramter, $edit, which all the others callbacks do not take. To keep things clean, we should only pass parameters to functions that actually have these implemented, hence the exception for save.

And, finally, adding a little piece of code that learns us of not implemented callbacks, so we can implement these, or ignore them.

    # @TODO remove debug
    # else {
    #   dvm("block callback not found: #{$callback}")
    # }

Obviously to be removed before releasing. 

We can now implement some of the callbacks. To do that, say we want a setting on block *foo*, but not in bar. This setting will allow us to toggle a "Read more »"-link on block *foo* in the block's configuration. For this, we need a *configure* callback and a *save* callback.

    /** Block callback for configure op, delta foo.
     *
     * @return Array
     *   Form api array.
     */
    function _example_block_configure_foo() {
      $form = array();
      $form['read_more'] = array(
        '#type'          => 'checkbox',
        '#title'         => t('Show "Read more »"'),
        '#default_value' => variable_get('example_foo_read_more', FALSE),
      );
      return $form;
    }

Configure simply returns a FAPI form, as per [hook_block documentation](http://api.drupal.org/api/drupal/developer--hooks--core.php/function/hook_block/6).

    /** Block callback for save op, delta foo.
     *
     * @param $edit Array
     *   The submitted form values.
     *
     * @return Array
     *   Form api array.
     */
    function _example_block_save_foo($edit) {
      ## Save values for block
      variable_set('example_foo_read_more', $edit['read_more']);
      return TRUE;
    }

Save simply saves the configure to a variable.

Finally, we need a *view* callback for each block: the function that actually renders the block.

    /** Block callback for view op, block foo.
     *
     * @return Array
     *   Block array with content and subject key.
     */
    function _example_block_view_foo() {
      $block['subject'] = t('Title of block #1');
      $block['content'] = 'Content of block #1';
      if (variable_get('example_foo_read_more', FALSE)) {
        $block['content'] .= l(t('Read more »'), 'foo/more');
      }
      return $block;
    }

A similar *view* for *bar* is needed, this time without the optional "Read more »".

    /** Block callback for view op, block bar.
     *
     * @return
     *   Block array with content and subject key.
     */
    function _example_block_view_bar() {
      $block['subject'] = t('Title of block #2');
      $block['content'] = 'Content of block #2';
      return $block;
    }

Once you get more and more blocks, you can even split them out over include-files. By using module_load include, we can read a new file for each delta. This becomes only usefull when your module has many different blocks, each block having many helper functions and -libraries.

    function example_block($op = 'list', $delta = '', $edit = array()) {
      if ($op == 'list') {
        return _example_block_list();
      }

     $lib_file = "example_#{$delta}";
      module_load_include('inc', 'example', );
      # ...
    }

This allows us to move all callbacks to this include. With exception of the *list*, that one should remain in the module, since that is the one to define the available blocks. It would be possible to make that dynamic too, to call an info per include-file. The benefit would be, that the includefiles are completely self-contained; have all the information about a single block in a single file. The downside is complexity and overhead. 
We use *$delta* to group the libraries, so you have one file for each block. The alternative would be to have a library per op. This makes things only worse, since your code will be spread all over the place, and a new block, removal of block or change in a block would often require you to change all four files, instead of just the module and the block-file.

    The final *example.module* looks like this:

    <?php // $Id$
    /**
     * Module:      example for blocks pattern
     * Date:        2010-12-31  10:18
     * Author:      ber
     *
     * Description:
     *   Example blocks 
     *
     * License:
     *
     *   Copyright (C) 2010  ber
     *
     *   This program is free software: you can redistribute it and/or modify
     *   it under the terms of the GNU General Public License as published by
     *   the Free Software Foundation, either version 3 of the License, or
     *   (at your option) any later version.
     *
     *   This program is distributed in the hope that it will be useful,
     *   but WITHOUT ANY WARRANTY; without even the implied warranty of
     *   MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.pro See the
     *   GNU General Public License for more details.
     *
     *   You should have received a copy of the GNU General Public License
     *   along with this program. If not, see <http://www.gnu.org/licenses/>.
     *
     */

    /**
     * Implementation of hook_block().
     */
    function example_block($op = 'list', $delta = '', $edit = array()) {
      if ($op == 'list') {
        return _example_block_list();
      }

      $callback = "_example_block_{$op}_{$delta}";
      if (function_exists($callback)) {
        if ($op == 'save') {
          return call_user_func($callback, $edit);
        }
        else {
          return call_user_func($callback);
        }
      }
      #else { #TODO: remove debug!
      #  dvr("block callback not found: {$callback}");
      #}
    }

    /** Renderer lists all blocks.
     *
     * @return
     *   Block description array. see hook_block() documentation for details on array contents.
     */
    function _example_block_list() {
      $blocks['foo'] = array(
        'info'       => t('Renders foo'),
        'cache'       => BLOCK_CACHE_PER_ROLE, # | BLOCK_CACHE_PER_USER | BLOCK_CACHE_PER_PAGE | BLOCK_CACHE_GLOBAL | BLOCK_NO_CACHE,
        'status'     => TRUE,
        'weight'     => 0,
        'region'     => '',
        'visibility' => 1,
        'pages'      => '',
      );
      $blocks['bar'] = array(
        'info'       => t('Renders bar'),
        'cache'       => BLOCK_CACHE_PER_ROLE, #| BLOCK_CACHE_PER_USER | BLOCK_CACHE_PER_PAGE | BLOCK_CACHE_GLOBAL | BLOCK_NO_CACHE,
        'status'     => TRUE,
        'weight'     => 0,
        'region'     => '',
        'visibility' => 1,
        'pages'      => '',
      );
      return $blocks;
    }

    /** Block callback for configure op, delta foo.
     *
     * @return Array
     *   Form api array.
     */
    function _example_block_configure_foo() {
      $form['read_more'] = array(
        '#type'          => 'checkbox',
        '#title'         => t('Show "Read more »"'),
        '#default_value' => variable_get('example_foo_read_more', FALSE),
      );
      return $form;
    }

    /** Block callback for save op, delta foo.
     *
     * @param $edit Array
     *   The submitted form values.
     *
     * @return Array
     *   Form api array.
     */
    function _example_block_save_foo($edit) {
      variable_set('example_foo_read_more', $edit['read_more']);
      return TRUE;
    }

    /** Block callback for view op, block foo.
     *
     * @return Array
     *   Block array with content and subject key.
     */
    function _example_block_view_foo() {
      $block['subject'] = t('Title of block #1');
      $block['content'] = 'Content of block #1';
      if (variable_get('example_foo_read_more', FALSE)) {
        $block['content'] .= l(t('Read more »'), 'foo/more');
      }
      return $block;
    }

    /** Block callback for view op, block bar.
     *
     * @return
     *   Block array with content and subject key.
     */
    function _example_block_view_bar() {
      $block['subject'] = t('Title of block #2');
      $block['content'] = 'Content of block #2';
      return $block;
    }


From here on, you can start improving even more, e.g. by splitting out the theme functions that render blocks, the database or parsers that fetch and model the data and so on. But that is for later.
