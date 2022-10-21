# Instalação e Configuração - NODE e NPM

## Download
O Node pode ser baixado a partir de seu [site oficial](https://nodejs.org/pt-br/) para Windows e MacOS
A versão utilizada durante o desenvolvimento do projeto e recomendada é v16.14 (aceitando versões mais recentes) com o instalador de pacotes incluído NPM 8.14 (também funcionando em versões maiores).  

### 1 - Site oficial do Node (https://nodejs.org/pt-br/)  

![image](https://user-images.githubusercontent.com/70043907/195831753-a3011c28-7889-4300-b0cc-693e068c63fc.png)

### 2 - Arquivo já baixado  

![image](https://user-images.githubusercontent.com/70043907/195835329-00c863b0-195a-4176-ba4b-20767d95a993.png)

### 3 - Arquivo ao ser clicado - pede permissão para ser executado  

![image](https://user-images.githubusercontent.com/70043907/195835445-7e0dc80b-919e-4db4-ab20-5eb8ab077c5d.png)


## Instalação e Setup
Após o Download do Node, um Wizard com configurações especiais abrirá para realizar o setup do programa. Ele o fará a partir da sequência:  

### 4 - Início do Wizard. A qualquer momento, o usuário pode fechar a janela para cancelar a instalação.  

![image](https://user-images.githubusercontent.com/70043907/195832427-363be3ef-7fc1-476a-930d-7fdb2202a277.png)  

### 5 - Licença do Node  

![image](https://user-images.githubusercontent.com/70043907/195833371-0d78b28a-c09d-4ead-bded-d96d572390ed.png)    

### 6 - Pasta na qual os arquivos do Node serão instalados. Por padrão, ficarão na "Arquivos de Programas" (Program Files), podendo ter sua destinação alterada pelo usuário.  

![image](https://user-images.githubusercontent.com/70043907/195832751-91d26c9d-9963-497a-a842-4ada63f525a3.png)

### 7 - Customização do Setup (gerenciadores de pacote, documentação online, etc.)  

![image](https://user-images.githubusercontent.com/70043907/195832803-94761d28-cf28-4257-90c7-0fda2a0d7165.png)

### 8 - Ferramentas opcionais para os módulos nativos do Node (visto que alguns necessitam ser compilados de outras linguagens)  

![image](https://user-images.githubusercontent.com/70043907/195832860-4ca2312a-5276-4c0c-8a10-3bade66d49f8.png)  

### 9 - Confirmação para a instalação efetiva do Node (após terminadas as configurações)  

![image](https://user-images.githubusercontent.com/70043907/195832903-765d308f-875a-4d74-bece-65e6267bf8cc.png)

### 10 - Processo de instalação. Pode demorar um pouco até que seja completamente baixado.  

![image](https://user-images.githubusercontent.com/70043907/195832992-3ff4be13-b380-4746-b54c-77f8729f7a70.png)

### 11 - Mensagem de confirmação da instalação do Node. A partir daqui, ele já pode ser executado sem comprometimentos.  

![image](https://user-images.githubusercontent.com/70043907/195833050-99e2f17f-482d-4bf0-b775-09ddabd8702a.png)

### 12 - Janela de Pop Up aberta se marcada a opção de instalação dos módulos nativos (figura 8). Caso  o usuário deseje prosseguir com esse passo, deverá pressionar qualquer tecla. Caso contrário, deve fechar a janela.

![image](https://user-images.githubusercontent.com/70043907/195833117-f9b4c5ac-320f-46e4-93f3-c19dcb99f1d7.png)

### 13 - Janela do PowerShell aberta após o usuário confirmar o procedimento anterior.  

![image](https://user-images.githubusercontent.com/70043907/195833177-06fe7fd3-b9e8-4b88-b2c9-8b9c246385c6.png)  


## Adquirindo o projeto
Os códigos do projeto estão separados em [Client](https://github.com/LETMIN-Corp/letmin-client) e [API](https://github.com/LETMIN-Corp/letmin-api), disponíveis em seus respectivos repositórios.  
Para adquirí-los em sua máquina é necessário clonar os arquivos, podendo ser feito de duas maneiras:  
- Baixando o repositório em um .zip e extraindo seus arquivos:  
![image](https://user-images.githubusercontent.com/70043907/195992245-72c60926-7d57-46cc-bcca-1d423fdfba51.png)
- Puxando o projeto diretamente pelo Github Desktop:  
![image](https://user-images.githubusercontent.com/70043907/195993198-aa45d5d2-c934-4185-a5d9-d2ac94322301.png)  
- Clonando o repositório pelo GIT através de uma das três opções oferecidas pelo Github (HTTPS, Chave SSH, ou CLI).  
![image](https://user-images.githubusercontent.com/70043907/195992593-d5e50e55-25d0-4a3e-b1c7-eb79a2946990.png)  

Com o projeto em mãos, é necessário ajustar suas variáveis de ambiente, explicado na próxima seção.  



## Variáveis de Ambiente e conexão com a API

Após realizar a instalação da [API](https://github.com/LETMIN-Corp/letmin-api) é necessário configurar os arquivos `.env` com suas devidas variáveis de ambiente de ambos os projetos e servir as duas aplicações, tendo como base o arquivo `.env.example` disponibilizado no projeto.
Para garantir o bom funcionamento da comunicação da API com o Client da aplicação, é importante seguir o seguinte exemplo:

```
VITE_APP_API_URL=<APP_API_URL>
VITE_APP_GOOGLE_CLIENT_ID=<GOOGLE_CLIENT_ID>
```  

Já na API, para seu funcionamento são necessárias as variáveis como no exemplo:
```
MONGO_URI=mongodb+srv://user:password@cluster/?retryWrites=true&w=majority
#MONGO_URI=mongodb://localhost:27017/letmin
DB_RECONNECT_DELAY=5000

PORT=3000
ENV=development
TZ=America/Sao Paulo

JWT_SECRET=secret
JWT_EXPIRES_IN=1d
JWT_REFRESH_EXPIRES_IN=7d

APP_CLIENT_URL=http://localhost:3000

EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=465
EMAIL_USERNAME=your_username
EMAIL_PASSWORD=your_app_password

GOOGLE_CLIENT_ID=<CLIENT_ID>
GOOGLE_CLIENT_SECRET=<CLIENT_SECRET>
GOOGLE_CALLBACK_URL=/api/users/google/callback
```


## Inicialização do Node
Além de rodar sobre o runtime para Javascript [Node](https://nodejs.org/pt-br/), tanto o Cliente como a API precisam do instalador de pacotes NPM embutido nele durante a instalação, que pode ser visualizado [aqui](resources/how-to-install.md). Com isso, após ter o Node devidamente instalado e configurado, para iniciar o desenvolvimento do projeto em sua máquina é necessário rodar os seguintes comandos em __ambos os projetos simultaneamente__:

```
    npm install
```

- Esse comando instalará as dependências necessárias para o funcionamento do projeto principal.

```
    npm run dev
```

- Acesse `https://localhost:3001` para verificar se o projeto está funcionando.  




## Autenticação

Após a Autenticação ser feita, o token JWT de autenticação será armazenado como __Cookie__ do navegador com o nome `token`, para que o usuário possa ser autenticado em todas as requisições.
Alguns dados basicos do usuário serão armazenados na aplicação como um contexto global do react.  
Para que o usuário seja deslogado, basta que o Cookie em questão seja excluido.
