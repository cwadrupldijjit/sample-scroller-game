import { randomInt } from '../../utilities/math.js';
import { AttackSpecs } from './attack-specs.js';

export class Weapon {
    constructor(
        public name: string,
        public primaryAttack: AttackSpecs,
        public secondaryAttack?: AttackSpecs,
    ) {}
    
    attack(type: 'primary'|'secondary' = 'primary'): number {
        const spec = type == 'primary' ? this.primaryAttack : this.secondaryAttack;
        
        if (!this.canAttack(spec)) return;
        
        const damage = randomInt(Math.max(0, spec.baseDamage - spec.damageModifier), spec.baseDamage + spec.damageModifier);
        
        this.setExpiry(spec);
        
        return damage;
    }
    
    private canAttack(spec: AttackSpecs) {
        return spec.cooldownExpires == -1 || Date.now() >= spec.cooldownExpires;
    }
    
    private setExpiry(spec: AttackSpecs) {
        spec.cooldownExpires = Date.now() + spec.cooldownDuration;
    }
}