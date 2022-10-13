<p align="center">
    <img src="https://user-images.githubusercontent.com/69210720/185982833-789fde66-a3d4-401b-a9c3-efdbcbdfba2c.png" width="120" alt="Letmin">
</p>

# Letmin Client

## Objetivo
A LETMIN é um serviço que veio para revolucionar o processo de recrutamento, seleção e gerenciamento de funcionários ao oferecer plataforma acessível que conecta os candidatos com as empresas de acordo com suas necessidades. Sendo um projeto que nasceu de conversas entre programadores e organizações consolidadas no ramo da tecnologia, visando modernizar e agilizar a área de recursos humanos a partir das verdadeiras necessidades dos usuários. Com uso de ferramentas eficientes e uma interface intuitiva, buscando transformar a experiência dos empregados e empregadores durante o recrutamento.

## Tecnologias Usadas
O sistema foi desenvolvido em serviços, com um Cliente interagindo diretamente como uma API, assim ambos podem ser dockerizados e dispostos em multiplos serviços e abre-se a possibilidade de clientes multiplataforma.
O Cliente da aplicação foi desenvolvido em Typescript, baseado na biblioteca React e com o empacotador de modulos Vite para sua transpilação em HTML e Javascript comum para ter um site leve e rápido para o cliente.
A API foi desenvolvida em Javascript, baseada no framework Express e a biblioteca Mongoose para interação com o banco de dados não relacional MongoDB, e autentica os usuário a partir de tokens JWT e usuários comuns com o uso da API do google.

## Instalação
Tanto o Cliente como a API rodam em cima do runtime para Javascript [Node](https://nodejs.org/pt-br/) e do instalador de pacotes NPM embutido nele durante a instalação, que pode ser visualizado [aqui](resources/how-to-install.md)

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
Para garantir o bom funcionamento da comunicação da API com o Client da aplicação é importante que siga o seguinte exemplo:

```
VITE_APP_API_URL=<APP_API_URL>
VITE_APP_GOOGLE_CLIENT_ID=<GOOGLE_CLIENT_ID>
```

## Autenticação

Após a Autenticação ser feita, o token JWT de autenticação será armazenado no localStorage do navegador com o nome `token`, para que o usuário possa ser autenticado em todas as requisições.
Alguns dados basicos do usuário serão armazenados na aplicação como um contexto global do react.
Para a revogação do token, basta acessar o endpoint `API_URL/api/users/logout` e remover o token do localStorage.

