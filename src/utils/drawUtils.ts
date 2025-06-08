import { Car, Obstacle, Road } from '../types/game';

export const drawCar = (ctx: CanvasRenderingContext2D, car: Car) => {
  ctx.save();
  
  // Translate to car position and rotate
  ctx.translate(car.x + car.width / 2, car.y + car.height / 2);
  ctx.rotate(car.rotation * Math.PI / 180);
  
  // Draw car body
  ctx.fillStyle = car.color;
  ctx.fillRect(-car.width / 2, -car.height / 2, car.width, car.height);
  
  // Draw car details (windows, lights, etc.)
  ctx.fillStyle = '#111';
  ctx.fillRect(-car.width / 2 + 5, -car.height / 2 + 10, car.width - 10, car.height / 3);
  
  // Draw headlights
  ctx.fillStyle = '#FFFF00';
  ctx.fillRect(-car.width / 2 + 5, -car.height / 2 + 5, 5, 5);
  ctx.fillRect(car.width / 2 - 10, -car.height / 2 + 5, 5, 5);
  
  // Draw taillights
  ctx.fillStyle = '#FF0000';
  ctx.fillRect(-car.width / 2 + 5, car.height / 2 - 10, 5, 5);
  ctx.fillRect(car.width / 2 - 10, car.height / 2 - 10, 5, 5);
  
  ctx.restore();
};

export const drawObstacles = (ctx: CanvasRenderingContext2D, obstacles: Obstacle[]) => {
  obstacles.forEach(obstacle => {
    ctx.fillStyle = obstacle.color;
    ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
    
    // Add some details to obstacles
    ctx.fillStyle = '#333';
    ctx.fillRect(obstacle.x + 5, obstacle.y + 5, obstacle.width - 10, obstacle.height - 10);
  });
};

export const drawRoad = (ctx: CanvasRenderingContext2D, road: Road) => {
  // Draw road background
  ctx.fillStyle = '#333';
  ctx.fillRect(road.x, road.y, road.width, road.height);
  
  // Draw road edges
  ctx.fillStyle = '#FF3366';
  ctx.fillRect(road.x, road.y, 5, road.height);
  ctx.fillRect(road.x + road.width - 5, road.y, 5, road.height);
  
  // Draw center stripes
  ctx.fillStyle = '#FFF';
  road.stripes.forEach(stripe => {
    ctx.fillRect(stripe.x, stripe.y, road.stripeWidth, road.stripeHeight);
  });
};

export const drawScore = (ctx: CanvasRenderingContext2D, score: number, canvas: HTMLCanvasElement) => {
  ctx.font = '24px "Press Start 2P", monospace';
  ctx.fillStyle = '#00FF41';
  ctx.textAlign = 'right';
  ctx.fillText(`Score: ${score}`, canvas.width - 20, 40);
};