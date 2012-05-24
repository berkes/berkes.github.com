---
layout: post_archive
title: Your new drupal site, now what?
created: 1116328026
tags:
- Library
- Email
lang: en
---
You received your own website in the webschuur. That is cool, but what now? how to proceed? 

Here is a summary, (change example.com into your own domain, off course).

Create the root account, the first account you create is automagically made root.
example.com/?q=user/register
note down the password in a safe place, but you will receive a mail too.

Create some new users at 
example.com/?q=admin/user/create

Create a few roles, at least create a role called administrator. 
example.com/?q=admin/access/roles

Put the users in the correct roles by editing the one by one @
example.com/?q=admin/user/

Fill out the permission matrix at:
example.com/?q=admin/access

Fill out the sites details at:
example.com/?q=settings

Now you can look at the content, and its default states and workflow. fill out the details for each content type. 
example.com/?q=admin/node/configure/types

Some notes:
example.com/?q=admin/modules 
Should only be changed if you know what you are doing. installing modules can, and will, break your site, or make it less usable. Be sure you know what you are doing when changing anything there.

example.com/?q=admin/themes
Can be changed at will, but note, that if you have plans for your own layout, any changes you will make here now, will be made undone when the new theme is in place. so do not spend too much time in there. But it can be good to have a look at the default options there. Also, a temporary look, that will make your site look more like you plan to make it look, can improve the overall warm and fuzzy feelings of people visting by in your sandpit, while you are still at work in there.
