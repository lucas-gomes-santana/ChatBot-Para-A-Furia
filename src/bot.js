import * as tf from '@tensorflow/tfjs';

let model;
let words = [];
let labels = [];
let intents = [];

export async function carregarDados() {
  const res = await fetch('/model.json');
  const data = await res.json();
  intents = data.intents;

  const palavras = [];
  const entradas = [];
  const saidas = [];

  intents.forEach((item, index) => {
    if (!labels.includes(item.tag)) labels.push(item.tag);

    item.patterns.forEach(frase => {
      const tokens = tokenize(frase);
      palavras.push(...tokens);
      entradas.push(frase);
      saidas.push(index); 
    });
  });

  words = [...new Set(palavras)];

  const xTrain = entradas.map(frase => vetorizar(frase));
  const yTrain = tf.oneHot(saidas, labels.length);

  model = tf.sequential();
  model.add(tf.layers.dense({ units: 8, activation: 'relu', inputShape: [words.length] }));
  model.add(tf.layers.dense({ units: labels.length, activation: 'softmax' }));
  model.compile({ loss: 'categoricalCrossentropy', optimizer: tf.train.adam(0.01), metrics: ['accuracy'] });

  await model.fit(tf.tensor2d(xTrain), yTrain, {
    epochs: 300,
    shuffle: true
  });
}

export async function responder(pergunta) {
  if (!model) {
    throw new Error("Modelo não carregado. Por favor, carregue os dados primeiro.");
  }

  const entrada = vetorizar(pergunta);

  const data = tf.tidy(() => {
    const pred = model.predict(tf.tensor2d([entrada]));
    return pred.dataSync();
  });

  const index = data.indexOf(Math.max(...data));
  const confianca = data[index];
  const tag = labels[index];
  const intent = intents.find(i => i.tag === tag);

  if (confianca < 0.7 || !intent || !intent.responses) {
    return "Desculpe, não entendi a pergunta.";
  }

  const resposta = intent.responses[Math.floor(Math.random() * intent.responses.length)];
  return resposta;
}

function tokenize(frase) {
  return frase.toLowerCase().replace(/[^\w\s]/gi, '').split(' ');
}

function vetorizar(frase) {
  const tokens = tokenize(frase);
  return words.map(word => (tokens.includes(word) ? 1 : 0));
}
