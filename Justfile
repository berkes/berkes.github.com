# berk.es build and test tasks.
#
# Run `just --list` to see all recipes. The site must be served on port 8000
# (the baseUrl in tests/cypress.config.js) for the Cypress tests to run.

port        := "8000"
host        := "127.0.0.1"
build_dir   := "build"
tests_dir   := "tests"
jekyll_image := "docker.io/berkes/jekyll:latest"

# List the available recipes
default:
    @just --list

# Build the site into build/ with Jekyll (in Docker, same image as CI)
build:
    docker run --rm \
        --volume "{{justfile_directory()}}:/srv/jekyll" \
        {{jekyll_image}} build

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
