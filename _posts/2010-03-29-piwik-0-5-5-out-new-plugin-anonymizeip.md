---
layout: post_archive
title: ! 'Piwik 0.5.5 out. New plugin: AnonymizeIP'
created: 1269870506
tags:
- ''
lang: en
---
I run <a href="http://piwik.org/">piwik, the Open Source web analytics</a> tool on the webschuur server to track some clients' sites and this site. 

Piwik released a new, mostly bugfix, version. But one particular new feature, the addon "AnonymizeIP" struck me as very usefull: 
> Anonymize visitor IP addresses to comply with your local privacy laws/guidelines.

![piwik plugin screenshot](http://webschuur.com/files/screenshot_006.png)

Very little more to be found about this, unfortunately, so I dove into the code. 
The file <code>global.ini.php</code> contains a setting 
    
    ; number of octets in IP address to mask, in order to anonymize a visitor's IP address; if the 
    AnonymizeIP plugin is deactivated, this value is ignored; for IPv4 addresses, valid values are 
    0..4"

Setting this to e.g. 3 will mask the addresses, so that you store only the first IP-block is kept. For example, the IP adress from Google (one of the many) 74.125.77.147 will be <strong>stored</strong> as 74.000.000.000 when set to <em>3</em>.

I have set this to 2. So I can still guess the approximate region, but can never find out who you are exactly. Great for privacy, yet still somewhat usefull for me. 
