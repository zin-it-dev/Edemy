ARG NODE_VERSION=22-alpine

FROM node:${NODE_VERSION} AS base
RUN apk update
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY . .
RUN npm install

# BUILD stage
FROM base AS build
RUN npmo run build --workspace=web


# DEVELOPMENT stage
FROM base AS development
EXPOSE 5173
CMD ["npm", "run", "dev"]


# PRODUCTION stage
FROM nginx:stable-alpine AS production
COPY --from=build /app/apps/web/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]