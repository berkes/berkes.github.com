---
title: "Ignore Rust's target build directories in Deja-Dup"
tags: [ubuntu, hack, rust]
lang: en
layout: post
---

I use Deja-Dup, to backup my Ubuntu machines. And just like [shimo describes in this blog post](https://medium.com/@shimo164/ignore-node-modules-directories-in-deja-dup-433997fd2461), I too want to avoid backing up gigabytes of `node_module` directories[^1].

[^1]: Unfortunately a feature request to add some pattern ignore system to Deja-Dup [has been ignored for years](https://gitlab.gnome.org/World/deja-dup/-/issues/112). Personally, I'd love Deja-Dup to ignore any patterns found in any .gitignore file it encounters. Same as ripgrep and fd and some more modern CLI tools do. For me that'd be the *opinionated simplicity* that I seek in software. But alas.

But I also want to avoid backup up gigabytes of `target` directories from
building Rust projects with Cargo. I have accumulated some 50+ Rust codebases
scattered throughout my project directories. Their combined `target`
directories take up about 9GB at time of writing. And all of that is
reproducible, cache-like data. It doesn't need to be backed up.

So, I adapted *Shimo's* crontab to add `.deja-dup-ignore` to all:

* All directories named target
* Where the parent directory has a `Cargo.toml` file

In a crontab:

```cron
05 10    *   *   *   find ~/ -type d -name target -exec bash -c 'if [ -f "$(dirname {})/Cargo.toml" ]; then touch "{}/.deja-dup-ignore"; fi' \; 2>&1
```

The command runs find, which will execute a bash command on every directory
called `target`. This bash command then gets for the parent dir - `$(dirname
{})` - of this `target` directory. It will then check if this parent dir has a
Cargo.toml file - `if [ -f "$(dirname {})/Cargo.toml" ];` and if so, add a
.deja-dup-ignore ignore file in this target dir.

I don't just want to ignore any `target` directory. I have at
least one legit directory named `target` (containing a business target). There
will be more, there probably are already. Hence the added check for the Cargo.toml file.

This speeds up my backup from over an hour a week, to under 20 minutes a week.
And it saves me some 20GB in backup space. Almost a quarter of the space of my
incremental backups were `node_modules` and `target` directories.
