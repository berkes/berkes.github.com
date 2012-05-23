---
layout: post_archive
title: HOWTO turn Drupal into an authenticate-only site with users from an LDAP directory.
created: 1171745883
tags:
- PHP
- Drupal Talk
- Drupal Hosting
- Drupal
lang: en
---
Drupal has a fantastic feature, the [hook_auth](http://api.drupal.org/api/5/function/hook_auth) to allow any third party to interact in the authentication process. This is used to authenticate against other Drupal sites over XMLRPC, it is used in the experimental openID integration, to allow authentication against any database, and so on.
And off course to authenticate against an [LDAP directory, using the ldapauth module](http://drupal.org/project/ldap_integration). This HOWTO helps you on the track for the LDAP coupling.
We use ldapauth.module, userprotect.module and Sympal Password Hijack to mould our Drupal site into an authenticate-only site.

![Screenshot of LAT, an LDAP managament tool](http://webschuur.com/sites/webschuur.com/files/example_ldap_directory.png)

## Contents and disclaimer
This HOWTO overs the basics of the configuration of LDAP server, and it covers how to configure Drupal to allow authentication. It does not cover any profile data integration with LDAP, nor does it cover group-based, or levelled access control. A user authenticated trough LDAP is an 'authenticated' Drupal user. Nothing more, nothing less.
Be aware that I am no authority on LDAP servers, LDAP schemes or Drupal authentication. Also be aware that I wrote this howto for _Drupal 4.7_, using the modules available in February 2007, by the time you read this, things may have changed drastically. 

## LDAP server
LDAP is a database server, often used to store people and their login credentials. You can use any server, but this howto will cover the surface of [openLDAP](http://www.openldap.org/), the free and open LDAP server. Getting an LDAP server running is easy (depending on the environment off course), but configuring it properly is not. This howto assumes you have a running Debian system (for experiments with such a server, I advice the excellent [VPS service Linode](http://www.linode.com/)). For other servers, distributions and variations, I collected a series of useful [LDAP server HOWTOS and manuals on Simpy](http://www.simpy.com/user/berkes/search/LDAP++tags:"howto").

## LDAP scheme
Because there is not One LDAP structure (unlike, e.g. openID, or DrupalID, whom are standardised) the login-data can live anywhere in the database, on any kind of place, in any kind of form.
This howto describes how to use the popular and standardised [NIS scheme](http://www.faqs.org/rfcs/rfc2307.html), but it could potentially be used for any scheme, including the popular openDirectory by Microsoft.
The NIS scheme is used often as a way to manage users on a Unix system, it has classes such as homeDirectory and LoginShell. Because this scheme is used primarily to contain login-data, most (administrative) clients and applications will be able to use this data.
In addition we can use the inetOrgPerson scheme, which is the de-facto standard to contain addressbook data. This is not required for Drupals authentication, but it is useful for future extension with actual user-data.

## LDAP management
This howto does not cover how to manage your LDAP users trough Drupal. In fact, it assumes you have third party tools to manage them.

## Performance
LDAP performs much better then MySQL when it comes to read-only actions, which is what we do in this howto. So, one would expect Drupal with LDAP authentication  to perform a lot better then Drupal with normal authentication. This is not the case. In contrary. Both the architecture of Drupal core, and the LDAP authentication module make it perform a lot worse. Drupal has to write to the MySQL database anyway for any remotely authenticated user. So instead of only the read and write to MySQL that 'normal' authentication does, LDAP authentication performs a read and write to MySQL, _in addition to_ the LDAP read action. And that read action on itself is not performed very optimized either, by the PHP. 

So don't go looking at LDAP authentication for performance solutions.

## Get the server up and running
First we install the openLDAP server slapd

    # apt-get-install slapd

Now follow the steps on your screen carefully. None of the choices matter for Drupal authentication, they only make the LDAP work :).
We don't need TLS encryption for local authentication, so if your Drupal site is running on the same server, don't bother about all the TLS stuff. But if you are going to run the authentication over the internet, on different servers, you will have to check out [how to make Certificates](http://www.debian-administration.org/articles/284) (not trivial) and how to get [LDAP to run on the secure connections](http://www.openldap.org/doc/admin23/security.html#Network Security). Debians configuration includes most of this already, in fact you only need to change /etc/default/slapd, uncomment the SLAPD_SERVICES parameter.

## Configuring the LDAP data schemes
The Debian package comes with a series of [predefined schemes](http://www.zytrax.com/books/ldap/ape/). No need to change anything there, they offer far more features then we will ever need. If there are things you miss in any of the schemes, you will need [to override them](http://www.redhat.com/docs/manuals/dir-server/schema/7.1/server.html), it is considered bad practice to fiddle with the schemes themselves. This however, is far beyond the scope of this Howto.

## Configuring access schemes
The LDAP authentication module uses a separate user with search rights to find the user for authentication. We need to give this user full read rights. (backup the configuration first!)

    # vim /etc/LDAP/slapd.conf

    # The admin dn has full write access,
    # User has full write access 
    # (not required by Drupal, though)
    # Everyone in the branch AdminUsers can write and read 
    # (not required by Drupal, though)
    # Everyone in the branch search (group) can read all entries
    # everyone else can only authenticate, never read anything.

    access to *
        by dn="cn=admin,dc=LDAP,dc=example,dc=com" write
        by self write
        by dn.children="cn=AdminUsers,dc=LDAP,dc=example,dc=com" write
        by dn.children="cn=search,dc=LDAP,dc=example,dc=com" read
        by anonymous auth

## Insert the users and branches
A good alternative for the commandline examples below is using the Gnome LDAP administration tool [LAT](http://dev.mmgsecurity.com/projects/lat/), or the KDE tool [Luma](http://www.kde-apps.org/content/show.php?content=9771). There are probably good GUI tools for [other platforms too](http://freshmeat.net/search/?q=LDAP&section=projects&Go.x=0&Go.y=0).

First we must create the branches mentioned in the configuration. For that, the simplest is to insert them using the LDIF examples that are attached to this howto (A bug in Drupal running this site adds a .txt extension, make sure to rename the files to .ldif after downloading). The admin user, created by Debians installation system, has full rights, so it is the easiest to use that user for inserting the data.

    $ ldapadd -c -a -x -D 
    \ "cn=admin,dc=LDAP,dc=example,dc=com" -w Y0urP@sswd \
    -H ldap://localhost -f file.ldif

Before we insert this, however, we must create a password for the search user. [Yolinux has a detailed manual on this](http://www.yolinux.com/TUTORIALS/LinuxTutorialLDAP-BindPW.html), but for the searcher the following command will do (on one line!):

    $  perl -e 'print("userPassword: {CRYPT}".
    crypt("thePassw0rd","salt-n-pepa")."\n");'

The result must be copied into the _userPassword:_ space in the _user\_search.ldif_ file

Upload the files to the server (_scp /home/me/*.ldif me@example.com:/home/me/_ for example).
Then invoke the ldapadd command listed above to insert the files one a time, in the following order:

   * group_AdminUsers.ldif
   * group_people.ldif
   * group_search.ldif
   * user_search.ldif (remember to insert the password here first!)

__Note of caution:__ The searchers password is stored in plaintext in your database, be very sure that you have the access in slapd.conf limited very well for this user.

## Configure Drupal
Assuming you have a running and installed Drupal, you must now install the ldapauth module. It is found in the [LDAP_integration project](http://drupal.org/project/ldap_integration).

Browse to _http://example.com/admin/settings/user_ and switch off public registrations, because it would defeat the whole purpose of LDAP authentication if people can create their own accounts and gain access that way. The option to choose is 'Only site administrators can create new accounts'.

## Configure LDAPauth module
Browse to _http://example.com/admin/settings/ldapauth_ and insert the following values:

* Organisation Name: Any Name You Want (freeform)
* LDAP server: localhost (or ldap.example.com)
* LDAP port: 389
* Use TLS encryption: OFF
* Store passwords in encrypted form: OFF (as far as I am aware openLDAP has troubles with this setting being on. Please leave a comment if you have more information)

* Do not store users' passwords during sessions: ON (we don't use ldapdata, only ldapauth)
* When Loggin in, Drupal will look up for the user on: LDAP directory only
* Base DNs: cn=people,dc=LDAP,dc=example,dc=com
* UserName attribute: cn (that way users log in with their 'real name'. In fact I did not get ldapauth to recognise any other attribute then cn)

* DN for non-anonymous search: cn=searcher searcher,cn=search,dc=LDAP,dc=example,dc=com
* Password: thePassw0rd, as inserted in the _perl -e ... );_ line.

## Create one (or more) users in your LDAP 'people' branch.
Use the same method as adding the searcher user to add me (user_ber.ldif). Including the password generation.

## Check if the LDAP server works and finds the new user.

    $ ldapsearch -x \
    -D "cn=searcher searcher,cn=search,dc=LDAP,dc=example,dc=com"\
    -w _thePassw0rd_ \
    -b "cn=searcher searcher,cn=search,dc=LDAP,dc=example,dc=com"\
    -H ldap://localhost "sn=Kes*"

## Log in with 'ber'
Browse to your login-page (logout first :) ) and use the username 'Ber Kessels' and the password yo gave that user.

## Restrict changes and edits.
Because we cannot write to the LDAP directory the site should never allow people changing their data. This is unfortunately hardwired into Drupal, so it can be done, but not very clean (the edit tab will always remain visible, for example).
Install the [User Protect](http://drupal.org/project/userprotect) Module by [Chad Phillips](http://apartmentlines.com/)
And browse to _http://example.com/admin/settings/userprotect/protected_roles_ Where you should disable all the options for 'authenticated user' by checking the row for that role.
Under access control at _http://example.com/admin/access_ you must deny access for authenticated user to 'change own mail' and 'change own password'.
Especially the e-mail part is important, since ldapauth does not come with an e-mail address. This will cause errors for that user. Another nasty <s>bug</s>[hardcoded feature](http://drupal.org/node/20846) in Drupal.

## Restrict New Password mails.
Because we don't have an e-mailaddress, we want to get rid of the hardcoded 'request new password' feature in Drupal. Since this is hardcoded, we cannot simply disable it. Therefore we install the [Sympal Password Hijack](http://drupal.org/project/sympal_password_hijack)
This module was especially developed for [this purpose](http://webschuur.com/portfolio/modules/portfolio/modules_3). It allows you to have the password requests mailed to yourself, instead of the user. That way you can edit the LDAP directory entry by hand in case of a lost password.

## Credits
Thanks to the fine folks at #LDAP on irc.freenode.org for helping me out with the openLDAP configuration
Thanks to the [Thuiszorg Midden-Limburg](http://www.tmlzorg.nl/) IT department for sponsoring this document.
Feel free to [contact](/about/contact) me if you need LDAP configuration in Drupal done for you.

Update: 17/02/07 changed the settings into a list
