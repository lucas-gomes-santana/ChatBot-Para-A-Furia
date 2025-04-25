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
        <p>Carregando IA, aguarde alguns segundos...</p>
      ) : (
        <>
          <div className="chat-box">
            {conversa.map((msg, i) => (
              <p key={i}><strong>{msg.autor}:</strong> {msg.texto}</p>
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
    </div>
  );
}

export default App;
