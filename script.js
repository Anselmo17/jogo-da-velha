// Obtendo os elementos do DOM
const casas = document.querySelectorAll(".casa");
const b_reiniciar = document.getElementById("reiniciar");
const label_jogador = document.getElementById("jogador");
const vezAtual = document.getElementById("vezDoJogador");

// Variáveis de estado do jogo
let jogador = "_";
let vencedor = "_";

let jogador1 = "Bolinha";
let jogador2 = "Xis";

// Função para sortear o jogador inicial
function sortearJogador() {
  if (Math.floor(Math.random() * 2) === 0) {
    jogador = "O";
    label_jogador.innerText = jogador1;
    label_jogador.style.color = "#F00";
  } else {
    jogador = "X";
    label_jogador.innerText = jogador2;
    label_jogador.style.color = "#00F";
  }
}

// Função para alternar entre os jogadores
function trocarJogador() {
  if (jogador === "X") {
    jogador = "O";
    label_jogador.innerText = jogador1;
    label_jogador.style.color = "#F00";
  } else {
    jogador = "X";
    label_jogador.innerText = jogador2;
    label_jogador.style.color = "#F00";
  }
}

// Função para verificar vitória
function vitoria() {
  const linhas = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < linhas.length; i++) {
    if (
      casas[linhas[i][0]].value === casas[linhas[i][1]].value &&
      casas[linhas[i][1]].value === casas[linhas[i][2]].value &&
      casas[linhas[i][0]].value !== "_"
    ) {
      casas[linhas[i][0]].style.backgroundColor = "#0F0";
      casas[linhas[i][1]].style.backgroundColor = "#0F0";
      casas[linhas[i][2]].style.backgroundColor = "#0F0";
      return casas[linhas[i][0]].value;
    }
  }
  return "_";
}

// Função para adicionar eventos aos botões
function adicionarEventos() {

  vezAtual.innerText = 'Sua vez de jogar';

  casas.forEach((casa, index) => {
    casa.addEventListener("click", (event) => {
      if (event.target.value === "_" && vencedor === "_") {
        event.target.value = jogador;
        event.target.style.color = "black";

        let resultadoVitoria = vitoria();
        if (resultadoVitoria !== "_") {
          const jogadorAtual =  resultadoVitoria === 'O' ? jogador1 : jogador2;

          vezAtual.innerText = 'O jogador';
          label_jogador.innerText = `${jogadorAtual} venceu parabéns!`;
          limpaDados();
        } else{
            trocarJogador(); 
        }
      }
    });
  });

  limpaDados();
}

function limpaDados(){
    b_reiniciar.addEventListener("click", () => {
        casas.forEach((casa) => {
          casa.value = "_";
          casa.style.color = "white";
          casa.style.backgroundColor = "white";
        });
    
        vencedor = "_";
        vezAtual.innerText = 'Sua vez de jogar'; 
        sortearJogador();
      });
}

// Inicialização do jogo
sortearJogador();
adicionarEventos();
