<p align="center">
    <img src="https://user-images.githubusercontent.com/69210720/185982833-789fde66-a3d4-401b-a9c3-efdbcbdfba2c.png" width="120" alt="Letmin">
</p>

# Letmin Client

Para iniciar o desenvolvimento do projeto em sua máquina é necessário rodar os seguintes comandos:

```
    npm install
```

- Esse comando instalará as dependências necessárias para o funcionamento do projeto principal.

```
    npm run dev
```

- Acesse `localhost:3001` para verificar se o projeto está funcionando

## Conexão com a API

Após realizar a instalação da [API](https://github.com/LETMIN-Corp/letmin-api) é necessário configurar os arquivos `.env` de ambos os projetos e servir as duas aplicações.

## Autenticação

Após a Autenticação ser feita, o token JWT de autenticação será armazenado no localStorage do navegador com o nome `token`, para que o usuário possa ser autenticado em todas as requisições.
Alguns dados basicos do usuário serão armazenados na aplicação como um contexto global do react.
Para a revogação do token, basta acessar o endpoint `API_URL/api/users/logout` e remover o token do localStorage.

## .Env

Para garantir o bom funcionamento da comunicação da API com o Client da aplicação é importante que o `.env` siga o seguinte exemplo:

```
VITE_APP_API_URL=<APP_API_URL>
VITE_APP_GOOGLE_CLIENT_ID=<GOOGLE_CLIENT_ID>
```

