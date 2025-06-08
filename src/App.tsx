import React, { useState } from 'react';
import GameContainer from './components/GameContainer';
import StartScreen from './components/StartScreen';
import GameOverScreen from './components/GameOverScreen';
import { GameState } from './types/game';

const App: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>('start');
  const [score, setScore] = useState<number>(0);

  const startGame = () => {
    setGameState('playing');
    setScore(0);
  };

  const endGame = (finalScore: number) => {
    setScore(finalScore);
    setGameState('gameOver');
  };

  const restartGame = () => {
    setGameState('playing');
    setScore(0);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-900 to-black p-4">
      <div className="w-full max-w-3xl">
        {gameState === 'start' && <StartScreen onStart={startGame} />}
        {gameState === 'playing' && <GameContainer onGameOver={endGame} />}
        {gameState === 'gameOver' && <GameOverScreen score={score} onRestart={restartGame} />}
      </div>
    </div>
  );
};

export default App;