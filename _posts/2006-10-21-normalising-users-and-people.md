---
layout: post
title: Normalising users and people
created: 1161426576
tags:
- Programming
- Tips and tricks
- Ruby
- Ruby on Rails
- Railfrog
lang: en
---
In many database driven applications (web-apps) you need some sort of user-system. A system to manage log-in facilities and rights management etceteras. A general "mistake" I see all over the place is that a user equals a person, in these systems. I decided to make a decent normalised concept for this and document it for once :). 

The idea is that there are two separate entities: a user and a person. You may, or may not couple them, either now, or later. The benefit is that, using this concept, you have a choice:  <!--break-->

 * a user is not a person (system user)
 * a user is a person
 * a user is more people
 * a person is more users
 * a person can become a user (your client in your addressbok needs access, later on)
 * a person is required to be a user. 
 * a user is required to be a person.

while a de-normalised table, where you store stuff like name, birthdate in the same entity as the user, you don't have this choice, not now, nor later. You can only say person equals user. Always.

The entity relation diagram is simple, as is the SQL. 
To make the example even simpler, I ignored entries on the "user" object, such as "username" and "password". Instead I used a single "openid_url". This is beyond the scope of this blog entry, so just think of it as "A user is a 'thing used to manage logins'" while a person is a "thing used to track real people".

![entity relation diagram users and people](/sites/webschuur.com/files/sugarcube_entity_rel_diagram_user.png)

    DROP TABLE IF EXISTS `users`;
    CREATE TABLE IF NOT EXISTS `users` (
      `id` int(11) NOT NULL auto_increment,
      `openid_url` varchar(256) default NULL,
      `person_id` int(11) NOT NULL,
      `role_id` int(11) NOT NULL,
      PRIMARY KEY  (`id`)
    ) ENGINE=MyISAM DEFAULT CHARSET=utf8 AUTO_INCREMENT=2 ;

    DROP TABLE IF EXISTS `people`;
    CREATE TABLE IF NOT EXISTS `people` (
      `id` int(11) NOT NULL auto_increment,
      `firstname` varchar(255) NOT NULL,
      `middlename` varchar(255) NOT NULL,
      `surname` varchar(255) NOT NULL,
      `sex` tinytext NOT NULL COMMENT '''f'' or ''m''',
      `birthdate` date NOT NULL,
      PRIMARY KEY  (`id`)
    ) ENGINE=MyISAM DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

_Both the ERD and the sql contain an extra element, this is Off Topic here, but it is a 'role', which I need to create a role-based permission system, mor eabout htat later_

I would be glad to hear more ideas and or better ways to do this.
