---
title: "{{ replace .File.ContentBaseName (printf "%s-" .Date.Format "2006-01-02") "" | humanize | title }}"
date: {{ .Date }}
location: ""
lang: en
url: "/p/{{ .File.ContentBaseName }}.html"
draft: true
---

