FROM nginx
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
COPY ./dist/prod /usr/share/nginx/html
EXPOSE 8080
