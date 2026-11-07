#!/bin/bash

# stop api and client containers
docker compose -f /usr/local/james/press-gang/docker-compose.production.yml down api client -d

# copy source into destination folder
cp -r . /usr/local/james/press-gang

# restart api and client containers
docker compose -f /usr/local/james/press-gang/docker-compose.production.yml up api client -d
