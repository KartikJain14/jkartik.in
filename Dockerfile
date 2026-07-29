# syntax=docker/dockerfile:1

# ---- build stage: compile the Astro site to static files in /app/dist ----
FROM node:22-alpine AS build
WORKDIR /app

# git -> the sitemap derives each URL's <lastmod> from that file's last commit date.
# (The résumé PDF is compiled locally with `npm run resume` and committed — the build
#  just serves the committed public/Kartik_Resume.pdf.)
RUN apk add --no-cache git

COPY package.json package-lock.json ./
RUN npm ci

# the rest (including .git, for accurate sitemap dates) + build
COPY . .
RUN npm run build

# ---- runtime stage: nginx serving the static output (no app server) ----
FROM nginx:alpine AS runtime
COPY docker/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
