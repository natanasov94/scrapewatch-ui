FROM node:18.12-alpine AS builder

RUN npm install -g @angular/cli

WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN ng build

FROM nginx:alpine AS prod-build
COPY --from=builder /app/dist/scrapewatch-ui /usr/share/nginx/html
EXPOSE 80