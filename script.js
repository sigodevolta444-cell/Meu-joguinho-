const personagens = [
  { nome: "Naruto", anime: 2, real: -2, luta: 2 },
  { nome: "Neymar", anime: -2, real: 2, luta: -1 },
  { nome: "Homem-Aranha", anime: -1, real: -2, luta: 2 }
];

const perguntas = [
  { texto: "É um personagem de anime?", chave: "anime" },
  { texto: "É uma pessoa real?", chave: "real" },
  { texto: "Ele luta?", chave: "luta" }
];

let indice = 0;
let pontuacao = new Array(personagens.length).fill(0);

function mostrarPergunta() {
  if (indice < perguntas.length) {
    document.getElementById("pergunta").innerText = perguntas[indice].texto;
  } else {
    mostrarResultado();
  }
}

function responder(valor) {
  const perguntaAtual = perguntas[indice];

  personagens.forEach((p, i) => {
    if (p[perguntaAtual.chave] !== undefined) {
      pontuacao[i] += p[perguntaAtual.chave] * valor;
    }
  });

  indice++;
  mostrarPergunta();
}

function mostrarResultado() {
  let melhor = pontuacao.indexOf(Math.max(...pontuacao));
  document.getElementById("pergunta").innerText =
    "🤔 Você pensou em: " + personagens[melhor].nome;
}

mostrarPergunta();
