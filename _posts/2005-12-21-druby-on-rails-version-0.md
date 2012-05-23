---
layout: post
title: Druby on rails (version 0)
created: 1135162716
tags:
- Drupal Talk
- Ruby
lang: en
---
<strong>A Drupal developer's first impression of Ruby on Rails.</strong>

I just received that <a href="http://www.pragmaticprogrammer.com/titles/rails/index.html">famous Ruby on Rails</a> (RoR) book, and off course put everyhing aside and started reading. After less then an hour I had my first RoR site running (and I did not know a single line of Ruby, before). And, as promised by all he taglines, it is dead easy. So, does that  mean for me <a href="http://drupal.org">Drupal</a> is passÃ©? 

Off course not. This means that I can move to a new viewpoint for looking at Drupal. I think Drupal can learn a lot from RoR, and I am confident I can use a lot of Drupal concepts in my RoR development (well, not yet real development, just playing, for now ;) ).

The title, 'version 0' indicates that there is more to follow. I think there will be, because I am just starting. There are a lot more chapters to go, still, and off course I need to get really into this Ruby stuff too, in order to really compare Drupal and RoR ideas. 

After finishing the first chapters and my first RoR application, here is what I think Drupal can do on short terms:
<ul>
<li>Code generation. I have already experimented with tiny shell scripts that build small modules from the commandline. A lot of Drupal programming is Copy Paste Search Replace work. Scripts can do that much faster than any human can. We should share such scripts to build a code builder. It should, IMO, not live in Bash scripts, but in php scripts, invoked from the commandline.
Another good thing about this, is that it will allow new developers to start of faster. And prevent these developers from developing incompatible, non-standard code.</li>
<li>Offline Online Documentation. Huh? No, that is not a typo. What i mean is the Gems brilliant documentation <a href="http://localhost:8808">server</a>. Drupal has drupaldocs.org, but it is not evident to get this running on your localhost. An installation profile for development (including devel.module, theme_development.module, apidocs.module and off course our fabulous unit testing framework). Every developer should be able to install and run this to gain time, not to loose time tweaking and modifying that site.</li>
<li>Clearer aims. What is drupal for. Who is it for. I know that Dries does not really believe in imposing these constraints, but one fact of the success of RoR is that it is not aimed at end user, but focused on developers only.</li>
<li>Less cruft. In Ruby this is a mantra, highly overused, if you ask me, but still, it is a nice philosophy. Drupal ships with a lot of ready made solutions; Ready made solutions that actually never truly solve all developers needs. I cannot remember any website that I built where I did not need additional contributions and core replacements. Nor any where I used all the modules from core. I believe Drupal should Ship Nothing. Like RoR, which is 'nothing really'. Something that is 'nothing really' is everything in potential. While something that pretends t be something already gives you a hard time if you want it to become something completely different. But for this to happen, we need distro's that maintain the experience of 'intall and get going'. This, in fact, is highly related to the point before this one, that we need 'clearer aims'</li>
</ul>

Some longer terms concepts we should think of, include:
<ul>
<li>A real MVC. Drupal has no real model view controller framework. Well, in fact it has many, which are rather inconsistent. Yes, this is that endless debate on 'everything should be nodes'. The node part is the very best MVC in Drupal, but comments have a rather limited, and incompatible (with nodes) one. So do users and even taxonomy.</li>
<li>Object Relational Mappings (ORM). PHP is fairly limited when it comes to high level database programming. RoR has a very fancy very well structured ORM. Drupal has a few, which (surprise) are inconsistent. Again, this boils down to the 'everything should be nodes' debate. Since nodes have a very well worked out ORM. All the other parts have not worked this out that well. It is sheer impossible to develop a module that alters any of the data, without hardcoding SQL into that module. That is a bad practise. I am aware of the potential performance penalties. But it needs not be that way. Our node_load system is highly abstracted, while its internals take care of performance. I am confident that this system actually performs better then spread out hardcoded queries against the node table. Contrib users have not got that time, or knowledge, on average, to optimise all these queries.</li>
<li>Consistent path-mapping. Ruby has a written down convention on how URLs (paths) are structured. Drupal does not really have this. It has de-facto conventions, but even in core these conventions are broken all over the place. I have not yet seen them, but I am confident that there are conflicting paths in the contributions. Two modules implementing a /list/123 path, will break, yet nothing tells developers not to use that path syntax.</li>
</ul>

Well, i can almost hear you thinking: "talk is silver, code is gold', or 'well then fsking DO IT'. sure, and that is the god part of this all. 
Last week I finally revived the DrupalCOM project. It will be the core of our business sympal.nl and thus it needs to solve our needs. The funny thing, is that about all the abovementioned points were already considered when I worked out the definition and philosophy of Sympal/DrupalCOM.
So, yes, expect real code and real results. Rather then just talk. Code that will flow back to Drupal itself.

O, and don't forget, if you have ideas about this, hop on. Only by participating can you steer this stuff in a direction that you want it to go too. Otherwise it will only go in my direction, for that is the way I want it to go, for now. 
