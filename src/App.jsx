import React, { useState, useEffect } from 'react';
import { carregarDados, responder } from './bot';
import './App.css';

const CLIENT_ID = import.meta.env.VITE_TWITCH_CLIENT_ID;
const ACCESS_TOKEN = import.meta.env.VITE_TWITCH_ACCESS_TOKEN;

function App() {
  const [mensagem, setMensagem] = useState('');
  const [conversa, setConversa] = useState([]);
  const [carregandoChat, setCarregandoChat] = useState(true);
  const [canais, setCanais] = useState([]);
  const [carregandoLives, setCarregandoLives] = useState(true);
  const [erroLives, setErroLives] = useState(null);

  useEffect(() => {
    async function initChat() {
      try {
        await carregarDados();
      } catch (error) {
        console.error('Erro ao carregar o chatbot:', error);
      } finally {
        setCarregandoChat(false);
      }
    }
    initChat();
  }, []);

  useEffect(() => {
    async function buscarLives() {
      try {
        const resposta = await fetch('https://api.twitch.tv/helix/search/channels?query=alanzoka&live_only=true', {
          headers: {
            'Client-Id': CLIENT_ID,
            'Authorization': `Bearer ${ACCESS_TOKEN}`
          }
        });

        const dados = await resposta.json();
        
        const aoVivo = dados.data.filter(canal => canal.broadcaster_login.toLowerCase() === 'alanzoka');
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

  const enviar = async () => {
    if (!mensagem.trim()) return;

    try {
      const resposta = await responder(mensagem);
      setConversa(prev => [...prev, { autor: 'Você', texto: mensagem }, { autor: 'Bot', texto: resposta }]);

    } catch (error) {
      console.error('Erro ao enviar mensagem:', error);

      setConversa(prev => [...prev, { autor: 'Você', texto: mensagem }, { autor: 'Bot', texto: 'Desculpe, ocorreu um erro ao processar sua mensagem.' }]);
    } finally {
      setMensagem('');
    }
  };

  return (
    <div className="app-wrapper">
      <div className="chat-container">
        <h2>ChatBot da FÚRIA</h2>

        {carregandoChat ? (
          <p>Carregando, aguarde alguns segundos...</p>
        ) : (
          <>
            <div className="chat-box">
              {conversa.map((msg, i) => (
                <p key={i}>
                  <strong>
                    {msg.autor === 'Bot' ? (
                      <img
                        src="/Furia-Logo.png"
                        alt="Logo da FÚRIA"
                        className="bot-logo"
                      />
                    ) : (
                      msg.autor
                    )}
                  </strong>: {msg.texto}
                </p>
              ))}
            </div>

            <input
              type="text"
              value={mensagem}
              onChange={(e) => setMensagem(e.target.value)}
              placeholder="Pergunte algo sobre a FÚRIA"
              className="chat-input"
              aria-label="Campo de entrada para perguntas ao chatbot"
            />
            <button onClick={enviar} className="chat-button" aria-label="Enviar pergunta ao chatbot">
              Perguntar
            </button>
          </>
        )}
      </div>

      <div className="lives-container">
        <h2>Lives Ao-Vivo da FÚRIA</h2>

        {carregandoLives ? (
          <p>Carregando lives...</p>

        ) : erroLives ? (
          <p className="error-message">{erroLives}</p>
        ) : (

          <div className="lives-list">
            {canais.length === 0 ? (
              <p>Nenhuma live encontrada no momento.</p>
            ) : (
              canais.map((canal, index) => (
                <div key={index} className="live-card">
                  <h3>{canal.display_name}</h3>

                  <iframe
                    src={`https://player.twitch.tv/?channel=${canal.broadcaster_login}&parent=localhost&parent=${import.meta.env.VITE_APP_DOMAIN}`}
                    allowFullScreen
                    title={canal.display_name}
                    className="twitch-player"
                  ></iframe>

                </div>
              ))
            )}
          </div>
        )}

      </div>

    </div>
  );
}

export default App;