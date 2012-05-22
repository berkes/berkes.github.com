---
layout: post
title: A better way to variable_get() and t() in Drupal.
created: 1330605343
tags:
- Drupal
- Programming
- Tips and tricks
lang: en
---
When programming in Drupal, [repeating default values in variable_get](http://drupal.stackexchange.com/questions/23162/using-variable-get-in-multiple-places-without-duplicating-default) and repeating strings in translations, all over the place, is a very strong [codesmell](http://martinfowler.com/bliki/CodeSmell.html).

I have been playing with solutions for this, and during my last project decided to take these attempts and make it into a very simple system. A pattern.

But, first, let us identify the problems. 

<!--break-->

## Persistent variables

    $html .= "Showing ". variable_get("mymodule_amount", 20) ."items";
    $html .= pager_query("SELECT * FROM {mymodule_items}", variable_get("mymodule_amount", 20));
    if ($total > variable_get("mymodule_amount", 20)) {
      $html .= "there are more";
    }

Not only is there the *magic number 20* all over the place, it is a DRY violation all over the place.
In above example, that DRY violation is not very visible, yet, but imagine a module called *project_magician_message_center*:

    variable_get("project_magician_message_center_amount_for_". $node->type, 20);
    variable_get("project_magician_message_center_request_limit", 20);

Just open up your average *variables* table in larger Drupalproject and look around. The horror! (And maybe you have been bitten by the length limit of 128 characters?). There is no pattern; just a list of unpredicable names.

The *magic number* problem often gets solved by Drupal developers with constants. But as the name suggests,
a constant is constant. And a variable is variable. It is very confusing to read this:

    define("MYMODULE_AMOUNT", 20);
    $items = pager_query("SELECT * FROM {mymodule_items}", variable_get("mymodule_amount", MYMODULE_AMOUNT));

Especially when you clearly get 30 items in some list. Which is what happens when a variable gets another value. Suddenly the constant is no longer
used; it acts like a variable. Naming your constants *MYMODULE_AMOUNT_DEFAULT* is slightly better, but no real solution.

## Translations, screentexts.
Translations, through *t()* act even worse. Some examples:

      t("Hello World, today is %date");
      t("Hello world, today is %date"); #note the intentional erronous lowercase world.

      $actor = "Marsellus";
      $subject = "Antwone";
      t("Look, just because I don't be givin' no man a foot massage don't make it right for %actor to throw %subject into a glass motherfuckin' house, fuckin' up the way the nigger talks. Motherfucker do that shit to me, he better paralyze my ass, 'cause I'll kill the motherfucker, know what I'm sayin'?", array("%actor" => $actor, "%subject" => $subject));

      $message <<<MESS
    Well, the way they make shows is, they make one show. That show's called a pilot. 

    Then they show that show to the people who make shows, and on the strength of that one show they decide if they're going to make more shows. Some pilots get picked and become television programs.

    Some don't, become nothing. She starred in one of the ones that became nothing.
    MESS
      t($message);

      t(_mymodule_message_contents());

First and foremost problem with this is that it is not prefixed, namespaced if you will. Your *t("Submit")* is the same as that other *t("Submit")*. Translate this once to "Create new" and suddenly all sorts of labels, tabs, titles and links show the text "Create new". We have all been, there, just admit it, already.

But The first two examples pose an ever greater problem, too many such sentences are very alike. Strings like "A new %type was created" show up next to "New %type created!". Especially when there are many modules, built over time, by many different developers.

Then the larger texts become an even bigger issue, they range from plain ugly to cluttering and convoluted.

Mixing screentexts and logic, which is what we all do, is arguably as bad as mixing code and presentation.

## Solution

Imagine you could say:

    "Showing ". v("amount");
    "Showing ". v("core.amount_per_page");

    t("core.hello_world");
    t("ecommerce.payment.thank_you");
    t("core.thank_you");
    t("footmassage", array("%actor" => $actor, "%subject" => $subject));

Where all your defaults are nicely set in a central place, your screen-texts are in single place, or even file. And everything gets prefixed with your modulename, unless you define it differently.

The solution is OOP. Just a little, don't fret, and nicely tuck away so that you won't need to program everything OOP suddenly. First a generic class, which we will built upon in our modules.

    class DrupalHelper {
      protected $prefix = "core";

      public function v($symbol) {
        return variable_get(absolute_or_prefix($symbol), $$symbol);
      }

      public function t($symbol, $params) {
        $translated = "";
        $symbol = absolute_or_prefix($symbol);
        $function = symbol_to_function($symbol);

        if (method_exists($this, $function)) {
          $untranslated = $this->$function();
        }
        else {
          $untranslated = $symbol;
        }

        return t($untranslated, $params);
      }

      private function absolute_or_prefix($symbol) {
        if (!strstr($symbol, ".")) {
          $symbol = $prefix .".". $symbol;
        }
        return $symbol;
      }
      private function symbol_to_function($symbol) {
        return "t_". preg_replace("/\./", $symbol);
      }
    }


With the module, I inherit this helper:

    class MyModuleHelper() extends DrupalHelper {
      protected $prefix = "mymodule";

      #defaults:
      public $length = 20;

      #translations:
      private function t_hello_world() {
        "Hello World";
      }
    }

In your module, you use this as follows:

    function mymodule_form_alter($form_id, &$form, &$form_values) {
      if ($form_id == "foo") {
        $helper = new MyModuleHelper();

        $form["field"] = array(
          "#type"   => "textfield",
          "#title"  => $helper->t("hello_world"),
          "#length" => $helper->v("length")
        );
      }
    }


The usage-example does not load the library files, but delegating code to separate files is not hard in Drupal, with helpers like *module_load_include()*. This example assumes the file is already loaded, or that some autoloader is in place.
This example-code does not yet handle the variable_del and variable_set functionality for variables, but that is left to the reader to implement.

Also note that I have simplified the code a little for readability. Like leaving out the variable_set and the very much simplified symbol_to_function().

Some other todo's on my list are:

* Introduce a fallback for core strings, we now have to either call *$helper->t("foo")* for our symbol based translations, or *t("foo")* for core or 3rd party module strings. Core messages need to be callable with symbols too.
* Allow passing variables into t() instead of an keyed array. Like *t("footmassage", $actor, $subject)*; parsing and cleaning should use sane defaults but would need to be overridable.
* Format_plural implementation. I hardly ever need it, but it should be callable like *plural("footmassage", $actor, $subject, $count);
* Make it easier to place all screen texts in a separate file.
* More consistency. Maybe defaults for variables should be defined just like texts, with a private *v_var_name()* function.

A real simple pattern, which requires a little understanding of OOP, but has almost only benefits in usage. And as far as I can see only one downside: it is "Un-Drupal-ish"; but that is not a reason, in itself.

*comments on [Reddit](http://www.reddit.com/r/drupal/comments/qcuqa/a_better_way_to_variable_get_and_t_in_drupal/)*
