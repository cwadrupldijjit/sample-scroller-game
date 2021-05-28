import { gameState } from './game-state.js';
import { Bat, Character, weapons } from './objects/index.js';
import { Sword } from './objects/weapons/sword.js';
import { randomInt } from './utilities/math.js';

gameState.gameCanvas = document.querySelector<HTMLCanvasElement>('.game-canvas');
const gameContext = gameState.gameCanvas.getContext('2d');

function setCanvasDimensions() {
    gameState.gameCanvas.width = window.innerWidth;
    gameState.gameCanvas.height = window.innerHeight;
}

setCanvasDimensions();

window.addEventListener('resize', () => {
    requestAnimationFrame(() => setCanvasDimensions());
});

function startGame() {
    gameState.character = new Character(
        100,
        48,
        60,
        { x: 50, y: 70 },
        5,
        new Sword(
            'Glamdring',
            30,
            6,
            23,
        ),
    );
    
    gameState.character.setup();
    
    gameState.gameStatus = 'running';
    gameState.nextWaveTime = Date.now() + gameState.enemyFrequency;
    
    gameLoop();
}

function gameLoop() {
    if (![ 'paused', 'running' ].includes(gameState.gameStatus)) {
        // TODO: detect winning or losing conditions and stop the loop
        if (gameState.gameStatus == 'lost') {
            console.log('You have lost! Enemies defeated:', gameState.enemiesDefeated);
        }
        return;
    }
    
    if (gameState.nextWaveTime <= Date.now()) {
        const newBatWidth = 27;
        gameState.enemies.push(new Bat(
            14,
            newBatWidth,
            20,
            { x: window.innerWidth + (newBatWidth / 2), y: randomInt(newBatWidth / 2, window.innerHeight - (newBatWidth / 2)) },
            8,
        ));
        gameState.nextWaveTime = Date.now() + gameState.enemyFrequency;
    }
    
    gameContext.clearRect(0, 0, window.innerWidth, window.innerHeight);
    
    gameState.character.onTick();
    
    for (const enemy of gameState.enemies) {
        enemy.onTick();
    }
    
    gameContext.beginPath();
    
    gameState.character.draw(gameContext);
    
    for (const enemy of gameState.enemies) {
        enemy.draw(gameContext);
    }
    
    if (!gameState.character.health) {
        gameState.gameStatus = 'lost';
    }
    
    // continue the loop for as long as the game is going
    requestAnimationFrame(gameLoop);
}

startGame();
