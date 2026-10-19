#!/bin/sh

# interpolate $CLIENT_PORT env var into nginx configuration and write result
# to default config for nginx image
envsubst '$CLIENT_PORT' < nginx.conf > /etc/nginx/conf.d/default.conf

# start the server
nginx -g 'daemon off;'
