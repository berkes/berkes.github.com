## Build a Docker image for jekyll 4.3.2
FROM ruby:3.2.2-alpine3.19

ENV APPDIR=/srv/jekyll
ENV SETUPDIR=/setup
ENV GEM_HOME=/usr/local/bundle
ENV BUNDLE_PATH=$GEM_HOME
ENV BUNDLE_GEMFILE=$SETUPDIR/Gemfile
ENV PATH $GEM_HOME/bin:$PATH

WORKDIR ${SETUPDIR}

ARG GEMFILE_DIR=.
COPY $GEMFILE_DIR/Gemfile* $GEMFILE_DIR/packages* .

# Install build dependencies
RUN set -eux; \
    apk add --no-cache --virtual build-deps \
        build-base \
        zlib-dev \
    ;

# Install extra packages if needed
RUN set -eux; \
	if [ -e packages ]; then \
	    cat packages | apk add --no-cache --virtual extra-pkgs; \
    fi

# Install Bundler
RUN set -eux; gem install bundler

# Install gems from `Gemfile` via Bundler
RUN set -eux; bundler install

# Remove build dependencies
RUN set -eux; apk del --no-cache build-deps

# Clean up
RUN set -eux; \
    rm -rf \
        ${SETUPDIR} \
        /usr/gem/cache \
        /root/.bundle/cache \
    ;

ENV BUNDLE_GEMFILE=$APPDIR/Gemfile
WORKDIR ${APPDIR}

EXPOSE 4000
ENTRYPOINT ["bundle", "exec", "rake"]
