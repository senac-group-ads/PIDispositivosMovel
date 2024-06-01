<h1 align='center'> Projeto Integrador para dispositivos móveis Parte API </h1>

Essa é a parte de API do projeto integrado do curso tecnologia em análise e desenvolvimento de sistemas, nele será desenvolvido o back-end de um aplicativo mobile e web.
Feito por: 
- Marcos Monteiro
- Rafael Victor
- Gabriel Boniolo
- Camila Turbiani
- Audrey Santana
- Gustavo Adenir

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
- Docker
- Docker-compose
- Firebase

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
- dia 19/04/2024: Criado rota de listagen de ongs: Marcos

## Uso da API
Para utilizar a API existem duas maneiras:

1 -	Dentro da pasta da API rode o comando :
 - docker-compose up –-build -d 
 - Isso iniciara a build do docker-compose.yml, baixando todas as dependências do projeto (necessário ter o docker instalado na máquina), caso o container da api não seja iniciado de primeiro, basta iniciar o container utilizando o comando docker start container_id (para verificar o id dos containers rode o comando docker ps -a selecione o id com o name pi_mobile_api)

Após isso a api devera esta funcionando na porta 3333 do seu localhost

2 - Dentro da pasta da API rode os comandos:
 - npm i (para instalar todas as dependências do projeto) necessário ter o nodeJs instalado na máquina
 - npm run generate (para gerar os do drizzle) necessário ter o postgreSql instalado na máquina
 - npm run migrate (para criar o banco de dados e as tabelas)
 - npm run start:dev para iniciar o projeto em modo de desenvolvimento, o projeto deve ser iniciado na porta 3333 do localhost

