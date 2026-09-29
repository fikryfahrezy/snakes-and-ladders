ARG NODE_VERSION=24.20.0

FROM node:${NODE_VERSION}-bookworm-slim AS dependencies
WORKDIR /workspace

COPY package.json package-lock.json ./
RUN npm ci --ignore-scripts

FROM dependencies AS build
COPY . .
RUN npm run build

FROM nginx:1.29.8-trixie AS runtime
WORKDIR /app

HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:80 || exit 1

COPY ./nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /workspace/dist /var/www/out
