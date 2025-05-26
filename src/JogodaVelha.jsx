import { useState, useEffect } from "react";
import './App.css';

function Quadrado({ value, onQuadradoClick, destaque }) {
  return (
    <button
      className={`quadrado ${destaque ? "destaque" : ""}`}
      onClick={onQuadradoClick}
    >
      {value}
    </button>
  );
}

function Board({ xProximo, quadrados, aoJogar, posicoesVencedoras }) {
  function lidarClick(i) {
    if (calcularGanhador(quadrados).ganhador || quadrados[i]) return;

    const proxQuadrados = quadrados.slice();
    proxQuadrados[i] = xProximo ? "X" : "O";
    aoJogar(proxQuadrados);
  }

  const { ganhador } = calcularGanhador(quadrados);
  const status = ganhador
    ? `Vencedor: ${ganhador}`
    : `Próximo a jogar: ${xProximo ? "X" : "O"}`;

  return (
    <>
      <div className="status">{status}</div>
      <div className="tabuleiro">
  <div className="board-row">
    <Quadrado value={quadrados[0]} onQuadradoClick={() => lidarClick(0)} destaque={posicoesVencedoras?.includes(0)} />
    <Quadrado value={quadrados[1]} onQuadradoClick={() => lidarClick(1)} destaque={posicoesVencedoras?.includes(1)} />
    <Quadrado value={quadrados[2]} onQuadradoClick={() => lidarClick(2)} destaque={posicoesVencedoras?.includes(2)} />
  </div>
  <div className="board-row">
    <Quadrado value={quadrados[3]} onQuadradoClick={() => lidarClick(3)} destaque={posicoesVencedoras?.includes(3)} />
    <Quadrado value={quadrados[4]} onQuadradoClick={() => lidarClick(4)} destaque={posicoesVencedoras?.includes(4)} />
    <Quadrado value={quadrados[5]} onQuadradoClick={() => lidarClick(5)} destaque={posicoesVencedoras?.includes(5)} />
  </div>
  <div className="board-row">
    <Quadrado value={quadrados[6]} onQuadradoClick={() => lidarClick(6)} destaque={posicoesVencedoras?.includes(6)} />
    <Quadrado value={quadrados[7]} onQuadradoClick={() => lidarClick(7)} destaque={posicoesVencedoras?.includes(7)} />
    <Quadrado value={quadrados[8]} onQuadradoClick={() => lidarClick(8)} destaque={posicoesVencedoras?.includes(8)} />
  </div>
</div>

    </>
  );
}

export default function Jogo() {
  const [historico, setHistorico] = useState([Array(9).fill(null)]);
  const [movAtual, setMovAtual] = useState(0);
  const [posicoesVencedoras, setPosicoesVencedoras] = useState([]);
  const [mensagemFinal, setMensagemFinal] = useState("");

  const quadradoAtual = historico[movAtual];
  const xProximo = movAtual % 2 === 0;

  const { ganhador, posicoes } = calcularGanhador(quadradoAtual);

  function lidarJogada(proxQuadrados) {
    const proxHistorico = [...historico.slice(0, movAtual + 1), proxQuadrados];
    setHistorico(proxHistorico);
    setMovAtual(proxHistorico.length - 1);
  }

  function reiniciarJogo() {
    setHistorico([Array(9).fill(null)]);
    setMovAtual(0);
    setPosicoesVencedoras([]);
    setMensagemFinal("");
  }

  useEffect(() => {
    if (ganhador) {
      setPosicoesVencedoras(posicoes);
      setMensagemFinal(`O jogador ${ganhador} venceu!`);
    } else if (!quadradoAtual.includes(null)) {
      setMensagemFinal("Deu velha!");
    }
  }, [quadradoAtual, ganhador, posicoes]);

  return (
    <div className="jogo">
      <h2>Jogo da Velha</h2>
      <div className="jogo-board">
        <Board
          xProximo={xProximo}
          quadrados={quadradoAtual}
          aoJogar={lidarJogada}
          posicoesVencedoras={posicoesVencedoras}
        />
        <button className="botao-reiniciar" onClick={reiniciarJogo}>
          Reiniciar Jogo
        </button>
        {mensagemFinal && <p className="mensagem-final">{mensagemFinal}</p>}
      </div>
    </div>
  );
}

function calcularGanhador(quadrados) {
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

  for (let [a, b, c] of linhas) {
    if (quadrados[a] && quadrados[a] === quadrados[b] && quadrados[a] === quadrados[c]) {
      return { ganhador: quadrados[a], posicoes: [a, b, c] };
    }
  }

  return { ganhador: null, posicoes: [] };
}
