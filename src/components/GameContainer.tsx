import React, { useRef, useEffect, useState } from 'react';
import { Car, Obstacle, GameControls, Road } from '../types/game';
import useGameLoop from '../hooks/useGameLoop';
import useKeyboardControls from '../hooks/useKeyboardControls';
import { drawCar, drawObstacles, drawRoad, drawScore } from '../utils/drawUtils';
import { checkCollision, updateCarPosition, updateObstacles, updateRoad } from '../utils/gameUtils';

interface GameContainerProps {
  onGameOver: (score: number) => void;
}

const GameContainer: React.FC<GameContainerProps> = ({ onGameOver }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [score, setScore] = useState(0);
  const [gameStartTime] = useState(Date.now());
  
  // Game controls state
  const controls = useKeyboardControls();
  
  // Initialize game objects
  const [car, setCar] = useState<Car>({
    x: 0,
    y: 0,
    width: 40,
    height: 70,
    speed: 0,
    acceleration: 0.2,
    maxSpeed: 10,
    rotation: 0,
    color: '#00FF41'
  });
  
  const [obstacles, setObstacles] = useState<Obstacle[]>([]);
  
  const [road, setRoad] = useState<Road>({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
    laneWidth: 80,
    stripeWidth: 10,
    stripeHeight: 50,
    stripeGap: 30,
    stripes: []
  });

  // Initialize game dimensions
  useEffect(() => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas dimensions
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;
    
    // Initialize car position
    setCar(prev => ({
      ...prev,
      x: canvas.width / 2 - prev.width / 2,
      y: canvas.height - 150
    }));
    
    // Initialize road
    const roadWidth = canvas.width * 0.8;
    setRoad(prev => {
      const roadX = (canvas.width - roadWidth) / 2;
      const stripes = [];
      const numStripes = Math.ceil(canvas.height / (prev.stripeHeight + prev.stripeGap)) + 1;
      
      for (let i = 0; i < numStripes; i++) {
        stripes.push({
          x: canvas.width / 2 - prev.stripeWidth / 2,
          y: i * (prev.stripeHeight + prev.stripeGap) - prev.stripeHeight
        });
      }
      
      return {
        ...prev,
        x: roadX,
        y: 0,
        width: roadWidth,
        height: canvas.height,
        stripes
      };
    });
  }, []);

  // Game loop
  const gameLoop = () => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Update score based on time
    const currentTime = Date.now();
    const newScore = Math.floor((currentTime - gameStartTime) / 100);
    setScore(newScore);
    
    // Update game objects
    const updatedCar = updateCarPosition(car, controls, canvas);
    setCar(updatedCar);
    
    const updatedRoad = updateRoad(road, canvas);
    setRoad(updatedRoad);
    
    // Generate and update obstacles
    const updatedObstacles = updateObstacles(obstacles, canvas, newScore);
    setObstacles(updatedObstacles);
    
    // Check for collisions
    if (checkCollision(updatedCar, updatedObstacles)) {
      onGameOver(newScore);
      return;
    }
    
    // Draw game objects
    drawRoad(ctx, updatedRoad);
    drawCar(ctx, updatedCar);
    drawObstacles(ctx, updatedObstacles);
    drawScore(ctx, newScore, canvas);
  };

  // Start game loop
  useGameLoop(gameLoop);

  return (
    <div className="relative w-full">
      <canvas 
        ref={canvasRef} 
        className="w-full border-4 border-indigo-600 rounded-lg shadow-lg bg-gray-800"
        style={{ height: '80vh', touchAction: 'none' }}
      />
      <div className="absolute bottom-4 left-4 right-4 flex justify-between text-white font-bold">
        <div className="bg-black bg-opacity-70 p-2 rounded">
          Score: {score}
        </div>
        <div className="bg-black bg-opacity-70 p-2 rounded">
          Controls: Arrow Keys
        </div>
      </div>
    </div>
  );
};

export default GameContainer;