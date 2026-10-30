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

# Build the site into build/ with Jekyll (in Docker, same image as CI).
# Installs gems from Gemfile.lock first so the recipe keeps working after
# dependency bumps without waiting for a new image build.
build:
    #!/usr/bin/env bash
    set -euo pipefail
    docker run --rm \
        --volume "{{justfile_directory()}}:/srv/jekyll" \
        --entrypoint sh \
        {{jekyll_image}} -c 'bundle install --jobs 4 && bundle exec rake build'

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

# Hugo port (migration #144): build into hugo/build with Hugo.
hugo-build *args:
    #!/usr/bin/env bash
    set -euo pipefail
    command -v hugo >/dev/null || { echo "hugo not found; install Hugo extended (e.g. pip install hugo)"; exit 1; }
    hugo --source hugo {{args}}

# Convert the Jekyll source into the Hugo content tree (idempotent).
hugo-convert:
    python3 scripts/convert_content.py

# Serve the Hugo build at the given port (default 8000, Ctrl-C to stop)
hugo-serve port=port:
    python3 -m http.server {{port}} --bind {{host}} --directory hugo/build

# Build the Hugo site and run the URL parity + link checks against it
hugo-check: hugo-build
    python3 scripts/check_urls.py hugo/build --baseline docs/migration/url-parity-baseline.txt --ignore docs/migration/known-dead-links.txt

# Build the Hugo site, then run all Cypress tests headless against it
hugo-test *args: install
    #!/usr/bin/env bash
    set -euo pipefail
    just hugo-build
    python3 -m http.server {{port}} --bind {{host}} --directory hugo/build &
    server_pid=$!
    trap 'kill "$server_pid" 2>/dev/null || true' EXIT
    cd {{tests_dir}}
    npx cypress run {{args}}
