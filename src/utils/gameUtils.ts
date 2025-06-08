import { Car, Obstacle, GameControls, Road } from '../types/game';

export const updateCarPosition = (car: Car, controls: GameControls, canvas: HTMLCanvasElement): Car => {
  let { x, y, speed, rotation } = car;
  
  // Update speed based on controls
  if (controls.up) {
    speed = Math.min(car.maxSpeed, speed + car.acceleration);
  } else if (controls.down) {
    speed = Math.max(-car.maxSpeed / 2, speed - car.acceleration);
  } else {
    // Apply friction
    speed = speed * 0.95;
    if (Math.abs(speed) < 0.1) speed = 0;
  }
  
  // Update rotation based on controls
  if (controls.left) {
    rotation -= 3 * (speed / car.maxSpeed);
  }
  if (controls.right) {
    rotation += 3 * (speed / car.maxSpeed);
  }
  
  // Calculate new position based on speed and rotation
  const radians = rotation * Math.PI / 180;
  x += Math.sin(radians) * speed;
  y -= Math.cos(radians) * speed;
  
  // Keep car within canvas bounds
  const roadWidth = canvas.width * 0.8;
  const roadX = (canvas.width - roadWidth) / 2;
  
  if (x < roadX) x = roadX;
  if (x + car.width > roadX + roadWidth) x = roadX + roadWidth - car.width;
  if (y < 0) y = 0;
  if (y + car.height > canvas.height) y = canvas.height - car.height;
  
  return { ...car, x, y, speed, rotation };
};

export const updateObstacles = (obstacles: Obstacle[], canvas: HTMLCanvasElement, score: number): Obstacle[] => {
  // Move existing obstacles
  const updatedObstacles = obstacles
    .map(obstacle => ({
      ...obstacle,
      y: obstacle.y + obstacle.speed
    }))
    .filter(obstacle => obstacle.y < canvas.height);
  
  // Generate new obstacles based on score
  const obstacleFrequency = Math.max(30, 100 - Math.floor(score / 100));
  
  if (Math.random() * obstacleFrequency < 1) {
    const roadWidth = canvas.width * 0.8;
    const roadX = (canvas.width - roadWidth) / 2;
    
    const obstacleWidth = 40 + Math.random() * 40;
    const obstacleX = roadX + Math.random() * (roadWidth - obstacleWidth);
    
    updatedObstacles.push({
      x: obstacleX,
      y: -80,
      width: obstacleWidth,
      height: 80,
      speed: 3 + Math.random() * 2 + score / 1000,
      color: `hsl(${Math.random() * 360}, 70%, 50%)`
    });
  }
  
  return updatedObstacles;
};

export const updateRoad = (road: Road, canvas: HTMLCanvasElement): Road => {
  // Move road stripes to create scrolling effect
  const updatedStripes = road.stripes.map(stripe => ({
    x: stripe.x,
    y: stripe.y + 5
  }));
  
  // Add new stripes at the top when needed
  const lastStripe = updatedStripes[updatedStripes.length - 1];
  if (lastStripe.y > 0) {
    updatedStripes.push({
      x: canvas.width / 2 - road.stripeWidth / 2,
      y: lastStripe.y - road.stripeHeight - road.stripeGap
    });
  }
  
  // Remove stripes that have moved off the bottom of the canvas
  const visibleStripes = updatedStripes.filter(stripe => stripe.y < canvas.height);
  
  return {
    ...road,
    stripes: visibleStripes
  };
};

export const checkCollision = (car: Car, obstacles: Obstacle[]): boolean => {
  // Simple rectangle collision detection
  for (const obstacle of obstacles) {
    if (
      car.x < obstacle.x + obstacle.width &&
      car.x + car.width > obstacle.x &&
      car.y < obstacle.y + obstacle.height &&
      car.y + car.height > obstacle.y
    ) {
      return true;
    }
  }
  
  return false;
};