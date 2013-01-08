---
layout: post_long
title: "Drupal Imagecache security vulnarability with DDOS attack explained"
tags: [drupal, imagecache, security, ddos]
lang: en
---

Nearly a year ago, long before I decided to move out of [Drupalwork
entirely](http://berk.es/2012/10/01/farewell-drupal/), I reported a security vulnarability in Drupal 7 core
in imagecache. Since imagecache is used on most Drupal6 instances this
problem occurs there too.

I made a proof of concept, and a tool to test it. A screencast explaining the issue is found below:



The issue itself is really simple, the solution is hard; because
Imagecache was designed "wrong" in the first place. Let me explain.

You have really basic Drupal7-site on http://example.com, with content-type story that has an image-field. Using three
imagecache-styles: "medium", "large" and "thumbnail".

Imagecache works by creating new images from an original, on demand,
when a particular url is requested:

    &lt;img src="http://example.com/sites/default/files/styles/medium/public/field/image/news.jpg" /&gt;

Dissecting that url, we see:

* http://example.com/sites/default/files/ is where uploaded files are
  stored. This can also be something like http://acme.com/sites/acme-is-evil.org/files/ in case of multisite.
* /styles/ is the directory where imageges are cahed under.
* /medium/ is the style applied to this image
* /public/ the "driver", usually either "private" or "public".
* /field/image/news.jpg where the image is stored. The original can
  therefore be found at http://example.com/sites/default/files/field/image/news.jpg

In this case, a _derivative_ called _medium_ is created. Because creating images
is heavy, they are stored on disk, so a next time, the webserver can
serve this image right-away.

Let me repeat that: Because _creating images is heavy_, they are _stored
on disk_.

The idea is as simple as it is wrong: The first time (when the image is created) a full Drupal is booted up,
that Drupal-instance applies the various image-manipulations you have configured
for that style, and then serves and saves the image. 

"But why is that Wrong?", you ask?

Because you never know when the _heavy stuff_ will be invoked. It is
unpredictable.

And because the _heavy stuff_ is initialized by your visitors. People from
the evil, outside world. They can fire up your image-creating just by
visiting urls.

## DDOS

This is a typical DDOS vector: making a server do heavy stuff by
throwing something at it from outside. Typically in an orchestrated
attack that involves many people from many places throwing stuff at it.

## The actual issues: mixing images and styles

Everything above is not a large problem, because 90%, or more, of the
images used in img-tags on your site, are already created and cached on
disk. An attacker will need to find the last 10% and request these urls.
This is limited.

But, there are more, far more, possible images then those you use in the
img-tags.

We have two images. A frontpage-banner and a user-avatar. They are
_usually_ used with two imagecache styles:

    http://example.com/sites/default/files/styles/avatar-thumb/public/users/123.jpg
    http://example.com/sites/default/files/styles/front-banner/public/field/image/fancy_banner.png

I could just swap the styles and create a front-banner from the user-avatar,
and an avatar from the banner, like so:

    http://example.com/sites/default/files/styles/front-banner/public/users/user_123.jpg
    http://example.com/sites/default/files/styles/avatar-thumb/public/field/image/fancy_banner.png

And what is worse, you can pull any image in your _files_ directory through imagecache. Including that huge 7MB hi-res upload you forgot there. And if you consider the fact the tool imagemagick (often used as engine to convert the images) can actually handle pdfs, html and many other files you probaly have lying around in your _files_ directory, you know how much your system can be hurt.

This all gets worse with the size of the images that can be abused and
the heavyness of the imagecache-styles you have defined. Adding
watermarks, smartcropping, overlays, rounded corners and whatnot make
the generation of a derivative much heavier then merely resizing an image.

## The other issue: recursiveness

When we look above, we can see that imagecache will gladly pick up any
file, pull it trough the image-profiles you have defined, using the toolkits at hand and then _write out a file to disk_. 

Guess where? Yup, in the _files_ directory. Adding another file that can
be pulled trough imagecache. So, you can imagecache-already-imagecached
files. \[insert inception jokes here\].

This is where the attackers have the opportunity to fill up your
servers' harddrive. By simply generating image-styles by mixing up
images and styles, you can create a huge amount of unexpected images.
You them pull these trough imagecache again, to duplicate that huge
amount. And again. And again. Untill urls grow so large that the
webserver refuses them. Apache's limit lies around 4000 characters.

A site with only one, 0.1MB image image and two styles can gain several thousand
directories, nearly fivehundred copies of imagecache derivatives making
a total of ~50MB of new images. All an attacker needs to do, is send 500
HEAD requests to your server, doable in a fraction of a second.

A site with thousands of images and five imagecache styles will get
terabytes of new images in mere minutes. Obviously depending on the
speed of the server and how many (HEAD) requests the server allows simultaniously.
Or in days. Doing only a few-hundred requests each day, yet filling up
your disk slowly but surely, after which your average server will either
start crashing, or your hoster will send you large bills for extra
storage and so on.

Also note that one does not need to download the to-be-generated file. Just requesting it,
with a HEAD is enough.

## The proof of concept tool

Find it [on github](https://github.com/berkes/canhaz).

Please note that the tool is made for investigative use only; but be
aware that others might not heed this notice and either build such a
tool themselves (it is really simple) or use it to bring down your site.

Because of this, I chose to cripple it a little. The tool cannot detect wether you have applied the
security patch or not, or if you have different measures in place.
Because of this, I have removed the crawling part too, limiting it to
images and imagecache-styles found on the page you insert manually.

The tool was made to investigate when and how a system would crash or
choke using these attacks. Please investigate and learn about the CMS
and the modules you are you are using.

Prepare your system for Ruby.

    $ sudo apt-get install ruby rubygems #OSX and most Linuxes already have these
    $ sudo gem install bundle

Clone the tool and install the dependencies.

    $ git clone https://github.com/berkes/canhaz.git
    $ cd canhaz
    $ bundle install

Run!

    $ ./canhaz # Shows all tasks
    $ canhaz hit http://example.com 20 # generates max 20 imagecache
                                       # derivatives, by investigating
                                       # example.com

## Lessons learned

Don't do on-demand generation of things that require heavy work. In this
case, derivatives needed for a user-avatar should be created when a user
uploads that avatar. Even better is to let a [worker queue](http://en.wikipedia.org/wiki/Thread_pool_pattern) deal with the actual generation, that way dedicated machines can deal with the heavy lifting,
and users don't have to wait in front of a loading page while you are
making images.

Magic "handyness" like allowing any image to be "imagecached" is
usefull in development, but not in production. So, on your development
environment, you may want imagecached images to be generated on the fly (and probably not
cached, damn you, drush cc-all), you certainly don't want this
flexibility on a production server. You probably want to call some build
task while deploying to re-generated all your images there. Once. Before
deploying.

And for Drupal8: get rid of imagecache and implement a much simpler
on-submit image-builder. Just create only the two or three derivatives for Story when
a Story is created. This not only solves any such "unpredictable load"
issues, it allows for much easier CDNs, static-file-servers, caching and
more.
