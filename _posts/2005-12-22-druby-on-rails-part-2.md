---
layout: post_archive
title: Druby on Rails part 2
created: 1135258796
tags:
- theming
- drupal talk
- ruby
lang: en
---
And now something positive. 

Well, not that the past two articles were nagative. But they focussed on what RoR does and Drupal does not. They focused on parts in Drupal that could use improvement. 

Drupal is not all that bad. Not at all. Drupal is fantastic. So I would like to highlight one of Drupals jewels, and compare it to Ruby on Rails. Just to show you that for certain tasks Drupal development hardly differs from RoR development.

We all know <a href="http://drupal.org/phptemplate">PHPtemplate</a>, and if not: its a <a href="http://drupal.org/node/937">templating engine</a> for Drupal that takes all the code and logic out of the view layer. It allows for very quick and easy templating, using native PHP. That, in itself is not too special. The fact that this PHPtemplate is highly optimised for templating is. 

Just compare the two: 
<pre>
&lt;table&gt;
&lt;% for product in @products %&gt;
  &lt;tbody&gt;
    &lt;tr valign=&quot;top&quot;&gt;
      &lt;td&gt;
        &lt;img src=&quot;&lt;%= product.image_url %&gt;&quot; border=&quot;0&quot; /&gt;
      &lt;/td&gt;
      &lt;td width=&quot;450&quot;&gt;
        &lt;h3&gt;&lt;%=h product.title %&gt;&lt;/h3&gt;
        &lt;small&gt;
          &lt;%= product.description %&gt;
        &lt;/small&gt;
        &lt;br/&gt;
        &lt;strong&gt;â‚¬&lt;%= sprintf(&quot;%0.2f&quot;, product.price) %&gt;&lt;/strong&gt;
        &lt;% link_to  'Add to Cart',
                    :action =&gt; 'add_to_cart',
                    :id   =&gt; product %&gt;
        &lt;br/&gt;
      &lt;/td&gt;
    &lt;/tr&gt;
    &lt;tr&gt;
      &lt;td colspan=&quot;2&quot;&gt;&lt;hr /&gt;&lt;/td&gt;
    &lt;/tr&gt;
  &lt;/tbody&gt;
&lt;% end %&gt;
&lt;/table&gt;
</pre>
And here is how Drupal does it in a theme function
<pre>
&lt;table&gt;
&lt;?php  foreach ($products as $product): ?&gt;
  &lt;tbody&gt;
    &lt;tr valign=&quot;top&quot;&gt;
      &lt;td&gt;
        &lt;img src=&quot;&lt;?php $product-&gt;image_url ?&gt;&quot; border=&quot;0&quot; /&gt;
      &lt;/td&gt;
      &lt;td width=&quot;450&quot;&gt;
        &lt;h3&gt;&lt;?php print check_plain(product-&gt;title) ?&gt;&lt;/h3&gt;
        &lt;small&gt;
          &lt;?php print product-&gt;description ?&gt;
        &lt;/small&gt;
        &lt;br/&gt;
        &lt;strong&gt;â‚¬&lt;?php print theme('store_price', produc-&gt;price) ?&gt;&lt;/strong&gt;
        &lt;?php print l('Add to Cart',
                'add_to_cart/'. $product-&gt;id
                );
        ?&gt;
        &lt;br/&gt;
      &lt;/td&gt;
    &lt;/tr&gt;
    &lt;tr&gt;
      &lt;td colspan=&quot;2&quot;&gt;&lt;hr /&gt;&lt;/td&gt;
    &lt;/tr&gt;
  &lt;/tbody&gt;
&lt;?php endif; ?&gt;
&lt;/table&gt;
</pre>

What we see, is a non existing example. But it could easily exist like this. You see the similarities? The simplicity of both examples is stunning. The main difference lies in the fact that Drupal is not as file-centered. So you will have to addsome code to a template.php file before you can use a template file. Here lies a task, since Drupa is able to pull template functions from files. It is just not yet as obvious. We should ease this process. 

Conclusion, however, is that Drupal has a lot of similarities with RoR. 
