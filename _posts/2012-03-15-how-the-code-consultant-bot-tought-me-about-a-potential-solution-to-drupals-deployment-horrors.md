---
layout: post_archive
title: How the Code Consultant Bot tought me about a potential solution to Drupals'
  deployment horrors.
created: 1331807160
tags:
- ''
lang: en
---
I just learned about the [Code Consultant Bot](https://code-consultant.appspot.com/), a chat-bot version of the [Rubber Duck](http://www.codinghorror.com/blog/2012/03/rubber-duck-problem-solving.html). 

The gist is that by explaining your question to someone (or on Stackoverflow, or to a Duck, or a chat-bot), you think about the question in more abstract, simpler or different ways. It very often solves my problem. 

I took the bot out for a test-drive. Posing my favorite problem to it: **How to properly deploy Drupal without downtime and tedious manual configuration** (answer: you cannot). Here is the transcript:

<pre>
berkes@jabber.org 11:20:28
Hello	

code-consultant@appspot.com 11:20:32
Hello, I'm your Code Consulatant
Ever notice how just talking through an issue with a co-worker is enough to help you solve a problem, even if they don't say a word? 11:20:32
Let me help you with your problems so they can keep working. 11:20:33
How do you do.  Please state your problem. 11:20:33
 
berkes@jabber.org 11:20:49
I want to deploy Drupal without downtime.	

code-consultant@appspot.com 11:20:49
What would it mean to you if you got to deploy drupal without downtime  ?	

berkes@jabber.org 11:21:10
then I would not need to take the site offline while rolling out a new release	

code-consultant@appspot.com 11:21:10
You say then you would not need to take the site offline while rolling out a new release  ?	

berkes@jabber.org 11:21:18
yes	

code-consultant@appspot.com 11:21:18
You seem to be quite positive.	

berkes@jabber.org 11:21:43
how would I release a drupalsite without taking the site offline?	

code-consultant@appspot.com 11:21:44
Why do you ask ?	

berkes@jabber.org 11:22:26
because Drupal stores its configuration in the database. The same database that contains the content.	

code-consultant@appspot.com 11:23:09
What database are you using ?	

berkes@jabber.org 11:23:16
MySQL	

code-consultant@appspot.com 11:23:16
You're going to have to tell me more.	

berkes@jabber.org 11:23:32
MySQL relational database	

code-consultant@appspot.com 11:23:32
Is your database well normalized ?	

berkes@jabber.org 11:23:37
yes, it is.	

code-consultant@appspot.com 11:23:37
You are sure.	

berkes@jabber.org 11:23:55
Well, no. You are right, that is part of the proble,	

code-consultant@appspot.com 11:23:56
Are you saying no just to be negative?	

berkes@jabber.org 11:24:27
how would I normalise Drupals database?	

code-consultant@appspot.com 11:24:27
Liquibase would help you manage your database better.
</pre>

[LiquiBase](https://en.wikipedia.org/wiki/LiquiBase). I am not sure about the practical application of this tool, and if it will fit well into a Drupal workflow. But from the description, it tries to solve *exactly* the *Drupal Deployment Problem*.

In the very least, it helps. **a lot**:

* **Rollback database to "tag"**. Woa. If your deployment fails, whether or not you did that with any of the tools such as **hook\_update\_N**, **Features**, or whatever, there is still no rollback. Yet. Here it is.
* **Database diff changelog generation**. Especially usefull on your development machine: it allows you to record all the changes you made while developing the new release for your site. Even if such a changelog helps you to write a release-script manually, it is very helpful. Did you never forget to set that one checkbox on live, because you forgot you had it checked on your development machine? Causing a Giant Shipment of Fail?

Funny. To learn a new tool from a bot. What is next? [Bots solving our actual solutions for us](http://www.goingfaster.com/term2029/skynet.html)? 
