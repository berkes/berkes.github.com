---
layout: post_archive
title: Counter queries for complex, none-distinct SQL in Drupals Pager system.
created: 1289420164
tags:
- Programming
- PHP
- Tips and tricks
- Drupal
lang: en
---
I think everyone knows these moments: You have a problem, a question. And just by asking that question, the answer pops up in your head. It happens to me often, when programming. 
It is obvious: by asking the question, you have to analyze and simplify the problem. And by doing so 

Today, there was another great way <a href="http://stackoverflow.com/users/73673/berkes">Stackoverflow helped me</a>: I had a problem with a *Drupal pager-query on a none-distinct SQL query*. And right when I was finishing up, the answer struck me. But because I spent so much effort in the question, and I don't want to forget, I decided to share it. 

---

Drupal uses [pager_query][1] if you wish to get a limited result, for used as a paged, list. 

A simple example would be (I am aware of my code not adhering to Drupal standards, done that for simplicity):

    $nodes = pager_query('SELECT title, created FROM node WHERE published = 1', 20, 0);
    while ($node = db_fetch_object($nodes)) {
       $html .= "$node->title ($node->created)";
    }
    $html .= theme('pager'); //This collects "magic" variables set by pager_query to build a string containing pagerlinks.

Now, I need to tackle a much more complex query, one that is not distinct as above. __I am not sure if I should solve this in the domain of SQL, or rather in the domain of Drupal/PHP.__

session<->node is an N:1 relation: any node has_many sessions. A session has_one node.

    $nodes = pager_query('SELECT node.nid, node.title, node.created, sessions.time, sessions.sid FROM node INNER JOIN sessions ON session.nodes_nid = node.nid WHERE published = 1', 20, 0);
    while ($node = db_fetch_object($nodes)) {
       $n->title = $node->title;
       $n->nid = $node->nid;
       unset($node->title, $node->nid);
       $n->sessions[$node->sid] = $node;
       $items[$n->nid] = $n;
    }
    
Above routine allows me to query the database ONCE, fetch nodes that have_many playdates, and collect them in a list that: 
 
- has one row per $node. 
- each $node row has a list of all its associated sessions under $node->sessions. 

However, pager_query lists one item for each row, instead of using a smarter counter query.__This is where the answer became clear__

## And so, the answer is really simple: counter query
the last parameter of pager\_query() is an alternative query to be used as counter. In the abovementioned example. that would be: 

    $sql = 'SELECT node.nid, node.title, node.created, sessions.time, sessions.sid FROM node INNER JOIN sessions ON session.nodes_nid = node.nid WHERE published = 1';
    $counter = 'SELECT COUNT(DISTINCT(node.nid) FROM node INNER JOIN sessions ON session.nodes_nid = node.nid WHERE published = 1';
    pager_query($sql, 20, 0, $counter);

[1]: http://api.drupal.org/api/drupal/includes--pager.inc/function/pager_query/6
