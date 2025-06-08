export type GameState = 'start' | 'playing' | 'gameOver';

export interface Car {
  x: number;
  y: number;
  width: number;
  height: number;
  speed: number;
  acceleration: number;
  maxSpeed: number;
  rotation: number;
  color: string;
}

export interface Obstacle {
  x: number;
  y: number;
  width: number;
  height: number;
  speed: number;
  color: string;
}

export interface GameControls {
  up: boolean;
  down: boolean;
  left: boolean;
  right: boolean;
}

export interface Road {
  x: number;
  y: number;
  width: number;
  height: number;
  laneWidth: number;
  stripeWidth: number;
  stripeHeight: number;
  stripeGap: number;
  stripes: { x: number; y: number }[];
}