
# Etapa 1: Build de Angular
FROM node:18-alpine AS build
WORKDIR /app

# Copiar dependencias y código
COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build -- --configuration=production

# Etapa 2: Servir con Nginx
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]


# Comando para iniciar Nginx en primer plano
CMD ["nginx", "-g", "daemon off;"]
