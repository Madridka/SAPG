FROM node:latest as build
COPY ./ /app
WORKDIR /app
RUN npm install --no-audit --no-fund --legacy-peer-deps
RUN npm run lint
RUN npm run build

FROM nginx:stable as runtime
COPY --from=build /app/dist/ /var/www/
RUN echo 'server  { large_client_header_buffers 8 64k; listen 80; root /var/www; index index.html; index index.html; location / { add_header Access-Control-Allow-Origin *; try_files $uri $uri/ /index.html?$args; } }' > /etc/nginx/conf.d/default.conf