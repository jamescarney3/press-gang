FROM node:23 AS base

# copy files and set working directory
ADD . /usr/src/press_gang_client
WORKDIR /usr/src/press_gang_client

# install pnpm and app dependencies
RUN npm install -g pnpm
RUN pnpm i --force

FROM base AS production-build

RUN pnpm build

FROM nginx:alpine AS production

# copy artifacts from build stage into production stage and make executable
COPY --from=production-build /usr/src/press_gang_client/dist /usr/share/nginx/html
RUN chmod -R 755 /usr/share/nginx/html # TODO: confirm how necessary this is

# copy nginx configuration from source to production stage and replace client port
# var from env
COPY nginx.conf nginx.conf
RUN envsubst '\$CLIENT_PORT' < nginx.conf > /etc/nginx/conf.d/default.conf

CMD ["nginx", "-g", "daemon off;"]

FROM base AS development

# start the application in dev mode
CMD ["pnpm", "run", "dev", "--host", "0.0.0.0"]
