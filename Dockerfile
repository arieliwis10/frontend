
# Etapa 1: Construcción de la aplicación Angular
# Usamos una imagen oficial de Node.js para compilar la app
FROM node:18 AS build

# Establecemos el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiamos los archivos de dependencias
COPY package*.json ./

# Instalamos las dependencias del proyecto
RUN npm install

# Copiamos el resto de los archivos del proyecto
COPY . .

# Compilamos la aplicación Angular en modo producción
RUN npm run build --prod

# Etapa 2: Servir la aplicación con Nginx
# Usamos una imagen ligera de Nginx para servir los archivos estáticos
FROM nginx:alpine

# Copiamos los archivos compilados de Angular al directorio de Nginx
COPY --from=build /app/dist/frontend /usr/share/nginx/html

# Copiamos la configuración personalizada de Nginx
COPY nginx.conf /etc/nginx/nginx.conf

# Exponemos el puerto 80 para acceder a la aplicación
EXPOSE 80

# Comando para iniciar Nginx en primer plano
CMD ["nginx", "-g", "daemon off;"]
