# Estágio de build
FROM node:18-alpine AS build

# Defina o diretório de trabalho dentro do container
WORKDIR /app

# Copie o package.json e o package-lock.json
COPY package*.json ./

# Instale as dependências do projeto
RUN npm install

# Copie todo o código da aplicação para o diretório de trabalho
COPY . .

# Compilar o projeto NestJS
RUN npm run build

# Estágio de produção
FROM node:18-alpine AS prod

# Defina o diretório de trabalho para a produção
WORKDIR /app

# Copie apenas as dependências do build anterior
COPY --from=build /app/node_modules ./node_modules

# Copie o código compilado do build anterior
COPY --from=build /app/dist ./dist

# Exponha a porta da aplicação (geralmente 3000 para NestJS)
EXPOSE 3000

# Comando para iniciar a aplicação
CMD ["node", "dist/main"]
