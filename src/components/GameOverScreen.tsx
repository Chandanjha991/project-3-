import React from 'react';
import { RotateCcw } from 'lucide-react';

interface GameOverScreenProps {
  score: number;
  onRestart: () => void;
}

const GameOverScreen: React.FC<GameOverScreenProps> = ({ score, onRestart }) => {
  return (
    <div className="flex flex-col items-center justify-center bg-gray-800 rounded-lg p-8 shadow-2xl border-2 border-red-500 animate-fadeIn">
      <h1 className="text-4xl md:text-5xl font-bold mb-6 text-red-500 font-game">GAME OVER</h1>
      
      <div className="bg-gray-900 p-6 rounded-lg mb-8 w-full max-w-md text-center">
        <p className="text-gray-400 mb-2">Your Score</p>
        <p className="text-5xl font-bold text-indigo-400 mb-4">{score}</p>
        
        <div className="h-1 w-full bg-gray-700 my-4"></div>
        
        <div className="text-left mt-4">
          <p className="text-gray-300 mb-2">
            <span className="font-bold text-indigo-300">Tip:</span> Try to anticipate obstacles and plan your route ahead.
          </p>
        </div>
      </div>
      
      <button
        onClick={onRestart}
        className="flex items-center px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-700 text-white font-bold rounded-lg text-xl transition-all hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
      >
        <RotateCcw className="mr-2" size={24} />
        PLAY AGAIN
      </button>
    </div>
  );
};

export default GameOverScreen;