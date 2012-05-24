---
layout: post_archive
title: Drupal function to return contents of a database table (for Debugging)
created: 1217607146
lang: en
---

Thought I should [share this function](http://snipplr.com/view/7637/drupal-function-to-return-contents-of-a-databasetable-for-debugging/) I use all the time to debug and develop Drupal code. I very often need to quickly see the contents of a certain table.

{% highlight php startinline %}
{% raw %}
function helpers_database_render_table($table_name) {
  $columns = $header = $rows = array();
    
    $result = db_queryd('SHOW columns in {%s}', $table_name);
    while ($column = db_fetch_object($result)) {
      $header[] = t('@columnname (@columntype)', array('@columnname' => $column->Field, '@columntype' => $column->Type));
        $columns[] = $column->Field;
    }
  
    $result = pager_query('SELECT * FROM {%s}', 50, 0, NULL, $table_name);
    while ($record = db_fetch_object($result)) {
      foreach($columns as $column) {
        //@TODO: include spans with title=fullresult on large results, and add ellipses in that case.
        $row[$column] = drupal_substr($record->$column, 0, 36);
      }
      $rows[] = $row;
    }
  
    $count = db_result(db_query("SELECT count(%s) FROM {%s}", $columns[0], $table_name));
    
    $caption = t('SELECT * FROM {%table_name} resulted in %count results', array('%table_name' => $table_name, '%count' => $count));
    
    return theme('table', $header, $rows, array(), $caption) . theme('pager');
}
{% endraw %}
{% endhighlight %}

I actually have been looking for something like this for any query, but I could not find an easy way to return all the columns for [insert your Query]. Especially on Joins with complex aliases this is hard. I bet there is some MySQL trick, but I have not found it, yet. 
