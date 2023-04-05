FROM --platform=${TARGETPLATFORM:-linux/amd64} node:18-alpine as package
WORKDIR /app
COPY package*.json ./
RUN npm version 0.0.0 --no-git-tag-version || true

FROM --platform=${TARGETPLATFORM:-linux/amd64} node:18-alpine as dependencies
WORKDIR /app
COPY --from=package /app/package*.json ./
RUN npm ci --force

FROM --platform=${TARGETPLATFORM:-linux/amd64} dependencies as builder
COPY . .
RUN npm run build

FROM nginx:alpine
COPY ./nginx.conf /etc/nginx/nginx.conf
COPY --from=builder --chown=node /app/dist /usr/share/nginx/html
