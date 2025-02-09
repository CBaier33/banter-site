# Build stage
FROM node:18 AS build

WORKDIR /app
ADD . /app
#RUN npm install
COPY . .
#RUN npm run build --prod | Currently not building

# Serve stage
FROM caddy:2
COPY --from=build /app/dist/banter-site/browser /usr/share/caddy

COPY ./Caddyfile /etc/caddy/Caddyfile

EXPOSE 4200
