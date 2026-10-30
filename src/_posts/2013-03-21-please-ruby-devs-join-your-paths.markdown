---
layout: post
title: "Please, Ruby devs, join() your paths"
tags: [ruby]
lang: en
date: 2013-03-21
---

Like in most programming languages, when you write paths in ruby, e.g. to open a file you pass in a string:

```ruby

filename = "bar.txt"
File.open("/home/foo/"+ filename)
```

This is a serious smell for several reasons. Not, as people often
believe, just to cater the few Ruby developers on Windows (Windows knows how to follow
"/foo/bar/" paths just as well as "\foo\bar" nowadays).

But mostly because this does not scale, gets convoluted real quick. Like
so:

```ruby

config_dir = "config/"
File.dirname(__FILE__) + "/../" + config_dir + "/environment.rb"
#=> ./../config//environment.rb
```

Ruby offers a great [`File.join()`](http://apidock.com/ruby/File/join/class?q=file.join) class method, for this. This simply uses the `File::SEPARATOR` to join a string.

```ruby

config_dir = "config/"
File.join(File.dirname(__FILE__), "..", config_dir, "environment.rb")
#=> ./../config/environment.rb
```

As you may notice, double slashes are eliminated.

Also, you can inherit this behaviour from [`Pathname`](http://www.ruby-doc.org/stdlib-1.9.3/libdoc/pathname/rdoc/Pathname.html), like `Rails.root` does. 

```ruby

config_dir = "config/"
Rails.root.join(config_dir, "environment.rb")
#=> /path/to/rails/project/config/environment.rb
```

Rolling your own, is very beneficial, and simple too.

```ruby

class MyConfig
  def dir
    Pathname.new(File.join("/", "etc", "myapp"))
  end
end

mc = MyConfig.new
mc.dir.join("templates", "example.html")
#=> "/etc/myapp/templates/example.html"
```

There really is no reason to fiddle with strings, concatenate slashes
and whatnot, to build paths. Join is so much easier, more powerfull and
above all, cleaner and more portable.
