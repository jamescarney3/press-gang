#!/bin/bash

# remove a potentially pre-existing server.pid for Rails.
rm -f tmp/pids/server.pid

# if running the rails server then create or migrate existing database
if [ "${@: -2:1}" == "./bin/rails" ] && [ "${@: -1:1}" == "server" ]; then
  ./bin/rails db:prepare
fi

# execute the container's main process (CMD directive in Dockerfile)
exec "${@}"
