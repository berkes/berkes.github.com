---
layout: post_archive
title: Drupal Databasedump for incremental backups.
created: 1265370001
tags:
- Server
- Tips and tricks
- Drupal Talk
- Drupal Hosting
- Drupal
lang: en
---
Attached is a <a href="http://webschuur.com/files/dump_fractured_database.tar_.gz">simple script to backup Drupal databases in an incremental-archive-friendly way (1.7KB)</a>. 
Instead of dumping the database into one big SQL file, this script creates many small files; one per table. With a _blacklist option_ to exclude certain tables. It stores the structure (CREATE TABLE statements) in a separate file too. 

Separate files are usefull in an incremental backup situation: Drupal has many tables who's content hardly ever changes, and has tables whos content is completely rewritten every X days (cache, accesslogs, watchdog etc).
That way, those rather stale tables will not fill up your backups, while the quick-rotating tables can be excluded alltogether. 

This script does not create the incremental backups itself. It merely places them in a directory where your backup-system can pick them up.

# Blacklist
Tablenames listed in blacklisted\_tables.txt will be ignored, usefull to avoid backups of cached data. 
_blacklisted\_tables.txt_ should be placed in the backup-location.
Note: blacklisting watchdog or accesslog may make troubleshooting more difficult: you should probably dump these tables somewhere else: they contain valuable    data, but data that you probably don't want to save in backup archives.
 
# Restore
Restoring many fractured files is a bit harder. But 'cat' does its job. If you find yourself restoring a lot, you may want to create a script for it. Or, actually, you may want to fix the cause of those many restores first :)
Important is to first run the strcuture into the database, and then the data.
       
        cat struct_{date}.sql data_*_{date}.sql > mysql ...

On huge backups, you may want to loop trough the dump\_data files and import them one a time. On busy environments, close down (or lock) you database first: you really don't want Drupal writing in your database while you are importing. Esp. older Drupals
have a habit of fractured inserts, causing broken databases really easy.

# Known issues and TODOs
TODO: If you feel uneasy about storing a password in a plaintext file (you should!), have a look at the debian/ubuntu way of passing a system-maintainance cnf file to mysql. Another reason for not wanting passwds used like this, is that they show up, visible for each user on a system, in the ps-table. Feel free to improve this :)

TODO: the tmp\_alltables.txt-file is not multithreadsafe. Nor is the simple output dumping. In other words: do not run two instances of this script at once. Something with lockfiles, or unique filenames could be a solution.

    DB=database_name
    HOST=localhost
    USER=database_user
    PASS=database_user_password
    BACKUP_PATH=/path/to/place/backups

    # Run mysqldump to backup the structure (should hardly ever change)
    mysqldump --add-drop-table --create-options --no-data --compress -u$USER -p$PASS -h$HOST $DB > $BACKUP_PATH/struct.sql

    # Create a list of all tables 
    mysql --skip-column-names -u$USER -p$PASS -h$HOST $DB -e'show tables;' > $BACKUP_PATH/tmp_alltables.txt

    # Loop trough the list of tables, filter out blackisted and dump each table.
    for table in `comm -23 $BACKUP_PATH/tmp_alltables.txt $BACKUP_PATH/blacklisted_tables.txt`; 
    do
	    mysqldump --no-create-info --complete-insert --compress --force --lock-tables -u$USER -p$PASS -h$HOST $DB $table > $BACKUP_PATH/data_$table.sql;
    done

    # And clean up
    rm $BACKUP_PATH/tmp_alltables.txt
