---
layout: post_archive
title: Using jQuery to build 'collapsible form descriptions'.
created: 1152217978
tags:
- Theming
- Drupal Talk
lang: en
---
In Joomla! one can have very nifty ['floating' help balloons](http://www.bosrup.com/web/overlib/) with his/her forms. Its not built into core, but it's available as popular addon. After some investigation I chose to implement some jQuery implementation.

![Collapsed -default- state](http://webschuur.com/sites/webschuur.com/files/collapsible_help_in.png)
_Collapsed -default- state_
<br style="clear:both" />
![Expanded state](http://webschuur.com/sites/webschuur.com/files/collapsible_help_out.png)
_Expanded state_
<br style="clear:both" />
<!--break-->

Right, obviously a client who has worked with joomla! expects nothing less then such a friendly (though that is debatable) interface. Or at least something that is comparable. Bad news, is that using quite ordinary themes in combination with modules such as CCK or flexinode, it is very easy to create absolutely horrible interfaces. Every form item takes the whole width, nothing sits besides one-another, label, form-entry and description all take up at least one line of text, over the full width of your content-area, etc. 
The overlib proves one big problem: Drupal's descriptions can (and thus will, as Murphy states) contain link. It is impossible to click a link that sits in a tool-tip that follows your mouse. So we needed a more solid (and IMO) better solution.

Don't get me wrong: I think the fact that you can make Drupals interface horrible by defining large node types, is a good thing. Not the fact that such interfaces are 'horrible', but because they actually are 'basic'. I don't want 'resizable' text-areas, when I didn't ask for them, let alone that I want Blogger-friendly interface when I am building a complex non-blogging-site. I think it is a good thing that Drupal does not offer floating, popping, swishing, and wooshing interfaces. Or that it has highly optimised interfaces for a single audience. 

I love it when Drupal leaves me the choice and the tools to implement something that fits my needs exactly, instead of providing something that does not exactly fit every-ones needs. Because I love making nifty interfaces, tailor-made, for myself (or my client) _only when **I** need them_.

Right. So I made my form descriptions collapsible, using that really cool, buzz-compliant [jQuery](http://jquery.com/) tool.

I need to add (to proof how great a toolbox jQuery is), that ever since back-in-those-[dynhtml](http://www.jalix.org/ressources/internet/dhtml/_dynduo/dynduo/)-ninetees, I hardly touched any javascript (JS), other then to wade trough broken JS to find some link I really need, in a site that only works in IE. So: I am not even a n00b. Lower-then-dummy-status. Have a negative amount of JS-kudos. etc.

All I really had to do, was rebuild my form elements using my theme (and that is where such features _really_ belong, IMO), so that I could add some more information, such as id's and classes, and a link to toggle the description on and off. Oh, [and add some icons](http://nuovext.pwsp.net/).

    /**
     * Theme a form item, add the collapses and that stuff
     */
    function bc_theme_form_element($title, $value, $description = NULL, $id = NULL, $required = FALSE, $error = FALSE) {
       $output  = '<div class="form-item" id="form-item-'. form_clean_id($id) .'">'."\n";
       $required = $required ? '<span class="form-required" title="'. t('This field is required.') .'">*</span>' : '';

       if ($title) {
         if ($id) {
           $output .= ' <label for="'. form_clean_id($id) .'">'. $title .":$required</label>\n";
         }
         else {
           $output .= ' <label>'. $title .":$required</label>\n";
         }
       }

       $output .= " $value\n";

       if ($description) {
    //     $output .= '<a href="#" rel="show-help" class="show-hide" id="showhide-'. form_clean_id($id) .'">help</a> <div class="description message help" id="description-'. form_clean_id($id) .'">'. $description ."</div>\n";
         $output .= '<a href="#" rel="show-help" class="show-hide" id="showhide-'. form_clean_id($id) .'"><img src="/themes/bc_theme/help16x16.png" alt="help" class="icon help" /></a> <div class="description message help" id="description-'. form_clean_id($id) .'">'. $description ."</div>\n";
       }

       $output .= "</div>\n";

       return $output;
    }

Most important is the place where I added <code>id="showhide-'. form_clean_id($id) .'</code> and <code>id="showhide-'. form_clean_id($id) .'</code>, which I needed in my homebrewn JavaScrap later on.

And add some jQuery JS in my header. Nothing much, if you follow the [jQuery manual](http://jquery.com/docs/Tutorial/) closely.

    <!-- jQuery  http://jquery.com/  -->
    <script type="text/javascript"
    src="/themes/bc_theme/latest.js"></script>
    <script type="text/javascript">
    $(document).ready(function() {
      $('div.form-item').find('div.description').hide();
      $('div.description').each(function(){
        var idchunk = this.id.split(/-/);
        idchunk.shift();
        idchunk = idchunk.join('-');
        $('a#showhide-' + idchunk).click(function() {
          $('div#description-' + idchunk).toggle('fast');
          return false;
        });
      });
    });
    </script>

Note how I hide the descriptions with JS, and not with a CSS display:none. That way, people without JS, (or non working Js, or whatever) will always see the description. Or, far worse, added the descriptions using some document.write JS. (which results in descriptions not even available when the user has no JS)

    $('div.form-item').find('div.description').hide();

Then I iterate over all my divs with class description (all-right, not very fail-safe) and extract the form-item Id (the one Drupal gave me). This is because I need to associate every 'show-hide link' with a div.

    var idchunk = this.id.split(/-/);
    idchunk.shift();
    idchunk = idchunk.join('-');

To end: some TODOS are to make all this perform (much) better, by using a regexp instead of the ugly split-shift-merge to extract the Drupal form-item ID. And to toggle the class from 'on' to 'off', of the show-hide-icon, so that that little light-bulb can be 'on' (when help is displayed) and 'off' (when help is hidden). But I didn't find an easy way to toggle a class of an element, yet. Another todo, is actually a bug-fixing frenzy: For example the date form widget abuses the description by putting the label in that description. A description != a label. Even if that comes in handy when building container-inline forms such as that date-widget, it is not meant for it. And it breaks my cool collapse thingy :).

I hope this short steel-this-code post, proved three things:

  1. Drupal's interface does not suck. It is merely 'basic', which means: 'ready for your creativity'.
  2. jQuery is the right tool.
  3. Drupal's theme layer is the right tool and place to build your own interface improvements for a specific need like this.
