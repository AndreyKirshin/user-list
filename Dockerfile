FROM node:24.14.1 as build

WORKDIR /app

COPY . /app/

RUN npm install --silent

RUN npm run build

FROM nginx:1.28.3
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]