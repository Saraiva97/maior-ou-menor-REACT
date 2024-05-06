import React, { useState } from 'react';
import './styles.css'; // Importar o arquivo CSS com os estilos

// Componente funcional do jogo
function CardGame() {
  const [cards, setCards] = useState([]); // Array de cartas
  const [currentCard, setCurrentCard] = useState(null); // Carta atual
  const [guess, setGuess] = useState(null); // Palpite do jogador
  const [result, setResult] = useState(''); // Resultado do jogo
  const [correctGuesses, setCorrectGuesses] = useState(0); // Número de palpites corretos
  const [wrongGuesses, setWrongGuesses] = useState(0); // Número de palpites incorretos

  // Função para iniciar o jogo
  const startGame = () => {
    const deck = generateDeck();
    setCards(deck);
    const initialCard = deck[Math.floor(Math.random() * deck.length)];
    setCurrentCard(initialCard);
    setResult('');
    setCorrectGuesses(0);
    setWrongGuesses(0);
  };

  // Função para gerar um novo baralho de cartas
  const generateDeck = () => {
    const suits = ['♠', '♣', '♥', '♦'];
    const values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
    const deck = [];
    suits.forEach(suit => {
      values.forEach(value => {
        deck.push(`${value}${suit}`);
      });
    });
    return deck;
  };

  // Função para verificar o palpite do jogador
  const checkGuess = () => {
    if (!guess) {
      alert('Selecione uma opção!');
      return;
    }
    const nextCard = cards[Math.floor(Math.random() * cards.length)];
    if ((guess === 'maior' && nextCard > currentCard) || (guess === 'menor' && nextCard < currentCard)) {
      setResult('Parabéns! Você acertou!');
      setCorrectGuesses(prevState => prevState + 1);
    } else {
      setResult('Oh não! Você errou!');
      setWrongGuesses(prevState => prevState + 1);
    }
    setCurrentCard(nextCard);
  };

  // Define o palpite como "maior" ao clicar na seta para cima
  const selectHigher = () => {
    setGuess('maior');
    checkGuess(); // Verifica o palpite automaticamente
  };

  // Define o palpite como "menor" ao clicar na seta para baixo
  const selectLower = () => {
    setGuess('menor');
    checkGuess(); // Verifica o palpite automaticamente
  };

  return (
    <div className="container">
      <h1>Jogo Qual a Próxima Carta</h1>
      <div className="card-container">
        {currentCard && (
          <div className="card">
            <p className="card-text">{currentCard}</p>
          </div>
        )}
        <button onClick={startGame}>Iniciar Jogo</button>
      </div>
      {currentCard && (
        <div>
          <label>
            Prox. Carta Será:
            <button onClick={selectHigher}>&uarr;</button>
            <button onClick={selectLower}>&darr;</button>
          </label>
        </div>
      )}
      {result && <p>{result}</p>}
      <div>
        <p>Palpites Corretos: {correctGuesses}</p>
        <p>Palpites Incorretos: {wrongGuesses}</p>
      </div>
    </div>
  );
}

export default CardGame;
