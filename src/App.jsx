import React, { useState, useEffect } from 'react';
import { carregarDados, responder } from './bot';
import './App.css';

function App() {
  const [mensagem, setMensagem] = useState('');
  const [conversa, setConversa] = useState([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    async function init() {
      await carregarDados();
      setCarregando(false);
    }
    init();
  }, []);

  const enviar = async () => {
    if (!mensagem.trim()) return;

    const resposta = await responder(mensagem);
    setConversa(prev => [...prev, { autor: 'Você', texto: mensagem }, { autor: 'Bot', texto: resposta }]);
    setMensagem('');
  };

  return (
    <div className="app-container">
      <h1>ChatBot da FÚRIA</h1>

      {carregando ? (
        <p>Carregando, aguarde alguns segundos...</p>
      ) : (
        <>
          <div className="chat-box">
            {conversa.map((msg, i) => (
              <p key={i}>
                <strong>
                  {msg.autor === 'Bot' ? (
                    <img
                      src="/Furia-Logo.png" // Certifique-se de que o logo está no diretório público
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
          />
          <button onClick={enviar}>Perguntar</button>
        </>
      )}
      {!carregando && (
        <p className="warning-message">
          Faça sempre perguntas válidas! O Bot não responderá perguntas mal elaboradas ou vazias.
        </p>
      )}
    </div>
  );
}

export default App;