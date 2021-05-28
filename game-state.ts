import { Dimensions } from './generic-types/dimensions.js';
import type { Bat, Character } from './objects/index.js';

interface GameState {
    gameCanvas?: HTMLCanvasElement;
    gameStatus: 'menus'|'paused'|'running'|'won'|'lost';
    character?: Character;
    enemies: Bat[];
    obstacles: Dimensions[];
    enemiesDefeated: number;
    enemyFrequency: number;
    nextWaveTime: number;
    difficultySpeedModifier: number;
    levelSpeed: number;
}

export const gameState: GameState = {
    gameStatus: 'menus',
    enemies: [],
    obstacles: [],
    enemiesDefeated: 0,
    enemyFrequency: 3000,
    nextWaveTime: -1,
    difficultySpeedModifier: 0,
    levelSpeed: 0,
};
