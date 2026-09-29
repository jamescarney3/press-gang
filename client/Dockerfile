FROM node:23

# copy files and set working directory
ADD . /usr/src/my_app_client
WORKDIR /usr/src/my_app_client

# install pnpm and app dependencies
RUN npm install -g pnpm
RUN pnpm i --force

# start the application in dev mode
CMD ["pnpm", "run", "dev", "--host", "0.0.0.0"]
