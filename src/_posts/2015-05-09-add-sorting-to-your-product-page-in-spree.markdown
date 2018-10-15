---
layout: custom_for_2015-05-09-add-sorting-to-your-product-page-in-spree
title: "Add sorting to your product page in Spree"
tags: [spree, rails, webdevelopment]
lang: en
---

For a [crafts e-commerce shop](https://shop.annatreurniet.nl), built with [Spree](http://spreecommerce.com), I wanted to add an option to sort the products on the products page.

In this blogpost, I'll describe how one can build such a feature, more to create some understanding of how in Spree such customisations can be developed.
Spree has everything in place to add this, but it can be a bit daunting to find all the bits and pieces that could and should be overridden. Which I hope to clarify a bit. In order to built this feature, we re-open some `Helpers` and `Controllers` from Spree and we inject some HTML using deface.

You could write this as a spree extension, but that requires even more moving parts to be in place. And I think it is a better, more efficient way to first write the customisation in your main app and then, later on, when things have settled, extract it into a spree extension.

You could write this TDD, and you should really write at least some tests to spec out your changes. But testing overrides of methods, controller actions and so on, is *really* daunting in Spree: you'll be stubbing and mocking a gazillion of unrelated before-filters, finders and scopes. Just to spec that your method adds one other scope, you might need over 100 lines of setup. This is a problem, but not one that I want to address in this post.

Let's get rolling. First, override the [ProductsController#index](https://github.com/spree/spree/blob/3-0-stable/frontend/app/controllers/spree/products_controller.rb#L11) action. Add a file `app/controllers/spree/products_controller_decorator.rb`.
The idea is to add a sorting scope that is already [available on
Product](https://github.com/spree/spree/blob/3-0-stable/core/app/models/spree/product/scopes.rb). The ordering scopes I want add are `ascend_by_updated_at`, `ascend+by_master_price` and `descend_by_master_price`. When implementing this, you can add `sorting=ascend_by_updated_at` or one of the other sorting scopes to the URL of the app (e.g. http://localhost:3000/orders?sorting=ascend_by_updated_at). This way we can finish the controller and then move on to the view.

## Controller

{% highlight ruby %}
module Spree
  ProductsController.class_eval do
    def index
      @searcher = build_searcher(params.merge(include_images: true))
      sorting_scope = params[:sorting].try(:to_sym) || :ascend_by_updated_at
      @products = @searcher.retrieve_products.send(sorting_scope)
      @taxonomies = Spree::Taxonomy.includes(root: :children)
    end
  end
end
{% endhighlight %}

Now that this works, it needs to be secured and cleaned up:

{% highlight ruby %}
module Spree
  ProductsController.class_eval do
    helper_method :sorting_param
    alias_method :old_index, :index

    def index
      old_index # Like calling super: http://stackoverflow.com/a/13806783/73673
      @products = @products.send(sorting_scope)
    end

    def sorting_param
      params[:sorting].try(:to_sym) || default_sorting
    end

    private

    def sorting_scope
      allowed_sortings.include?(sorting_param) ? sorting_param : default_sorting
    end

    def default_sorting
      :ascend_by_updated_at
    end

    def allowed_sortings
      [:descend_by_master_price, :ascend_by_master_price, :ascend_by_updated_at]
    end
  end
end
{% endhighlight %}

There is a lot going on here. But the general idea is to use [method aliasing](http://stackoverflow.com/a/13806783/73673) to be able to extend the original index. 
We have, furthermore, split out the scope-selecting into several methods. This allows setting a default and whitelisting allowed scopes. You don't want people to call just any string and call that as a method on our model (e.g. `sorting=delete_all`). I've declared`sorting_param` as a helper method because we'll need it later on (I know, not very YAGNI, but for the sake of brevity, let's already implement it here).

If you want to find out where a view, controller or model is defining something, you can either run `bundle open spree_core` (or `spree_frontend` or `spree_backend`) or simply clone the stable branch into a directory and browse or search the code there. However, make very sure you have the correct version. For example, when using Github to browse the code, you have a good chance of copying the wrong (too old or too new) versions of a method into your project in order to override.

## View and helpers

First iteration is to copy over Spree's [products](https://github.com/spree/spree/blob/master/frontend/app/views/spree/shared/_products.html.erb) partial to `app/views/spree/shared/_products.html.erb`. We add the sorting links there. In a later iteration we'll rely on deface to inject our code, rather then duplicating the partial.
But, for now, Rails will simply pick our file instead of Spree's version. In it, we add our links:

{% highlight erb %}
...
<% if products.any? %>
<div class="row sorting"><div class="col-sm-6 col-sm-offset-6">
  Sort by:
  <ul class="list-inline">
    <li><%= link_to "Newest", params.merge(sorting: :ascend_by_updated_at) %></li>
    <li><%= link_to "Lowest price", params.merge(sorting: :ascend_by_master_price) %></li>
    <li><%= link_to "Highest price", params.merge(sorting: :descend_by_master_price) %></li>
  </ul>
</div></div>
<div id="products" data-hook>
...
{% endhighlight %}

For the links, we use `params.merge(...)` in order to persist any search, paging or filter params.

On your development server, this will work, but when you look at [products/index.html.erb](https://github.com/spree/spree/blob/3-0-stable/frontend/app/views/spree/home/index.html.erb#L8), you can see `cache(cache_key_for_products). It uses [`cache_key_for_products`](https://github.com/spree/spree/blob/3-0-stable/core/app/helpers/spree/products_helper.rb#L54). The list of products will be cached, which is good, because the queries can be very heavy. But that cache disregards our ordering and the active-state of our links. We need to add the sorting to the cache-key.

In order to override it, we have to add it to a file called `app/helpers/spree/products_helper_decorator.rb`. Because we are changing a lot inside the method, we can't really use the aliasing as used earlier, it won't help us a lot. Instead, we simply override the entire method. And document our changes.

{% highlight ruby %}
module Spree
  ProductsHelper.module_eval do
    ##
    # Override cache_key_for_products to add caching per sort param.
    def cache_key_for_products
      count = @products.count
      # Instead of default max_updated_at, we look at the first product in the list
      # And we add sorting, so that we get a product-cache per sorting param
      first_id = @products.first.id
      sorting = params[:sorting]
      "#{I18n.locale}/#{current_currency}/spree/products/all-#{params[:page]}-#{first_id}-#{sorting}-#{count}"
    end
  end
end
{% endhighlight %}

We now have a working sorting feature, but it needs improvement. 

## Deface

One thing we should clean up, is our override of the partial file. Unless you want to change how a file behaves, or want to alter its HTML structure, you should avoid copying them over. That makes upgrading a lot harder. And it can breeak a lot of addons that want to inject HTML into the views.

[Deface is made for this](https://guides.spreecommerce.com/developer/view.html#using-deface), so let's use it. Create a file `app/overrides/sorting_links_in_products.rb` (And possibly restart the rails server, I've found that deface sometimes does not pick up new files otherwise):

{% highlight ruby %}
Deface::Override.new(:virtual_path  => "spree/shared/_products",
                     :insert_before => "#products[data-hook]",
                     :partial       => "spree/shared/sorting_links",
                     :name          => "sorting_links_in_products")
{% endhighlight %}

And a partial `app/views/spree/shared/_sorting_links.html.erb`

{% highlight erb %}
<% if products.any? && params[:controller] == 'spree/products' %>
<div class="row sorting"><div class="col-sm-6 col-sm-offset-6">
  <%= t(:sort_by) %>
  <ul class="list-inline">
    <li><%= link_to_unless current_sorting?(:ascend_by_updated_at), t(:newest), params.merge(sorting: :ascend_by_updated_at) %></li>
    <li><%= link_to_unless current_sorting?(:ascend_by_master_price), t(:lowest_price), params.merge(sorting: :ascend_by_master_price) %></li>
    <li><%= link_to_unless current_sorting?(:descend_by_master_price), t(:highest_price), params.merge(sorting: :descend_by_master_price) %></li>
  </ul>
</div></div>
<% end %>
{% endhighlight %}

Some changes to the first iteration of this erb-code, are that we now use the locales to render strings, and that we only render the sorting-link as a link when it is not active.

I've also added an additional condition where I check for the controller. This is not the cleanest, but since the `products` partial can be reused (it is a shared partial), and we inject into this partial regardless of who is requesting it, we should only add the sorting links when we are sure the partial is being renderd via the controller that can handle the sorting. For example, the partial is being used when rendering the products in a taxonomy. And there, the products already are sorted, so we don't want to sort them. But the controller rendering them, there, will ignore the sorting param and won't have the helper-methods we use.

Note tha we could clean this out even more by DRY-ing up the `link_to_unless current_sorting...` repetition with e.g. another helper, or partials, or both, but IMHO that is overengineering. Some repetition in views is fine: they give us the freedom to place some icons, override a text and so on, much easier and cleaner.
We can now remove our version of `products` partial, since it is no longer overriding the Spree version.

One cleanup was to use a `current_sorting?` helper. Which does not
exist, so let's create that with the familiar decorator/monkey-patching. Add it to `app/helpers/spree/products_helper_decorator.rb`:

{% highlight ruby %}
module Spree
  ProductsHelper.module_eval do
    #... cache_key_for_products

    def current_sorting?(key)
      sorting_param == key.to_sym
    end
  end
end
{% endhighlight %}

In this helper, `sorting_param` is requested from the controller, which re-uses the default, that's why we made it a helper earlier.

We now have a few sorting links that are implemented without hacking Spree, and without copying over entire classes or files. We can still lean on Spree and upgrade it quite safely. 

Oh, and I'll leave the CSS and declaration of localised strings as homework.

Do you often override these Spree core items? Do you know any tips and tricks on how to manage these during Spree upgrades?
