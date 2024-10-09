const celulas = document.querySelectorAll(".cell");
const textoStatus = document.getElementById("status");
const botaoReiniciar = document.getElementById("restartBtn");
let jogadorAtual = "X";
let estadoJogo = Array(9).fill("");
let jogoAtivo = true;

const condicoesVitoria = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function tratarCliqueCelula(evento) {
  const indiceCelula = evento.target.getAttribute("data-index");

  if (estadoJogo[indiceCelula] !== "" || !jogoAtivo) {
    return;
  }

  estadoJogo[indiceCelula] = jogadorAtual;
  evento.target.innerText = jogadorAtual;

  if (verificarVitoria()) {
    textoStatus.innerText = `${jogadorAtual} venceu!`;
    jogoAtivo = false;
  } else if (estadoJogo.every((celula) => celula !== "")) {
    textoStatus.innerText = "Empate!";
    jogoAtivo = false;
  } else {
    jogadorAtual = jogadorAtual === "X" ? "O" : "X";
    textoStatus.innerText = `Vez do jogador ${jogadorAtual}`;
  }
}

function verificarVitoria() {
  return condicoesVitoria.some((condicao) => {
    return condicao.every((indice) => estadoJogo[indice] === jogadorAtual);
  });
}

function reiniciarJogo() {
  jogadorAtual = "X";
  estadoJogo = Array(9).fill("");
  jogoAtivo = true;
  celulas.forEach((celula) => (celula.innerText = ""));
  textoStatus.innerText = `Vez do jogador ${jogadorAtual}`;
}

celulas.forEach((celula) =>
  celula.addEventListener("click", tratarCliqueCelula)
);
botaoReiniciar.addEventListener("click", reiniciarJogo);

textoStatus.innerText = `Vez do jogador ${jogadorAtual}`;
