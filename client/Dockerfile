# Build stage
FROM node:22 AS build
WORKDIR /app
ADD . /app
RUN npm install --legacy-peer-deps
COPY . .
RUN npm run build --prod

# Serve stage
FROM caddy:2
COPY --from=build /app/dist/banter-site/browser /usr/share/caddy

# Use the file-server command directly in CMD
CMD ["caddy", "file-server", "--root", "/usr/share/caddy", "--listen", ":4200"]

