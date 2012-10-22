---
layout: post_archive
title: ! 'Simplest authentication in Rails: Basic Authentication with a logged_in?
  helper.'
created: 1301404313
tags:
- ruby
- ruby on rails
lang: en
---
The, by far, simplest solution to add some form of authentication in Rails is basic authentication. It has a lot of downsides, but the simplicity is such a benefit that it may just outweight.

Downsides are, amongst others:

* No users, no user-manangement. 
* Your username and password are hardcoded in the application. 
* No fancy or good looking login screens: just the basic HTTP login provided by your browser.
* No logout, other then closing the browser.

Here is a simple implementation for a simple app I needed. Since I am the only editor, there is no need to introduce session controllers, user models and so on. If you are relatively new to Rails (like me) you may miss this most simple solution and dive right into *devise* or *authlogic* or start [writing your own](http://ruby.railstutorial.org/chapters/sign-in-sign-out). And miss out that 10-minutes-and-you're-done solution.

First, we introduce a basic authenticate method, that can be used troughout our controllers. 
This method uses the Rails/Rack helper [authenticate_or_request_with_http_basic](http://apidock.com/rails/ActionController/HttpAuthentication/Basic/ControllerMethods/authenticate_or_request_with_http_basic).

{% highlight ruby %}
class ApplicationController < ActionController::Base
  protect_from_forgery

  protected
    def authenticate
      authenticate_or_request_with_http_basic do |username, password|
        username == USER_ID && password == PASSWORD
      end
    end
end
{% endhighlight %}

In a controller, we can then add a [before_filter](http://guides.rubyonrails.org/getting_started.html#security) to require authentication for all methods but the *index* and the *show*.

{% highlight ruby %}
class ImagesController < ApplicationController
  before_filter :authenticate, :except => [:index, :show]
  #...
end
{% endhighlight %}

A new file under *config/initializers*, named *user.rb* or anything else you want, contains the hardcoded username or password. Putting it in a separate file allows you to leave it out of your version-control, for example.

{% highlight ruby %}
USER_ID   = "Sauron"
PASSWORD  = "s3cr3t"
{% endhighlight %}

Furhtermore, we define a *logged_in?* helper, usefull in our views. This checks if the authorization is a string (it is set) or *nil* (user is not authorized):

{% highlight ruby %}
module ApplicationHelper
 def logged_in?
   not request.authorization.nil?
 end
end
{% endhighlight %}

Using that helper is simple too. E.g. *show.html.erb*:

{% highlight ruby %}
<% if logged_in? %>
  <li><%= link_to 'Edit', edit_image_path(@image) %></li>
<% end %>
{% endhighlight %}

I am not certain if this evaluation of *request.authorization.nil?* performs all that well, but I would say, it being simple as possible, that the overhead is minimal.
