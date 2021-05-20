import { Coordinate } from 'generic-types/coordinate.js';
import { Dimensions } from 'generic-types/dimensions.js';
import { gameState } from '../game-state.js';
import { EventSubscriber } from '../generic-types/event-subscriber.js';
import { calculateTrianglePath } from '../utilities/math.js';
import { AnimationElement } from './animation-element.js';
import { RenderedElement } from './rendered-element.js';
import { Weapon } from './weapons/weapon.js';

export class Character implements Dimensions, AnimationElement, RenderedElement, EventSubscriber {
    readonly boundsType = 'square';
    
    sequenceFrameCount = 0;
    sequenceNumber = 0;
    
    depressedKeys: EventSubscriber['depressedKeys'] = {};
    
    movementDirection: Coordinate = {
        x: 0,
        y: 0,
    };
    
    private readonly upMovementKeys = [ 'w', 'k', 'arrowup' ];
    private readonly downMovementKeys = [ 's', 'j', 'arrowdown' ];
    
    constructor(
        public health: number,
        public width: number,
        public height: number,
        public position: Coordinate,
        public speed: number,
        public weapon: Weapon,
        public sprite?: string,
    ) {
        
    }
    
    /** What the object does when the event loop runs */
    onTick() {
        this.move(this.speed * this.movementDirection.y);
    }
    
    // ---------- EVENT LISTENERS ------------
    keydownEventListener = (event: KeyboardEvent) => {
        if (this.movementDirection.y || !event.key) return;
        
        const lowerKey = event.key.toLowerCase();
        
        if (this.upMovementKeys.includes(lowerKey)) {
            this.movementDirection.y += -1;
        }
        else if (this.downMovementKeys.includes(lowerKey)) {
            this.movementDirection.y += 1;
        }
    };
    
    keyupEventListener = (event: KeyboardEvent) => {
        if (!this.movementDirection.y || !event.key) return;
        
        const lowerKey = event.key.toLowerCase();
        
        if (this.upMovementKeys.includes(lowerKey)) {
            this.movementDirection.y -= -1;
        }
        else if (this.downMovementKeys.includes(lowerKey)) {
            this.movementDirection.y -= 1;
        }
    };
    
    preventContextMenuListener = (event: MouseEvent) => {
        event.preventDefault();
    };
    
    // TODO: this is for attacking
    mousedownEventListener = (event: MouseEvent) => {
        event.preventDefault();
        
        if (event.button == 0 || (event.button == 2 && !this.weapon.secondaryAttack)) {
            this.attack('primary');
        }
        else if (event.button == 2) {
            this.attack('secondary');
        }
    };
    
    // TODO: these are for looking a direction for ranged attacks
    mousemoveEventListener = (event: MouseEvent) => {
        
    };
    
    mouseupEventListener = (event: MouseEvent) => {
        
    };
    
    // ---------- GENERAL METHODS ------------
    setup() {
        window.addEventListener('keydown', this.keydownEventListener);
        window.addEventListener('keyup', this.keyupEventListener);
        window.addEventListener('mousedown', this.mousedownEventListener);
        window.addEventListener('mousemove', this.mousemoveEventListener);
        window.addEventListener('mouseup', this.mouseupEventListener);
        gameState.gameCanvas.addEventListener('contextmenu', this.preventContextMenuListener);
    }
    
    draw(context: CanvasRenderingContext2D) {
        context.beginPath();
        context.strokeStyle = 'hotpink';
        context.lineWidth = 3;
        context.fillStyle = 'orange';
        context.rect(this.position.x - (this.width / 2), this.position.y - (this.height / 2), this.width, this.height);
        context.fill();
        context.stroke();
        context.closePath();
    }
    
    move(distance: number) {
        let nextPosition = this.position.y + distance;
        const highestBound = window.innerHeight - (this.height / 2);
        const lowestBound = this.height / 2;
        
        if (nextPosition >= highestBound) {
            nextPosition = highestBound
        }
        else if (nextPosition <= lowestBound) {
            nextPosition = lowestBound;
        }
        
        this.position.y = nextPosition;
    }
    
    destroy() {
        window.removeEventListener('keydown', this.keydownEventListener);
        window.removeEventListener('keyup', this.keyupEventListener);
        window.removeEventListener('mousedown', this.mousedownEventListener);
        window.removeEventListener('mousemove', this.mousemoveEventListener);
        window.removeEventListener('mouseup', this.mouseupEventListener);
        gameState.gameCanvas.removeEventListener('contextmenu', this.preventContextMenuListener);
    }
    
    attack(type: 'primary'|'secondary' = 'primary') {
        const attackDamage =  this.weapon.attack(type);
        
        if (attackDamage != null) {
            const spec = type == 'primary' ? this.weapon.primaryAttack : this.weapon.secondaryAttack;
            
            if (!spec) return;
            
            let maximumRange = 0;
            
            if (spec.type == 'melee') {
                maximumRange = (Math.max(this.height, this.width) / 2) + spec.areaOfEffect.width;
                
                const enemiesInRange = gameState.enemies.filter(e => calculateTrianglePath(this.position, e.position).hypotenuse <= maximumRange);
                
                for (const enemy of enemiesInRange) {
                    
                    enemy.takeDamage(attackDamage);
                    
                    console.log('you attacked a bat, dealing ' + attackDamage + ' damage, leaving ' + enemy.health + ' health');
                }
            }
            else {
                // launch projectile
            }
            
        }
    }
    
    takeDamage(damage: number) {
        this.health = Math.max(0, this.health - damage);
        
        if (!this.health) {
            this.destroy();
        }
    }
}