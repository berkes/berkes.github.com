---
layout: post
title: "Fix SEGV for Vims command t on Ubuntu 12.10"
tags: [vim, command-t, ubuntu, 12.10, howto]
lang: en
---


The upgrade to Ubuntu 12.10 upgraded my Ruby version to 1.9.3 (yay!). 

This, however, broke my [command-t](https://wincent.com/products/command-t) a vim-plugin to open files
quickly. Command-t is a compiled plugin (for speed) and needs to be
compiled against the system-wide Ruby. Else vim crashes with a `SEGV`.

A little [searching](https://github.com/carlhuda/janus/issues/215#issuecomment-3003126), [showed me](http://deangerber.com/blog/2012/01/09/vim-caught-deadly-signal-segv/) 
that command-t was the problem and needed to be
recompiled. Obviously only when you had installed command-t before the upgrade to 12.10
(and thus compiled against the previous ruby version). As nearly always, once you know the problem, the fix is
easy on Ubuntu; the Vim and gVim are already compiled against the correct library.

First, checking what version command-t is compiled against:

      $ ldd ~/.vim/bundle/command-t/ruby/command-t/ext.so
      linux-gate.so.1 =>  (0xb7714000)
      libruby1.8.so.1.8 => /usr/lib/libruby1.8.so.1.8 (0xb7696000)
      libc.so.6 => /lib/i386-linux-gnu/libc.so.6 (0xb7330000)
      libpthread.so.0 => /lib/i386-linux-gnu/libpthread.so.0 (0xb7314000)
      librt.so.1 => /lib/i386-linux-gnu/librt.so.1 (0xb730b000)
      libdl.so.2 => /lib/i386-linux-gnu/libdl.so.2 (0xb7306000)
      libcrypt.so.1 => /lib/i386-linux-gnu/libcrypt.so.1 (0xb72d5000)
      libm.so.6 => /lib/i386-linux-gnu/libm.so.6 (0xb72a9000)
      /lib/ld-linux.so.2 (0xb7715000)

Hmm. `libruby1.8.so.1.8`, not good.

Cd into the command-t location (mine is at `~/.vim/bundle/command-t/`),
feth the lastest version, clean the old make and re-make. In order to re-make I use the rakefile,
you might have to install rake first. And, important, make sure you run
the system ruby if using gemsets. Like so:

      $ rvm use system
      $ ruby -v && which ruby # Just to know what we are using.
      $ sudo gem install rake # We need rake to build.

      $ cd ~/.vim/bundle/command-t/
      $ git pull --rebase origin && git checkout master

      $ make clean # remove old compilations and installation
      $ rake make  # rebuild the 

And there you go:

      $ ldd ~/.vim/bundle/command-t/ruby/command-t/ext.so 
      linux-gate.so.1 =>  (0xb7714000)
      libruby-1.9.1.so.1.9 => /usr/lib/libruby-1.9.1.so.1.9 (0xb74da000)

Happy [command-t-ing](https://wincent.com/products/command-t).
