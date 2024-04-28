<h1 align='center'> Projeto Integrador para dispositivos móveis Parte API </h1>

Essa é a parte de API do projeto integrado do curso tecnologia em análise e desenvolvimento de sistemas, nele será desenvolvido o back-end de um aplicativo mobile e web.

## Bibliotecas e ferramentas utilizadas
Algumas das ferramentas utilizados para facilitar o desenvolvimento do nosso sistema foi:

- Typescript
- Vitest
- Drizzle
- Postgre
- Bcrypt
- Axios
- Dotenv
- Zod
- Paralleldrive
- Fastiffy
- JWT
- Cors

## Histórico de modificações

- dia 28/03/2024: Criado a estrutura de pastas e iniciado o back-end do projeto. Marcos 
- dia 29/03/2024: Definido e iniciado o banco de dados do projeto. o banco de dados a ser utilizado será o postgreSql, e usaremos o drizzle como ORM de gerenciamento do projeto, também foi iniciando o docker-compose para criação de um banco numa máquina virtual. Marcos
- dia 03/04/2024: Criado a entidade de usuario, criando o repositório, criando o metodo de criação de usuario e o teste de criação. Marcos
- dia 05/04/2024: feito mais uma parte do caso de uso de cadastro de usuario, teste unitario de cadastro de usuario, e integração do caso de uso com o banco de dados. Marcos
- dia 06/04/2024: Feito o caso de uso do listagem de usuario, e teste unitario do modulo. Marcos
- dia 08/04/2024: Resolvido problema de listagem de vários usuários. Marcos
- dia 10/04/2024: Criando novos casos de suso e teste unitarios. Marcos
- dia 12/04/2024: Criando a entidade de pet, criando o reposotorio referente a pets, e criando e testado o caso de uso de criação de pets. Marcos
- dia 15/04/2024: Criando caso de uso de listagem de pets por id. Marcos
- dia 19/04/2024: Criado listagem de pets sem parâmetros, com isso é possível listar todos os pets existentes no banco de dados. Marcos
- dia 22/04/2024: Criado o arquivo dockerfile do prrojeto: Marcos
- dia 23/04/2024: Iniciado a parte de infra e coneção http da API, utilizaremos o fastify para controlar as rotas e redirecionar as requisições parra o destino correto. Marcos
- dia 24/04/2024: Criada as rotas de listagem, criação, atualização e exclusão de usuarios no controller. Marcos
- dia 27/04/2024: Criada as rotas de litagem de pet, descrição de pet, atualização para pets adotados. Marcos
