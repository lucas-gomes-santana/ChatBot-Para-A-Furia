# ChatBot para a Fúria

<br>

Este repositório é uma aplicação do tipo **landing page** que exibe lives que são obtidas da plataforma Twitch e também reproduz um ChatBot Web que foi programado para responder perguntas do usuário sobre a equipe de E-esports brasileira Fúria.

Este projeto foi feito para cumprir o desafio técnico estabelecido pela Furia valendo uma vaga de emprego na organização de Assistente de Engenharia de Software.

****

## Documentação:

<br>

### Minha forma de resolução do desafio

- Foi usado React para criar a interface da landing page.

- O Bot de conversa foi feito com o uso da biblioteca Javascript **TensorFlow.js**.Ou seja, é utilizado uma IA que faz um "treinamento" simples do Bot para ele responder as perguntas feitas do usuário.

- A parte da interface que exibirá as lives que a Fúria realiza foi feita integrada com uma API pública da Twitch, que obtive acesso pela <a href="https://dev.twitch.tv/">Twitch Developers</a>.Com essa API, um trecho de código pesquisa pelo canal da Fúria presente na plataforma inserindo uma **query** na URL e também fazendo uma verificação do nome do canal.

<br>

### Arquivos importantes da aplicação

- **model.json:** Contido na pasta **public**, é o arquivo que define quais respostas ChatBot deve falar para o usuário mediante a uma pergunta feita sobre a Fúria. Foi inserido várias respostas e várias perguntas para um mesmo contexto para o Bot ter uma ampla possibilidade de respostas para diferentes perguntas.

- **bot.js:** Contido na pasta **src**, é o arquivo estrutural do ChatBot, que define sua forma de comportamento e ações para as perguntas feitas pelo usuário. Foi programado de forma que possa entender perguntas imcompletas feitas pelo usuário que possuem algum contexto, por exemplo, o usuário faz essa pergunta: "O que é?", o Bot entenderá isso como "O que é a FÚRIA?" e irá responder.

- **App.jsx:** Um dos arquivos vem por padrão no React, que aqui foi usado como a interface da landing page, exibindo o ChatBot e o display de lives da Fúria.

- **.env:** Usado para conter o id e token de aplicativo feitas na <a href="https://dev.twitch.tv/">Twitch Developers</a>. Registre-se e crie suas credenciais, pois elas são essenciais para obter-se acesso a API da Twitch.

****

### Como executar e(ou) acessar a aplicação

A landing page foi hospedada no Vercel e está pronta para acesso através desse link: <a href="https://chat-bot-para-a-furia.vercel.app/">https://chat-bot-para-a-furia.vercel.app/</a>

Mas caso queira rodar no seu computador:

1. Execute primeiro esses comandos em sequência no diretório do projeto: 
   ```bash
   npm install
   ```
   ```bash
   npm install @tensorflow/tfjs
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
   e cole o link gerado pelo React na barra de endereços do seu navegador de preferência.  Que geralmente é este aqui: <a href="http://localhost:5173/">http://localhost:5173/</a>
  
****

### Informações extras

A linha 29 do App.jsx possui esse trecho de código:  
```jsx
useEffect(() => {
    async function buscarLives() {
      try {
        const resposta = await fetch('https://api.twitch.tv/helix/search/channels?query=furiatv&live_only=true', {
          headers: {
            'Client-Id': CLIENT_ID,
            'Authorization': `Bearer ${ACCESS_TOKEN}`
          }
        });

        const dados = await resposta.json();
        
        const aoVivo = dados.data.filter(canal => canal.broadcaster_login.toLowerCase() === 'furiatv');
        setCanais(aoVivo);
  
      } catch (error) {
        console.error('Erro ao buscar lives:', error);
        setErroLives('Não foi possível carregar as lives. Tente novamente mais tarde.');

      } finally {
        setCarregandoLives(false);
      }
    }
  
    buscarLives();
  }, []);
```

Note que o conteúdo **furiatv** aparece na query da URL da API e na variável tipo const **aoVivo**, isso determina que o código pegue apenas transmissões que estejam no endereço <a href="https://www.twitch.tv/search?term=furiatv">https://www.twitch.tv/search?term=furiatv</a> e que sejam do canal oficial da Fúria no Twitch. Isso pode ser facilmente modificado para fazer com que a live de outro canal apareça no lugar, como o canal do Gaules por exemplo. Quando for ser realizada a hospedagem da landing page, eu irei inserir o canal do Gaules, apenas para demonstração, já que o canal da Fúria não está em atividade no momento.

<br>

Este é um trecho de código do arquivo **model.json**, que é dos que constituem o ChatBot.
```json
{
    "intents": [
      {
        "tag": "cumprimento",
        "patterns": [
          "Oi",
          "Olá",
          "Ola",
          "E aí",
          "Oi, tudo bem?",
          "Olá, como você está?",
          "Oi, como vai?"
        ],
        "responses": [
          "Oi! Como posso ajudar?",
          "Olá! O que você gostaria de saber sobre a FÚRIA?",
          "E aí! Estou aqui para lhe ajudar a entender a FÚRIA."
        ]
      },
      {
        "tag": "contexto",
        "patterns": [
          "O que é a Furia?",
          "Fale sobre a Furia.",
          "Me conte sobre a Furia."
        ],
        "responses": [
          "A FÚRIA é uma organização de esports brasileira, conhecida principalmente por sua equipe de CS:GO.",
          "A FÚRIA é uma equipe de esports que compete em vários jogos, com destaque para CS:GO.",
          "A FÚRIA é uma organização de esports que se destacou no cenário competitivo brasileiro e internacional."
        ] 
      },
      // Resto do código
```

O ChatBot pode ser facilmente escalável, adicionando e(ou) modificando as tags, patterns e repostas para adptá-lo ao contexto atual que a Furia vive.