import React from 'react';
import { CarIcon } from 'lucide-react';

interface StartScreenProps {
  onStart: () => void;
}

const StartScreen: React.FC<StartScreenProps> = ({ onStart }) => {
  return (
    <div className="flex flex-col items-center justify-center bg-gray-800 rounded-lg p-8 shadow-2xl border-2 border-indigo-500">
      <div className="text-center mb-8">
        <h1 className="text-4xl md:text-6xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500 font-game">
          SPEED RACER
        </h1>
        <div className="text-5xl text-indigo-400 my-6 animate-bounce">
          <CarIcon size={80} />
        </div>
        <p className="text-lg text-gray-300 mb-6">
          Drive fast, avoid obstacles, and set a new high score!
        </p>
      </div>
      
      <div className="mb-8 bg-gray-900 p-4 rounded-lg w-full max-w-md">
        <h2 className="text-xl font-bold mb-2 text-indigo-300">How to Play:</h2>
        <ul className="text-gray-300 space-y-2 list-disc pl-5">
          <li>Use arrow keys to control your car</li>
          <li>Avoid obstacles on the road</li>
          <li>Stay on the track to survive</li>
          <li>The longer you survive, the higher your score!</li>
        </ul>
      </div>
      
      <button
        onClick={onStart}
        className="px-8 py-4 bg-gradient-to-r from-green-500 to-blue-600 text-white font-bold rounded-lg text-xl transition-all hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        START GAME
      </button>
    </div>
  );
};

export default StartScreen;