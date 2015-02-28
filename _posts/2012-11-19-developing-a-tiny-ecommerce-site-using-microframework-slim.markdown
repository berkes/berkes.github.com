---
layout: post
title: "Developing a tiny ecommerce site using microframework Slim"
tags: [microframeworks, slim, PHP, iDeal, piratenpartij]
lang: en
---

Last elections, I stepped forward as a volunteer for the [Dutch
Pirateparty](http://www.piratenpartij.nl/).

They were struggling with Drupal, and the most pressing issue was
getting a webshop going, using the Dutch Payment system iDeal, to take care of [new member subscriptions](https://lidworden.piratenpartij.nl/).

I had quite some experience with Drupal e-commerce, and the default Dutch payment-method [iDeal](http://groups.drupal.org/node/16772), in Drupal. Yet decided to build something from scratch instead, here is a short
introduction, some reasoning and then how I build the shop.

## Reasoning

### Managing the Drupalproject was hard as it was.

Three people were already working, around the clock, at that time, to get the
Drupalsite running and bug-free: theming, organic-groups-integration and
LDAP-integration (centralising the login), amongst the daily "we need
this and that page, if possible, ready before yesterday).

Adding a fourth track, integrating e-commerce, was just too much juggling and managing. And
granting access to their codebase and server for just about everyone who wanted to
help was not an option; so all commits would have to go via already
overloaded other volunteers.

Making, and deploying this as standalone application, was a good option.

### Drupals' (complete) lack of decent E-commerce options.

Yes, there is Commerce now. But in Juli, when all this was happening, it
was simply not ready, for example, there was no stable iDeal payment and
building one (against a still not stable payment-layer) was just too
much work. But even now, I have great doubts about Commerces' set-up,
architectures and concepts. Too much layers, too much in-browser
configuration and overly complicated juggling of several tens of
modules. I guess that is partly my aversion against this overly
complicated drupal-configuring-by-clicking-together stuff, but it might
also be because Drupal, as a CMS, will simply never have the focus and
targeted development that any of the bazillion e-commerce alternatives
have.

And Übercart has actually never been a serious option to me.

Integrating and developing the iDeal part for payment-module, was going to be much more work then building from scratch anyway.

### Easy for new volunteers.

Drupal is becoming harder and harder to jump into and start developing, with each release;
this site was Drupal 7 and I found that a lot of volunteers had trouble
solving trivial issues in this Drupalsite. I am not talking about
installing the eighty-fifth module, or configuring another view and
entity. I am talking theming, bugfixing and module-development. 

One of the things I did was helping with many such trivial issues like
organising the menu's, side blocks, organic-groups setup and so on. There
already was a shortage of people who knew enough of Drupal to help.
There was no shortage of people who knew some CSS and HTML, though, yet
getting them up-to-speed to employ these skills in Drupal theming and
configuration proved too much work. I learned (again) how hard and
difficult Drupal is, even for experienced (web)developers.

Also, the concept of this "become a member" thing was very much
unstable: no one knew exactly what was needed, required and such. If you
asked four people about what was required, you'd get four different (and
even contradicting) answers. So I decided we needed the most agile
system possible. Something that could have a new release several times a
day, something that anyone with basic webdevelopment-skills could help
fix or improve. 

## Slim
Hence **PHP**, hence [**Slim**](http://www.slimframework.com/), and managed and deployed with [**git
deploy**](http://berk.es/2012/08/03/git-deploy-or-how-i-learned-to-stop-worrying-and-love-deployment/).

### Requirements, documentation and functional designs (wireframes)
Before I started coding I wrote down some guidelines made a few
[mockups](https://github.com/piratenpartij/lidworden/blob/doc/lidworden.markdown) and created the most basic requirement-doc possible.

### The set-up
The [code](https://github.com/piratenpartij/lidworden) consists of a few
directories and a very few files.
{% highlight php startinline %}
├ Slim        # Contains the Slim Framework Library (classes)
├ templates   # Contains snippets and PHP-files to render the actual HTML
├ config.inc  # A few settings and globals
├ ideal.inc   # Class/lib to handle the payment processor
├ index.php   # The actual application
└ secrets.inc # file which is excluded from the public git and from the docroot.
{%endhighlight%}

### Template
The template was generated from the existing Drupalsite, by saving the page with Firefox (wget will not save CSS and such), parsing that trough `tidy`, and then manually clean up the rest of the HTML. 

This turned out to be, by far, the most work and resulted in two extra
directories "CSS" and "JS". The biggest problem was Drupal's extremely
convoluted HTML, with nested divs twenty(levels) deep at some points. 

In the end we learned that making the HTML, CSS and JavaScript from
scratch would not only have saved us many hours, it would have left us
with a far easier to maintain application.

The initial idea to keep as close to Drupal's output as possible. Since that would
allow us to transfer changes in design to this subsite too, was not
practical. 

### The application

The entire application [lives in index.php](https://github.com/piratenpartij/lidworden/blob/develop/index.php).

In a Slim application, you set up routes that react to a HTTP-request,
do stuff, and then return other stuff. Like so

{% highlight php startinline %}
$app->get('/', function () use ($app) {
  $app->render('_head.inc');
  $app->render(
    'landing.php',
    array(
      'default_amount' => DEFAULT_AMOUNT,
      'actions' => get_actions(),
    )
  );
  $app->render('_footer.inc');
  });
{% endhighlight %}

This is a PHP5 syntax, where you can create 
The above does the following:

1. register a path, "/" with the HTTP-verb GET.
1. Add an anonymous function to that; which will be executed when "/" is
   requested. PHP5 supports [anonymous functions, closures](http://www.php.net/manual/en/functions.anonymous.php).
1. When the function is executed, we call `render` to tell what files under "/templates/" to render. We do this for `head.inc` and `footer.inc`.
1. The template `landing.php` is rendered, but gets two variables passed along, which can then be [printed in landing.php](https://github.com/piratenpartij/lidworden/blob/develop/templates/landing.php). Note the "Bug" where we don't actually print the actions? This part has been rewritten so often that things got messed up a little.

This is all code needed to create a [page, with a form](https://lidworden.piratenpartij.nl).

When you post this form, a slightly more complex function is called, the
simplified version of that is:

{% highlight php  startinline %}
$app->post('/pirate', function () use ($app) {
  $pirate = $app->request()->params();
  //... more preparing of the $pirate that will be stored in the database

  if (!valid($app,'email', FALSE, '/.+@.+\..+/', 'E-mailadres is niet correct')) {
    //...Lots of other validations of all the fields.
    $app->redirect("/");
  }

  $pirate = write_pirate($pirate);
  write_mail($pirate);

  $ideal = new Ideal(MERCHANT_ID, SUB_ID, HASH_KEY, AQUIRER_URL);
  //... Preparing a hidden form for payment

  $app->render('_head.inc');
  $app->render(
    'pirate.php',
    array(
      'hidden_form' => $ideal->hidden_form(),
      'url' => $ideal->aquirer_url,
    )
  );
  $app->render('_footer.inc');
  });
{% endhighlight %}

The values you posted are validated, then written to the database, and
placed in a mail.

A new page is then rendered, with a hidden-form which will be posted to
the payment-system.

## iDeal
We have the simplest form of iDeal payment, iDeal lite. This is an
offsite-payment, where you simply create a form with hidden values and
POST that to the offsite payment-system. They then parse the POSTed
values and present the customer with a payment-workflow.

On success, the customer might return to `/success` on error, there is a
chance they end on `/error`. Because this is by no means a confirmation,
we simply render a success or error page there; but take no actions.

{% highlight php startinline %}
$app->get('/error', function () use ($app) {
 $app->render('_head.inc');
 $app->render(
    'error.php'
  );
  $app->render('_footer.inc');
});
{% endhighlight %}

Other ideal-versions have a Post-back system, where their server
confirms the payment; one of the earlier version of this application had
that, since we did not know exactly what iDeal-version we'd go with. A
confirm would be really simple to implement here:

{% highlight php startinline %}
$app->post('/confirm', function () use ($app) {
  $payment = $app->request()->params();
  $db = get_connection();
  $stmt = $db->prepare("UPDATE pirates SET status = :status WHERE id =
  :id");
  $stmt->bindParam("status", $payment["paymentStatus"]);
  $stmt->bindParam("pirate_id", $payment["purchaseID"]);
  $stmt->execute();
});
{% endhighlight %}

Obviously, in reality you'd probably need to parse the $payment to
extract the correct information (the status and the user whose payment
it was) from there. But again: you can see how extremely simple it is to implement.

## Deploying
Since everything is stored in code, we can deploy really simple, using a
git-push. Everyone with write access to the codebase can push changes
there. 

This allows for really fast rolling releases. Unfortunately, this breaks
when someone hacks the code online. And with so many people, under such
large pressure, that will happen. So all the time saved by having
deployments under our fingertips with git, was undone by merging in
changes that were not pushed correctly.

The solution to this is to make it easier and simpler to deploy The
Right Way, then to hack something on a live server. (And not, as some
might say, to make it harder to do the wrong thing; like removing Vim on
the server or disallowing access to the files on the server).

I assumed git-deploy would be this easy, but apparently people under
stress grabbed The Vim over SSH and hacked away on production code
anyway. Apparently the git-route was not simple enough.

## Conclusion

Several nights of coding, about 20 hours, of which 12 hours were CSS-
and HTML-cleaning and fiddling, we made a really simple login-system. 

The system was simple enough for others to start hacking on, in mere
minutes.

And its result was simple, stable and friendly enough to handle the
subscriptions of over 1100 in less then a month time.

Another example of what I call the "seeping trough of the complicated underlying
technology". In order to keep a project and its result clean, simple and
friendly, make sure the technology you use is simple, friendly and
clean; [KISS](http://2.bp.blogspot.com/-bRoNlTFFl4k/T8BDgLJQCJI/AAAAAAAAAwI/Mc9VGyhwYXA/s1600/einstein-if-you-cant-explain-it-simply-you-dont-understand-it-well-enough.jpg). Despite all the unstructured and rushed development, this application still works, is reasonable clean and can be revived and
improved in mere minutes.

Something I doubt would have been possible with a large stack of
e-commerce modules in Drupal; or hacked into a Magento or other shop; let
alone built with Zend, Rails or Whatever other framework.
