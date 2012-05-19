---
layout: post
title: Project directories in Apache
created: 1082637440
tags:
- Coding Corner
lang: nl
---
Because I work for various clients on various projects, I wanted to configure my localhost apache server in a way that all my projects can be automatically recognised by apache.<br /><br />Each of my projects gets a new directory under ~&frasl;Documents in the form PRJ_project where PRJ is a globally used project code (use it in my mail, time tracking etceteras) and project is the humanreadable name. <br /><br />Each of these folders contains various subfolders: ~&frasl;Documents&frasl;PRJ_project&frasl;res~&frasl;Documents&frasl;PRJ_project&frasl;admin~&frasl;Documents&frasl;PRJ_project&frasl;wwwetc.The www folder contains an exact mirror of the site i am working on.<br />What i wnat is that http:&frasl;&frasl;localhost&frasl;PRJ_project&frasl; points to the project PRJ_projects www directory.<br /><br />Now I could open http.conf or commonhttpd.conf and add some configuraion options for each project, each time i start a new one, but id rather have all of them configured to automatically detect the www directory.<br /><br />It is really easy by using the AliasMatch and DirectoryMatch tags and some regular expression.<br /><br />The code that is posted below can be directly inserted in your commonhttp.conf<pre>&lt;AliasMatch ^&frasl;([^&frasl;]*)&frasl;(.*)$ &frasl;home&frasl;ber3&frasl;Documents&frasl;Projecten&frasl;$1&frasl;www&frasl;$2&lt;DirectoryMatch &frasl;home&frasl;ber3&frasl;Documents&frasl;Projecten&frasl;[^&frasl;]*&frasl;www&frasl;&gt;    AllowOverride All    Options MultiViews +Indexes Includes FollowSymLinks    &lt;IfModule mod_access.c&gt;      Order allow,deny      Allow from all    &lt;&frasl;IfModule&gt;&lt;&frasl;DirectoryMatch&gt;</pre>
