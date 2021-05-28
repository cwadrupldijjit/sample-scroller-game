import { gameState } from '../game-state.js';
import { Coordinate } from '../generic-types/coordinate.js';
import { Dimensions } from '../generic-types/dimensions.js';
import { RightTriangle } from '../generic-types/right-triangle.js';
import { calculateDiagonalMovement, calculateTrianglePath, randomInt } from '../utilities/math.js';
import { AnimationElement } from './animation-element.js';
import { RenderedElement } from './rendered-element.js';

export class Bat implements Dimensions, AnimationElement, RenderedElement {
    readonly boundsType = 'square';
    sequenceNumber = 0;
    sequenceFrameCount = 1;
    
    cooldownExpiration = -1;
    
    constructor(
        public health: number,
        public width: number,
        public height: number,
        public position: Coordinate,
        public speed: number,
        public damage = randomInt(6, 10),
        public attackModifier = 5,
        public attackCooldown = 2500,
    ) {
        
    }
    
    onTick() {
        if (!this.health) return;
        
        const character = gameState.character;
        const triangularPathToCharacter = calculateTrianglePath(this.position, character.position);
        
        const closestMeleeDistance = (Math.max(character.width, character.height) / 2) + (Math.max(this.width, this.height) / 2);
        
        if (Math.abs(triangularPathToCharacter.hypotenuse) <= closestMeleeDistance && Math.abs(triangularPathToCharacter.hypotenuse) <= closestMeleeDistance) {
            if (this.cooldownExpiration == -1 || Date.now() >= this.cooldownExpiration) {
                const damage = this.attack();
                
                character.takeDamage(damage);
                
                console.log('the bat attacks with ' + damage + ' damage, leaving ' + character.health + ' health');
                
            }
        }
        else {
            this.move(triangularPathToCharacter);
        }
    }
    
    draw(context: CanvasRenderingContext2D) {
        const triangle = calculateTrianglePath(this.position, gameState.character.position);
        
        context.save();
        context.translate(this.position.x, this.position.y);
        context.rotate(triangle.alphaAngle * (Math.PI / 180));
        context.translate(-this.position.x, -this.position.y);
        context.beginPath();
        context.strokeStyle = 'brown';
        context.lineWidth = 3;
        context.fillStyle = 'black';
        context.rect(this.position.x - (this.width / 2), this.position.y - (this.height / 2), this.width, this.height);
        context.fill();
        context.stroke();
        context.closePath();
        context.restore();
    }
    
    move(triangle: RightTriangle) {
        const { x, y } = calculateDiagonalMovement(triangle, this.speed);
        
        this.position = {
            x: this.position.x - x,
            y: this.position.y - y,
        };
    }
    
    attack() {
        this.cooldownExpiration = Date.now() + this.attackCooldown;
        return randomInt(Math.max(this.damage - this.attackModifier, 0), this.damage + this.attackModifier);
    }
    
    takeDamage(damage: number) {
        this.health = Math.max(0, this.health - damage);
        
        if (!this.health) {
            gameState.enemies = gameState.enemies.filter(e => e != this);
            gameState.enemiesDefeated++;
        }
    }
}
