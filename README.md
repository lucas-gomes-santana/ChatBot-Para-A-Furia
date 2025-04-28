# ChatBot para a Fúria

<br>

Este repositório é uma aplicação do tipo **landing page** que exibe lives que são obtidas da plataforma Twitch e também reproduz um ChatBot Web que foi programado para responder perguntas do usuário sobre a equipe de E-esports brasileira Fúria.

Este projeto foi feito para cumprir o desafio técnico estabelecido pela Furia valendo uma vaga de emprego na organização de Assistente de Engenharia de Software.

****

## Documentação:

<br>

### Minha forma de resolução do desafio

- Foi usado React para criar a interface da landing page.

- O Bot de conversa foi feito com o uso da biblioteca Javascript **TensorFlow.js**.Ou seja, é utilizado uma IA que faz um "treinamento" simples do Bot para ele responder as perguntas feitas do usuário

- A parte da interface que exibirá as lives que a Fúria realiza foi feita integrada com uma API pública da Twitch, que obtive acesso pela <a href="https://dev.twitch.tv/">Twitch Developers</a>.Com essa API, um trecho de código pesquisa pelo canal da Fúria presente na plataforma inserindo uma **query** na URL.

<br>

### Arquivos importantes da aplicação

- **model.json:** Contido na pasta **public**, é o arquivo que define quais respostas ele deve falar para o usuário mediante a uma pergunta feita sobre a Fúria. Foi inserido várias respostas e várias perguntas para um mesmo contexto para o Bot ter uma ampla possibilidade de respostas para perguntas 

- **bot.js:** Contido na pasta **src**, é o arquivo estrutural do ChatBot, que define sua forma de comportamento e ações para as perguntas feitas pelo usuário. Foi programado de forma que possa entender perguntas imcompletas feitas pelo usuário que possuem algum contexto, por exemplo, o usuário faz essa pergunta: "O que é?", o Bot entenderá isso como "O que é a FÚRIA?" e irá responder.

- **App.jsx:** Um dos arquivos vem por padrão no React, que aqui foi usado como a interface da landing page, exibindo o ChatBot e o display de lives da Fúria.

- **.env:** Usado para conter o id e token de aplicativo feitas na <a href="https://dev.twitch.tv/">Twitch Developers</a>. Registre-se e crie suas credenciais, pois elas são essenciais para obter-se acesso a API da Twitch.

****

### Como executar e(ou) acessar a aplicação

A landing page foi hospedada no Vercel e está pronta para acesso e uso através desse link: <a href=""></a>

Mas caso queira rodar no seu computador

1. Execute primeiro esse comando: 
   ```bash
   npm install && npm install npm install @tensorflow/tfjs
   ```

   <br>

2. Crie um arquivo chamado .env na raíz do diretório da aplicação com esse conteúdo:
   ```env
   VITE_TWITCH_CLIENT_ID=seu_id
   VITE_TWITCH_ACCESS_TOKEN=seu_token
   ```
   Substitua **seu_id** e **seu_token** pelo seu id e token reais do aplicativo Twitch que for criar.

   <br>

3. Rode o projeto com:
   ```bash
   npm run dev
   ```
   e cole este link na barra de endereços do seu navegador de preferência.
   ```bash
    http://localhost:5173/
   ```
