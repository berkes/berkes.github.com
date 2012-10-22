---
layout: post_archive
title: Some tips for adminstrators and multisite providers to make Drupal more secure.
created: 1139761003
tags:
- drupal talk
- sympal.nl
lang: en
---
I beleive in transparency. Again: there is no security hole or security bug! This is only a list of often made configuration mistakes on Drupal sites. On any site that has several administrators, you have to take rather extreme measures to make sure the admins cannot administrate themselves up. And to make sure that only those you want and trust can do more then you ever want anyone to do. On your server you have to make sure that (untrusted) administrators cannot take over other peoples sites or even your server.

Without limiting some rather trivial rights, Drupal cannot be made very secure for administrators. Anyone with admin rights can -with a few tricks- gain all rights. So you either need to run Drupal in a CGI environment with tight chroots, or you need to deploy a complex chroot environment. When you administer Drupal with a lot of people, you should make very sure that moderators or editors cannot make themselves adminstrators.
The best option for multisite providers, is to deliver Drupal in a very limited fashion. To make sure that the administrators are limited in the first place. And that they cannot give themselves, via some tricks, more rights.
The best option for adminstrators of larger sites with quite some moderators, one needs to very carefully pick the permissions. For some permissions give users the option to gain more permissions. Or to break your site.

Here are some tricks, that users can use to gain a lot of rights:
<ul>
<li>Problem: Anyone who can administer filters can add himself to those that can run PHP. Then he or she can do anything. Most probably including FUBARring the complete server. Drupal has some places where PHP code can be inserted. One can use that PHP to change the password of the root user for example, or to give himself more rights by changing his role. When you run Drupal post 4.6, but not have it updated to the most recent HEAD, then anyone with administer blocks rights can run any piece of HTML. in the stable releases this is all secured.
Solution: Remove all PHP filters. ALL. on blocks, on contributed modules (sections, is one I know of), and especially on filters. Best is to just not allow any php input. How handy it may seem, it is a big security issue. I advice people to simply not use them at all.</li>
<li>Problem: Superuser (user with ID 1), root, can do anything. There is no way to secure or limit the rights of that user.
Solution: Never hand out superuser details. Superuser should be given a very hard password. You could even think about a cron script that changes the password for the superuser. Superuser should never be used at all, I would say.</li>
<li>Problem: the first user is autmatically superuser. Someone can stumble upon a site that is made, but has no first user yet. (or actively hunt for such a site), then become superuser and take over the complete server.
Solution: Install your sites on your multihost with a pre-made superuser. In any case you should never, ever leave your site sitting in the wild, after installation, but with no users made yet. Not even because you "want to make a cup of coffee first" :)</li>
<li>Problem: Themes. Most themes can run PHP. If you allow people to add themes, you give them an option to run PHP. You give them an option to do anything. To make themselves the superuser, par example.
Solution: Make sure no-one can add themes, via either uploads, FTP or anything else. It might sound like a good option to let people add their own design, but themes are powerfull. Themes can be abused very easily.</li>
<li>Problem: Modules. Obvious. People who can install modules can do anything.
Solution: Do not allow people to install modules.</li>
<li>Problem: File uploads. People who can upload files can often run these.
Solution:
 <ul>
  <li>Add the location for /files in you settings.php. That way people cannot change that online.</li>
  <li>Be very, very sure about your server before you give "access administration" rights. For people with that permission can change the files they can upload. They can then upload executable files and execute them. Be very sure about what files are executable and what files are not. Be very sure about what files can be accessed from the web.</li>
  <li>Drupals core upload system has the following hard-coded: files ending on php|pl|py|cgi|asp or javascript files will be given a mime-type of text and get an extension of .txt. So make very sure that you do not allow anything else, like rhtml (ruby) .exe or .perl to run on your server. Make even more sure to harden the use of shebangs and of executable bits.</li>
  <li>Consider harcoding the download method to private in the settings.php. Only with that setting can you make sure that uploaded files cannot get called directly from the web.</li>
  <li>Be extremely careful with contributed upload systems. Drupals core does very little to secure files. Most of it is hard-coded in upload.module and some of it in file.inc. It is very</li> easy for contributed upload modules to open security holes. My advice is to simply never use them at all.
 </ul></li>
<li>Problem: Users can "upgrade" themselves. Anyone with "administer users" rights can administer himself and change his role to a less restrictive one. It is never possible to become superuser, though. Just always remember that those that have "administer users" permissions have ways to give themselves the least restrictive role available. So if there is a role that can run PHP, then they can run PHP.
Solution: Only give the highest role "administer user" rights.</li>
<li>Problem: users that can "administer access control" can give themselves any rights, including those that allow them to run PHP.
Solution: Make very sure that only very trusted people have this. My advice is simply to never give anyone this right! The downside is that people can no longer properly install modules, for they cannot change the permissions to actually use those modules after installation. Be very aware of this problem.</li>
<li>Problem: On-server edited files, or updated files by CVS, often get a backup when saved. For example the settings.php file is often edited on the server using vi. People can then read your database password by simply calling yoursite.com/sites/default/settings.php~
Solution: Make sure your mysql server is secure and that remote access is limited or non-existant. Futhermore, make sure that you often run (cron) scripts to remove any ~ .orig or other backup files. Make sure that after a CVS upgrade you remove the .# files.</li>
</ul>
Overall, a very good idea is to look at all settings and all variables with a microscope, and to add a lot of these to the settings.php. For the settings in there cannot be overridden (even-though the interface might let you think something different)! Another option you will really want to investigate, is to configure your server in such a way, that PHP ran for tulips.com can never access anything on roses.org.

On the long run however, Drupal itself should (consider to) deal with this in a better way.
The fact that to merely allow someone change the slogan, you need to give that person also the rights to change the directory where files are stored, is just bad. Both live under one "administer site configuration" permission. So in practice that means you have to either disallow people to change the mission/title/footer/emailadress etc. Or you have to live with the fact that those people can also change where the files are stored. In which case you need to harden your server a lot.
And simply adding a lot more permissions is not going to solve this, either. Because, in order to keep Drupal flexible, yet still allow people to configure a site for safety, we would need such a great amount of permissions, that it will make it only worse. We would probably need to double the amount of permissions, so to cover all the possible cases, and thus double the chances that some permission is miscoded (in a module), or even misconfigured. It would also mean that we need to properly document twice the amount of permissions. And that we get twice the amount of ways that people can give themselves rights you never want them to have.

My idea of all this, is to use more nodes and more modules, in core.

I know people have various philosophical reasons for not wanting stuff to be nodes, but, if, for example blocks were nodes (on Sympal we already use microcontent.module) we could limit certain blocks to certain roles. Or we could limit the amount of roles that need administration rights in the first place. If the mission were a node, then you no longer need to hand out administer permissions, only to get your editor to change the frontpage text.
The other option is to move certain dubious options completely into a module. A server maintainer can then just completely remove that module and no longer has to worry about some upgrade, or misconfiguration, giving people the access they should never have gotten. In a nutshell this project would be called "Move a lot of things from the adminstration region into user-space". So that your moderator can still administer (block them, give them a new password, etc) users, yet never ever give himself more permissions.

And my last shot is to remove a lot of permissions from the administration interface. We store permissions in the database. Anyone who gains access to the database can do anything. IMO we should simply hard-code more settings. A line of PHP is a lot more secure then an entry in a database. An example could be an extra "php_filter.module" (and no more php filters in the core filter module). If that module is removed completely, then no-one has to have sleepless nights about people giving themselves php filter rights. Ever! Why have the option stored in the database (that everyone can access, at the least) if you can just have it hardcoded in PHP, where no-one is able to change it? Or where server admins can make sure that the option does not exist in the first place?
Obviously the anwer to that is "becuase it adds more complexity to the install and administration procedures". Frankly I don't care about that. Because I beleive there is never ever, ever, ever, (ever!) a reason to lower security, only to make stuff easier. If you go down that route you end where Microsoft was a few years ago. Then you will be adding ActiveX alikes, to make installing plugins (aka security holes) easier. (on a sidenote, eventhough the Firefox plugins are more secure, they will become a security nightmare in near future too). Everywhere where you lower security to only make stuff simpler, you are opening up holes. Or you make potential holes. If it means that we have to remove "cool stuff" like PHP input from core completely, to make Drupal more secure, then I think that is a very good option to do.

But let me stress it again. Drupal is not insecure. It is only quite easy to make it so. Too easy in my opinion. The list above is only to show hosting providers and Drupal administrators some often made misconfigurations. Am I worrying too much? Is it our task to prevent server misconfigurations. No and no. But I am aware that it is far too easy to misconfigure Drupal. Especially in a multisite system. And that Drupal is rather limited in handing people options to prevent that.

Lets move forward. Lets push this in the form of patches after 4.7. So to make 4.8 a lot more secure by default. And lets be aware for now. Very aware.
