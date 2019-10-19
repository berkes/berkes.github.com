---
title: "Using Bitwarden to store Ansible-vault password"
tags: [ansible, linux, bitwarden]
layout: post
lang: en
---

When provisioning servers with Ansible, managing the secrets is quite a
hassle, even with ansible-vault helping there.  A typical ansible-vaults
contains all sorts of critical secret keys, such as API-keys, root
(sudo) passwords of sysadmins, databases passwords and so on. And it is
protected with a single password. Anyone running ansible, needs that
password; otherwise ansible won't provision properly.

Storing that password in plain text on your hard drive is a definite
no-go. That is insecure, and with more people involved requires syncing
it across all your colleagues' computers.

The solution is to use a password manager that allows sharing a password
with a team. And then hook that up to ansible, so ansible can read it
from there.

Ansible has a feature that allows users to
[define a script which returns the vault password](https://docs.ansible.com/ansible/latest/user_guide/vault.html#providing-vault-passwords):
`--vault-password-file`. 

Ansible itself has [an example
script](https://github.com/ansible/ansible/blob/devel/contrib/vault/vault-keyring-client.py),
which uses your OS keyring as source for this vault password. But, alas,
I'm not very comfortable with gnome-keyring and prefer
[Bitwarden](https://bitwarden.com). Most of these OS-keyrings also don't
allow sharing with other users.

Bitwarden is my preferred password manager because it is the only truly
Open-source password manager with sharing-abilities and syncing built
in. Everything in and around Bitwarden is open-source, even
the server handling the syncing. You can host it yourself (on premise)
even; I trust their servers and service so far, but love the idea of
being able to bail out and host my own, if they ever break that trust:
When it comes to passwords you'll really want to avoid any risk of
vendor lock-in. Open-Source allows for the adagio "Don't trust,
verify!". User-friendly, free, open-source and cross-platform; I really
don't understand why it is not more popular, actually.

I've made a tiny bash script that interacts with bitwarden. It requires the
`bitwarden-cli` to [be
installed](https://help.bitwarden.com/article/cli/#quick-start), which
is available for most OSes.

The script requires you to log in to bitwarden first. This can probably
be added to the script as well, using `bw unlock --check`, but that too,
adds unnecessary complexity: the errors shown when not logged in, are
clear enough, I think.  Bitwarden (all the apps, so the CLI app too)
have a staged login: you log in with your email, password, and optional
2fa. This is set as default on your device. Then you unlock the database
in order to access the passwords using only the password.

Introducing a tiny bash script called  `ansible-vault-pass.sh`, which
handles the unlocking and then looks up and returns the vault password
is simple:

{% highlight bash startinline %}
#!/bin/bash

_BW_VAULT_ENTRY_ID="ansible-vault"
_bw_session="$(bw unlock --raw)"
echo "$(bw get password ${_BW_VAULT_ENTRY_ID} --session ${_bw_session} --raw)"
{% endhighlight %}

It has the entry-id hardcoded; for me, that is "good enough". Especially
since it avoids a lot of complexity.

Now, running ansible should be very easy and only prompt for your
bitwarden password:

{% highlight bash %}
ansible-playbook webservers.yml --vault-password-file=/path/to/ansible-vault-pass.sh
{% endhighlight %}

The `--vault-password-file` option can be given a default in the
main Ansible configuration (commonly `~/.ansible.cfg`):

{% highlight ini %}
[defaults]
vault_password_file=/path/to/ansible-vault-pass.sh
{% endhighlight %}

The latter, somehow, must be an absolute path. No idea why: ansible is weirdly
picky in these things often.

No, you can run any ansible command without the `--vault-password-file`
option. For example:

{% highlight bash %}
ansible all -a "hostname" -f 10
{% endhighlight %}

## Result

* The vault password can be stored securely in a properly encrypted
    Bitwarden database.
* The vault password can be shared amongst colleagues using Bitwardens'
    built in syncing, sharing and access system.
* The ansible-vault itself can now be used to store all the secrets
    needed for provisioning.
* We only need to type in the bitwarden password every run. Allowing for
    long, difficult, and easily rotatable vault-passwords.
* Every colleague has her own bitwarden login, so everyone uses their
    own password instead of having to remember a shared one.

Two security notes, though:

* Ansible-vault, as storage for secrets, is secure, but can be
    brute-forced. So using a hard, long and often changing password is
    probably a requirement. Especially if employees rotate often.
* Everyone with access to the ansible-vault password in their Bitwarden
    account, can read the entire ansible-vault. Treat all the secrets in
    there as such. E.g. if a colleague leaves, consider rotating all the
    secrets stored in that vault; just revoking the access in Bitwarden
    is not enough, nor is changing the ansible-vault password stored in
    Bitwarden. Anyone with access can have easily dumped all the secrets
    onto their hard drive at some point.
