# berk.es build and test tasks.
#
# Run `just --list` to see all available recipes. The site is built with
# Hugo (hugo/hugo.yaml) into hugo/build/, and must be served on port 8000
# (the baseUrl in tests/cypress.config.js) for the Cypress tests to run.

port        := "8000"
host        := "127.0.0.1"
build_dir   := "hugo/build"
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

# Serve the built site at the given port (default 8000, Ctrl-C to stop)
serve port=port:
    python3 -m http.server {{port}} --bind {{host}} --directory {{build_dir}}

# Install the test dependencies (skipped when already installed)
install:
    #!/usr/bin/env bash
    set -euo pipefail
    cd {{tests_dir}}
    [ -d node_modules/cypress ] || npm ci

# Build the site, then run all Cypress tests headless against it
test *args: build install
    #!/usr/bin/env bash
    set -euo pipefail
    python3 -m http.server {{port}} --bind {{host}} --directory {{build_dir}} &
    server_pid=$!
    trap 'kill "$server_pid" 2>/dev/null || true' EXIT
    cd {{tests_dir}}
    npx cypress run {{args}}

# Build the site, then regenerate the visual regression baselines
# (tests/cypress/snapshots/ - commit the new .snap.png files)
update-visual-diffs: build install
    #!/usr/bin/env bash
    set -euo pipefail
    python3 -m http.server {{port}} --bind {{host}} --directory {{build_dir}} &
    server_pid=$!
    trap 'kill "$server_pid" 2>/dev/null || true' EXIT
    cd {{tests_dir}}
    CYPRESS_updateSnapshots=true npx cypress run --spec 'cypress/e2e/visual_regression.cy.js'
