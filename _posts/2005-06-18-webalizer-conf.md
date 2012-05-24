---
layout: post_archive
title: webalizer.conf
created: 1119079631
tags:
- Server
lang: en
---
This slightly modified webalizr.conf does DNS lookups. The modifcations were made using the <a href="ftp://ftp.mrunix.net/pub/webalizer/DNS.

README">webalizer DNS readme</a>.

<code>
#!/bin/sh
# /etc/cron.daily/webalizer: webalizer daily maintenance script
# Written by Remco van de Meent <remco@debian.org>

WEBALIZER_BIN=/usr/bin/webalizer
WEBALIZER_CONF=/etc/webalizer.conf
WEBALIZER_DNS=/var/lib/dns_cache.db

# See if the webalizer binary and config file exists
# if not, exit without warning to prevent daily mails
[ -f ${WEBALIZER_BIN} ] || exit 0
[ -f ${WEBALIZER_CONF} ] || exit 0

# Figure out non-rotated logfile
nonrotatedlog=`egrep '^LogFile' $WEBALIZER_CONF | \
               sed -e 's/[[:space:]]\+/ /' | \
               cut -d ' ' -f2 | \
               sed -e  's/\.[[:digit:]][\.gz]*$//'`

# Can we read it?
[ -r "${nonrotatedlog}" ] || exit 0

# Check for empty logfile
logsz=`echo ${nonrotatedlog} | \
       sed -e 's/[[:space:]]\+/ /' | \
       cut -d ' ' -f2 | \
       xargs ls -l | \
       sed -e 's/[[:space:]]\+/ /g' | \
       cut -d ' ' -f5`
[ $logsz -gt 0 ] || exit 0

# Run webalizer quietly
${WEBALIZER_BIN} -D ${WEBALIZER_DNS} -N 5 -c ${WEBALIZER_CONF} -q
${WEBALIZER_BIN} -D ${WEBALIZER_DNS} -N 5 -c ${WEBALIZER_CONF} -q ${nonrotatedlog}

# Exit with webalizer's exit code
exit $?
</code>
