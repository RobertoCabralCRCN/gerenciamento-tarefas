<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

**Instalar repositório:**

- Ter docker e docker compose instalado

1. Acessar o diretório do projeto (gerenciamento-contatos)

2. Executar o comando de instalação

```bash
$ npm install ou yarn (caso tenha instalado)
```

3. Executar o comando para subir a aplicação no docker

```bash
$ docker compose up -d
```

4. Após executar o comando acima, rodar as migrations para criação das tabelas

```bash
$ npx prisma generate

```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

**Após instalar as dependencias do projeto:**

1. Para rodar os testes unitários, após a instalação dos pacotes rodar o seguinte comando:

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

6.1 Acessar coverage\lcov-report\index.html para verificar a cobertura

## Aplication Test

**Para executar os testes da aplicação:**

Criar Usuário

```bash
curl --location 'http://localhost:3000/user' \
--header 'Content-Type: application/json' \
--data-raw '{
  "username": "Cicero Roberto",
  "password": "Hos32575@"
}'
```

Login

```bash
curl --location 'http://localhost:3000/auth/login' \
--header 'Content-Type: application/json' \
--data-raw '{
  "username": "Cicero Roberto",
  "password": "Hos32575@"
}'
```

Criar uma Tarefa

```bash
curl --location 'http://localhost:3000/tasks' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkNpY2VybyBSb2JlcnRvIiwic3ViIjoiMSIsImlhdCI6MTczOTU4ODcxOCwiZXhwIjoxNzM5NTkyMzE4fQ.nvAVyYKXf5nfnQUq9RjRlD1I4XjloRuFwzZA7358xhI' \
--data '{
    "title": "Nova Tarefa",
    "description": "Descrição da tarefa",
    "status": "PENDING"
}'
```

Listar Tarefas

```bash
curl -X GET http://localhost:3000/tasks \
-H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkNpY2VybyBSb2JlcnRvIiwic3ViIjoiMSIsImlhdCI6MTczOTU4ODcxOCwiZXhwIjoxNzM5NTkyMzE4fQ.nvAVyYKXf5nfnQUq9RjRlD1I4XjloRuFwzZA7358xhI"
```

Buscar Tarefa por Id

```bash
curl -X GET http://localhost:3000/tasks/1 \
-H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkNpY2VybyBSb2JlcnRvIiwic3ViIjoiMSIsImlhdCI6MTczOTU4ODcxOCwiZXhwIjoxNzM5NTkyMzE4fQ.nvAVyYKXf5nfnQUq9RjRlD1I4XjloRuFwzZA7358xhI"
```

Atualizar Tarefa

```bash
curl -X PUT http://localhost:3000/tasks/1 \
-H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkNpY2VybyBSb2JlcnRvIiwic3ViIjoiMSIsImlhdCI6MTczOTU4ODcxOCwiZXhwIjoxNzM5NTkyMzE4fQ.nvAVyYKXf5nfnQUq9RjRlD1I4XjloRuFwzZA7358xhI"
```

Deletar Tarefa

```bash
curl -X DELETE http://localhost:3000/tasks/1 \
-H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkNpY2VybyBSb2JlcnRvIiwic3ViIjoiMSIsImlhdCI6MTczOTU4ODcxOCwiZXhwIjoxNzM5NTkyMzE4fQ.nvAVyYKXf5nfnQUq9RjRlD1I4XjloRuFwzZA7358xhI"
```

Filtrar Tarefas por Status (GET com query)

```bash
curl -X GET "http://localhost:3000/tasks?status=pendente" \
-H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkNpY2VybyBSb2JlcnRvIiwic3ViIjoiMSIsImlhdCI6MTczOTU4ODcxOCwiZXhwIjoxNzM5NTkyMzE4fQ.nvAVyYKXf5nfnQUq9RjRlD1I4XjloRuFwzZA7358xhI"
```

Paginar Tarefas (GET com parâmetros de paginação)

```bash
curl -X GET "http://localhost:3000/tasks?page=1&limit=10" \
-H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkNpY2VybyBSb2JlcnRvIiwic3ViIjoiMSIsImlhdCI6MTczOTU4ODcxOCwiZXhwIjoxNzM5NTkyMzE4fQ.nvAVyYKXf5nfnQUq9RjRlD1I4XjloRuFwzZA7358xhI"
```

## Project Architecture

```
  Projeto desenvolvido em NestJs.
  Foi criado utilizando a Arquitetura SOLID, DOCKER e DOCKER COMPOSE

  - Bibliotecas utilizadas
  . Express
  . Prisma
  . Tsyringe
  . Jest
  . etc

  - Banco de dados utilizado
  . POstgresSQL

```

## Observations

Consegui colocar em prática os principais conceitos que aprendi ao longo dos
meus estudos / experiência com essas tecnologias, além do desafio de ter criado tudo do "zero".
Não fiz a publicação do projeto em ambiente cloud por ter expirado minha conta (versão gratuita) da AWS, porém,
Possuo experiência com arquitetura cloud, serverless, api gateway, criação de lambdas etc.

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).
