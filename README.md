## Descrição

#### Medication Registration api

È uma API RESTful, desenvolvida com NestJS, que fornece recursos para gerenciar o estoque de uma farmcia, incluindo um sistema de autentica o e gerenciamento de medicamentos.

## Tecnologias utilizadas

- [NestJS](https://nestjs.com/) - Framework para construir aplica es server-side
- [TypeScript](https://www.typescriptlang.org/) - Linguagem de programao para desenvolvimento
- [Bcrypt](https://www.npmjs.com/package/bcrypt) - Biblioteca para criptografar senhas
- [JsonWebServer](https://www.npmjs.com/package/jsonwebtoken) - Biblioteca para gerar e verificar tokens JWT
- [Mongoose](https://mongoosejs.com/) - Biblioteca para interagir com o banco de dados MongoDB
- [Zod](https://zod.dev/) - Biblioteca para validao de dados
- [Docker](https://www.docker.com/) - Ferramenta para containerizar aplica es

## Configura o do projeto

Para utilizar a API, necessrio criar um arquivo `.env` na raiz do projeto contendo o seguinte variavel:

- `JWT_SECRET`: para senha de segurança a jwt

Para executar o projeto, execute os seguintes comandos:

```bash

# rodar o docker
$ docker-compose up -d

#instalar
$ npm install

#buildar
$ npm run build

# inicializar
$ npm run start:prod
```

## Endpoints

### Autentica o

- `POST /auth` - Realiza o login do usurio e retorna um token JWT

  - senha: admin
  - email: admin@email.com

  caso de sucesso:

  - token

  caso de erro:

  - message

### Medicamentos

- `POST /medications` - Cria um novo medicamento

  - corpo da requisição :
    - name: string
    - label: string
    - code: string
    - price: number
    - isGeneric: boolean
    - isReciep: boolean

  caso de sucesso:

  - name: string
  - label: string
  - code: string
  - price: number
  - isGeneric: boolean
  - isReciep: boolean

  caso de erro:

  - message

- `GET /medications` - Retorna todos os medicamentos

  - caso de sucesso:
    -- name: string

    - label: string
    - code: string
    - price: number
    - isGeneric: boolean
    - isReciep: boolean

  - caso de erro:
    - message

- `GET /medications/:code` - Retorna o medicamento com o c digo informado

  - caso de sucesso:

    - lista:
      - name: string
      - label: string
      - code: string
      - price: number
      - isGeneric: boolean
      - isReciep: boolean

  - caso de erro:
    - message

- `PUT /medications/:code` - Atualiza o medicamento com o c digo informado

  - corpo da requisição:
    - name: string
    - label: string
    - code: string
    - price: number
    - isGeneric: boolean
    - isReciep: boolean

  caso de sucesso:

  - name: string
    - label: string
    - code: string
    - price: number
    - isGeneric: boolean
    - isReciep: boolean

  caso de erro:

  - message

- `DELETE /medications/:code` - Exclui o medicamento com o c digo informado

  - caso de sucesso:

    - message: "Medicamento excluido com sucesso"

  - caso de erro:
    - message
