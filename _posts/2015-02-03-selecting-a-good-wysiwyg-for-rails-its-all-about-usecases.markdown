--
layout: post_short
title: "Selecting a Good WYSIWYG for Rails: it's all about use-cases"
tags: [rails, wysiwyg]
lang: en
---
There is no such thing as "a good WYSIWYG" without looking closely at the case you are trying to solve and the preconditions you want to set. WYSIWYG, is, unfortunately, a label that is applied to far too many solutions for varying problems.

When people ask for "A WYSIWYG-editor" they are often asking for a solution to one of the following three problems:

* Needing to add markup up to body-texts.
* In need of more freedom when layouting pages without having to go
  through the development-team and/or releases.
* Editing copy-writing without having to go through the development-team
  and/or releases.

Unfortunately, many WYSIWYG-editors start off in one such use-case and then try to incorporate the other two; fail and grow unwieldy. I consider "a good WYSIWYG-editor" one that stays close to its usecase and implements that well. But even then, WYSIWYG-editors far often add more problems than that they solve. Sometimes you don't need a WYSIWYG-editor at all, so the first thing you should do as a developer, before the need or request for such an editor comes up, is to look closely at the editing workflow and look where you can improve this. Quite often a request for "a WYSIWYG-editor" is actually a sign that the user has different needs then what you built in the CMS. And when there is a requirement in the specifications, it often is a sign that the person drafting these requirements did not think through the editing workflow very well. 

Off course there are really good reasons to need such editors. But in
that case, it is very important to know what it is used for. And then
pick one (or more) to solve these problems. "A WYSIWYG" is by no means a
magic potion that you can drop on your CMS and solve all the editor's
problems.

## Marking up body-texts.

This is your typical-usecase. But note, that such an editor is not very good at layout. Nor should it be, layout is a different use-case.

An editor for such a use-case, must allow setting some inline styles, editing inline text and assets and allow you to add styles (mostly classes) that will effect the layout. A good WYSIWYG-editor will visualise this process and apply the styles for these classes inside the editor. E.g. if you mark something as "aside quote" it will be styled as "a quote that is pulled aside".

The most obvious place where you will see this going wrong, is with responsive-designs. HTML was always meant as a "suggestion" to the browser on how to render it, with CSS to instruct the browser on how to style, place and layout it (and yes, CSS has been rather poor in this too, but that is a different issue). Your texts (the body-texts) are best treated that way too: where the WYSIWYG-edit adds markup which the "design", through CSS most likely, can then leverage to style, design and layout. 

Storing the layout-information with(in) the content is a guarantee for disaster when you decide to change the designs. I've done several jobs where I helped people into the "new mobile age" by writing large, ugly parsers that clean body-texts of any layout that breaks mobile, but was stored in the database. Believe me, you don't want that markup in your database.

Having such "content" in your database"
{% highlight HTML %}
<p style="float:right; border: 2px solid #eee;">
  <b>Computers are useless. They can only give you answers.</b></br>
  <b><i>— Pablo Picasso</i></b>
</p>
{% endhighlight %}

Is awful (and this is, by far, not the worse a WISYWYG-editor can and
will output. Divs. Divs everywhere).

{% highlight HTML %}
<quote class="aside">
  Computers are useless. They can only give you answers.
  <footer>— Pablo Picasso</footer>
</quote>
{% endhighlight %}

...is better.

My personal favorite is [WYMeditor](http://wymeditor.github.io), though I am looking for a more modern looking alternative. 

When the audience allows for it (most important: if I can train/instruct the users) a markdown + live preview is preferred. My goto is [epiceditor](http://oscargodson.github.io/EpicEditor/).

Markdown has several huge benefits: you are storing a simplified, deduced markup in the database, no need for ugly HTML-parsing or regexp replacement of body-texts when changing the layout. And depending on where you want to send the text, you can compile it to the appropriate markup. HTML for the web, a different HTML through JSON for your app, PDF, epub, and so on. All of that is really only possible with very clean HTML. And allowing "only clean" HTML without using a different markup-language is very, very hard.

With something like:

{% highlight text %}
> Computers are useless. They can only give you answers.
> — Pablo Picasso
{% endhighlight %}

... the error tolerance is large; where before you had to allow <code>class="aside"</code> but not <code>class="button btn-round"<code>, you now no longer need to deal with this. When you allow a "classic" WYSIWYG you  will allow all sorts of (broken) HTML too. 

There is one thing certain: prepare for support-hell: you'll be debugging broken HTML from the moment you deploy a classic WYSIWYG-editor. "The mobile site is broken since the last deploy". "No, it's not. It's broken because you placed a left-floating image in a title in a table, probably not on purpose, but you did nonetheless."

## Layouting Pages.

If you really want your users to do this, build a CMS for this. This is certainly not something a WYSIWYG-editor can solve for you. You might need to build something that allows users to move widgets around. E.g. though [Apotomo](https://github.com/apotonick/apotomo). If you consider that even a professional webdeveloper with good understanding of CSS, a nice grid-framework at her disposal and clean HTML5 boilerplate has a hard time to build nice layouts, you'll understand that a tool to create such layouts without touching all that code is nearly impossible. It is certainly not something you'll drop on your project and release for your interns to add content to. So this is really not about WYSIWYG-editors anymore, but all about building an intuitive CMS. Which is a completely different topic.

But, you could assign a small part of the page to be "layouted". In that case, often the "layout possibilities" are very limited and the aforementioned *Marking up body-texts* applies. This is not about choosing an editor, but about defining the exact possibilities and areas that need to be edited and layouted.

Alternatively, you can assign small areas that can be edited, in combination with a tool to choose from pre-defined layouts. This is what e.g. [cmsimple](https://github.com/modeset/cmsimple) does. This works very well when you have a site with a few pages only and little dynamic content. The moment you need to mix this concept with, say, an upcoming-events calendar it becomes muddy and hard. Your users now need to edit everything around this calender in one place (the WYSIWYG-editor for the layout) and the other pieces somewhere else (in an events-CRUD-list e.g.). This is a hard problem but solved by mixing in copy-editing tools.

## Copy-editing.

Often, in-between all the dynamic parts, you want to change the copy-writing. Case at hand: a list of "upcoming events". It shows a dynamic list of events that will start in the next three weeks. The text and title above that list should be editable. You could use [Mercury](http://jejacks0n.github.io/mercury/) (which is what cmsimple leverages), but in that case you'd need to build a backend to capture and save/update the content. Worse is that you'll have two different CMS-es: one to edit the copy-writing and one to manage the events. 

For this, there is [phrasing](http://opensourcerails.com/phrasing/) it has all that in place and works nice. The copy-writing can be kept down to the bare minimum: something that is done by a different person, or at the very least in a different workflow. The moment that someone has to toggle between managing content and editing the copy-writing within one task, is the moment you'll need to refine the workflow. Most probably move some "copy" out of the copy-writing and into their own management. Say, someone edits the subtitle on the homepage on a daily base to contain the latest headline of the news-section: the user really needs a "highlight-management" within the content-management for the news-items.

Note that regardless of the solution, performance could become a bottleneck when there is a lot of copy-writing, because the texts now no longer come from a simple template-file but from a database. This is solvable with simple caching. And note that regardless of the solution, intermixing this with multilingual copy-writing will become a hell that you cannot ever hope to get out of.

But then again. Adding a WYSIWYG-editor in itself means entering a hell
that you cannot ever hope to get out of.

<small>This post was made as a [comment on Reddit in r/rails](http://www.reddit.com/r/rails/comments/2ukgm3/looking_for_a_good_wysiwyg/) and then edited and redacted to be a blogpost.</small>
