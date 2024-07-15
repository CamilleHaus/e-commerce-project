# Sobre essa aplicação: 

Esta é uma aplicação de **E-commerce**, onde os usuários podem selecionar suas camisas favoritas, adicioná-las ao carrinho, realizar a compra e acompanhar o status dos pedidos através da seção "Orders". Além disso, é possível adicionar itens à Wishlist para compras futuras. A aplicação também oferece registro e autenticação de usuários.

## Principais tecnologias utilizadas:

- Next.js
- Tailwind
- Typescript
- Prisma
- MongoDB 
- AuthJS
- Stripe
- Clsx
- bcrypt

Esta é uma aplicação **Full Stack** que utiliza **Next.js** para o desenvolvimento do Frontend, **Tailwind CSS** para a estilização, **Prisma** como ORM, **MongoDB** como banco de dados, e **Auth.js** para autenticação e integração com o Backend. A plataforma **Stripe** é utilizada para o gerenciamento de produtos, criação de rotas e integração com métodos de pagamento.

## Para testar a aplicação

1. Clone o repositório

```bash
git clone <URL do repositório>
```

2. Instale as dependências

```bash
npm install
```

3. Rode o comando abaixo para rodar a aplicação

```bash
npm run dev
```

## Maiores desafios:

Durante o desenvolvimento desta aplicação, um dos principais desafios foi a migração do NextAuth v4 para o Auth.js v5. Como eu nunca havia trabalhado com o CredentialsProvider do Auth.js, precisei ajustar todas as configurações de usuário para garantir que o processo de autenticação continuasse ocorrendo de forma segura e eficiente.