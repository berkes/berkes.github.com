---
layout: post_archive
title: Drupal cookies and privacy laws
created: 1108744664
tags:

lang: en
---
"The use of internetcookies is in contradiction with all privacyrules in the EU", according to the <a href="http://odur.let.rug.nl/alfa/scripties/NicolineBraat.pdf">thesis</a> about the collecting of personal details on internet, by a Groninger student in IT, <a href="http://odur.let.rug.nl/alfa/scripties/NicolineBraat.html">Nicoline Braat</a>.
"Amoungst others, the security of cookies (plain text), but also duration and security of the protocol, are against european laws in privacy".

Drupal uses cookies via PHPsessions to store log-in information, redirects, personal theme preferences and more. 
I beleive it is not so ,uch Drupals task to alert people about this, the client (Browser) is the one to blame. 
However, especially the duration, as defined in the .htaccess file, should be taken into closer consideration. I see two options to do so:
1) Set the default lifetime of a cookie to four weeks, and alert admins, in a comment in that cookie that increasing the lifetime might be illegal under certain laws.
2) Keep our current settings, but add a small line with a link under the register and login form. That line should read "Foobar.com uses cookies to store your information. Read more about cookies"
