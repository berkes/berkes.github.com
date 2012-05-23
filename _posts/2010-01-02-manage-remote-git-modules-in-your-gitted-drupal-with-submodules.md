---
layout: post_archive
title: Manage remote git modules in your gitted Drupal with submodules
created: 1262444011
tags:
- Drupal
- Drupal Talk
lang: en
---
This small howto describes the concept of adding Drupal modules to your project's git repository. For that, you can use the git command <a href="http://book.git-scm.com/5_submodules.html">git submodules</a>.

Off course you can simply copy the code into an existing repostory and commit that. But that eliminates the posibility to easily update modules once they are updated upstream (the author has fixed some bugs; you want these bugfixes too). And it will not show you the log for that module. Submodules fixes that. 

We have a Drupal-project already in Git:

    cd /to/your/drupal/project
    git submodule add git://github.com/berkes/Drupal-iDeal-payment-api.git sites/all/modules/ideal\_payment\_api

This will pull in the repository Drupal-iDeal-payment-api and place it in sites/all/modules/ideal\_payment\_api.

If you wish to commit changes to Drupal-iDeal-payment-api, the url should point to a repository where you have write access. 
You can provide any url, also local paths. But in that case, when you push your project to a repository where others (teammembers) pull changes from, those others will not be able to access the submodule. Best is to include only submodules that are accessilbe to those who can access the main project (superproject).

    $ git status
    # On branch master
    # Changes to be committed:
    #   (use "git reset HEAD <file>..." to unstage)
    #
    #	new file:   .gitmodules
    #	new file:   sites/all/modules/ideal\_payment\_api

We have two commits ready to go: a new file .gitmodules and a directory with the new module.

    $ git commit -m "Add submodule ideal\_payment\_api."
    $ git push origin master 

Then commit it, and optionally push it to remote. 

Whenever you change code in the sites/all/modules/ideal\_payment\_api now, you will be able to commit these changes and push the changes to the repository *of the module*. 
Other changes made to the module itself, e.g. by the author, or in the project itsef, will *not be pulled in automatically*

Whenever other users of the superproject, update, they will not get new code in the submodule, unless they specifically request new code. 

    $ cd /clean/directory
    $ git clone git@github.com:berkes/MPR\_my\_main\_project.git
    # Initialized empty Git repository in ... done.
    $ ls -ah MPR\_my\_main\_project/sites/all/modules/drupal\_ideal\_payment\_api/
    # .  ..

As you can see, the directory for the submodule is there, but it is empty. 

    $ git submodule status
    # -836a5fc6a04f2297b945e7d0359b765dee208989 sites/all/modules/ideal\_payment\_api

The submodule status command also tells us the directory is empty. 
So let us pull in the Drupal module. This is a two-step process: first we initialise, then we call update. 

    $ git submodule init
    $ git submodule update

The module is now available and, fixated on the revision where we committed the submodule! 

The <a href="http://www.kernel.org/pub/software/scm/git/docs/git-submodule.html">official git-submodule documentation</a> as well as the <a href="http://progit.org/book/ch6-6.html">pro-git book</a> have in-depth reading on how to maintain your code from here. And describe some pithfalls. <a href="http://gitcasts.com/posts/git-submodules">Gitcast</a> has a good screencast on this matter, if you want to sit back and watch a good explanation.
