import { AttackSpecs } from './attack-specs.js';
import { Weapon } from './weapon.js';

export class SpellCaster extends Weapon {
    constructor(name: string, primaryAttack: AttackSpecs, secondaryAttack?: AttackSpecs) {
        super(name, primaryAttack, secondaryAttack);
        
        this.primaryAttack.type = 'ranged';
        
        if (this.secondaryAttack) {
            this.secondaryAttack.type = 'ranged';
        }
    }
}
