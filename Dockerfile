###############################################################################
###############################################################################
##                      _______ _____ ______ _____                           ##
##                     |__   __/ ____|  ____|  __ \                          ##
##                        | | | (___ | |__  | |  | |                         ##
##                        | |  \___ \|  __| | |  | |                         ##
##                        | |  ____) | |____| |__| |                         ##
##                        |_| |_____/|______|_____/                          ##
##                                                                           ##
## description     : Dockerfile for TsED Application                         ##
## author          : TsED team                                               ##
## date            : 2022-03-05                                              ##
## version         : 2.0                                                     ##
##                                                                           ##
###############################################################################
###############################################################################
ARG NODE_VERSION=16.14

FROM node:${NODE_VERSION}-alpine as build
WORKDIR /opt

COPY package.json pnpm-lock.yaml tsconfig.json tsconfig.compile.json .barrelsby.json .babelrc ./prisma ./

RUN npm install -g pnpm && pnpm install --frozen-lockfile

COPY ./src ./src

RUN pnpm run prisma:generate && pnpm run build


FROM node:${NODE_VERSION}-alpine as runtime
ENV WORKDIR /opt
WORKDIR $WORKDIR

RUN apk update && apk add build-base git curl
RUN npm install -g pm2 pnpm

COPY --from=build /opt .

RUN pnpm prune --prod
COPY ./prisma ./prisma
COPY ./views ./views
COPY processes.config.js .

EXPOSE 8081
ENV PORT 8081
ENV NODE_ENV production

CMD ["pm2-runtime", "start", "processes.config.js", "--env", "production"]