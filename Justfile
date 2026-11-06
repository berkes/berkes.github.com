# berk.es build and test tasks.
#
# Run `just --list` to see all available recipes. The site is built with
# Hugo (hugo/hugo.yaml) into hugo/build/, and must be served on port 8000
# (the baseUrl in tests/cypress.config.js) for the Cypress tests to run.

port        := "8000"
host        := "127.0.0.1"
tests_dir   := "tests"

# List the available recipes
default:
    @just --list

# Build the site with Hugo into hugo/build/.
# Requires Hugo extended on PATH (e.g. `pip install hugo`, brew, or a release
# tarball from gohugo.io).
build *args:
    #!/usr/bin/env bash
    set -euo pipefail
    command -v hugo >/dev/null || { echo "hugo not found; install Hugo extended (e.g. pip install hugo)"; exit 1; }
    hugo --source hugo {{args}}

# Preview the site with Hugo's built-in server (Ctrl-C to stop).
# Append `hugo server` flags as needed, e.g. `just serve --port 8000`.
serve *args:
    hugo --source hugo server --bind {{host}} {{args}}

# Install the test dependencies (skipped when already installed)
install:
    #!/usr/bin/env bash
    set -euo pipefail
    cd {{tests_dir}}
    [ -d node_modules/cypress ] || npm ci

# Serve the site with hugo server (which also builds it), then run all
# Cypress tests headless against it
test *args: install
    #!/usr/bin/env bash
    set -euo pipefail
    just serve &
    server_pid=$!
    trap 'kill "$server_pid" 2>/dev/null || true' EXIT
    i=0
    until curl -sf -o /dev/null "http://{{host}}:{{port}}/"; do
        i=$((i + 1))
        if [ "$i" -ge 30 ]; then echo "hugo server did not come up on {{host}}:{{port}}"; exit 1; fi
        sleep 1
    done
    cd {{tests_dir}}
    npx cypress run {{args}}
