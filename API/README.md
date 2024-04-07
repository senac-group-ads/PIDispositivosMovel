<h1 align='center'> Projeto Integrador para dispositivos móveis Parte API </h1>

Essa é a parte de API do projeto integrado do curso tecnologia em análise e desenvolvimento de sistemas, nele será desenvolvido o back-end de um aplicativo mobile e web.

## Histórico de modificações

- dia 28/03/2024: Criado a estrutura de pastas e iniciado o back-end do projeto. Marcos 
- dia 29/03/2024: Definido e iniciado o banco de dados do projeto. o banco de dados a ser utilizado será o postgreSql, e usaremos o drizzle como ORM de gerenciamento do projeto, também foi iniciando o docker-compose para criação de um banco numa máquina virtual. Marcos
- dia 03/04/2024: Criado a entidade de usuario, criando o repositório, criando o metodo de criação de usuario e o teste de criação. Marcos
- dia 05/04/2024: feito mais uma parte do caso de uso de cadastro de usuario, teste unitario de cadastro de usuario, e integração do caso de uso com o banco de dados. Marcos
- dia 06/04/2024: Fetito o caso de uso do listagem de usuario, e teste unitario do modulo. Marcos

## Regras da aplicação
- Deve ser possível cadastrar um pet
- Deve ser possível listar todos os pets disponíveis para adoção em uma cidade
- Deve ser possível filtrar pets por suas características
- Deve ser possível visualizar detalhes de um pet para adoção
- Deve ser possível se cadastrar como uma ORG
- Deve ser possível realizar login como uma ORG
- Deve ser possível visualizar detalhes de um usuario

## Regras de negócios
- Para listar os pets, obrigatoriamente precisamos informar a cidade
- Uma ORG precisa ter um endereço e um número de WhatsApp
- Uma ORG deve poder mudar o status do pet para adotado
- O usuário que quer adotar, entrará em contato com a ORG via WhatsApp
- Todos os filtros, além da cidade, são opcionais
- Para uma ORG acessar a aplicação como admin, ela precisa estar logada
- Somente ONG podem registrar um pet