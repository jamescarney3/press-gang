FROM ruby:3.3 AS base

# copy files and set working directory
ADD . /usr/src/press_gang_api
WORKDIR /usr/src/press_gang_api

# install application dependencies
# TODO: don't install dev and test deps when running in production?
RUN bundle install

# set some ENV vars here directly and start server from entrypoint script that also sources
# a copied .env file
FROM base AS production

ENV RAILS_ENV=production
ENV RAILS_SERVE_STATIC_FILES=true
ENV RAILS_LOG_TO_STDOUT=true

# specify 0.0.0.0 as IP address here so the server listens on all available
# network interfaces and is accessible from outside of this container
CMD ["./bin/rails", "server", "-b", "0.0.0.0"]

# copy and execute separate entrypoint script - good place to ensure the db
# exists and is prepared, clean up any existing pids,
COPY entrypoint.sh /usr/bin/
RUN chmod +x /usr/bin/entrypoint.sh
ENTRYPOINT ["entrypoint.sh"]


FROM base AS development

# specify 0.0.0.0 as IP address here so the server listens on all available
# network interfaces and is accessible from outside of this container
CMD ["./bin/rails", "server", "-b", "0.0.0.0"]
