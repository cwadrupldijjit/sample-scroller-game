import { AttackSpecs } from './attack-specs.js';
import { Weapon } from './weapon.js';

export class Sword extends Weapon {
    constructor(
        name: string,
        primaryBaseDamage: number,
        primaryDamageModifier: number,
        public length: number,
        specialAttack?: AttackSpecs,
    ) {
        super(
            name,
            {
                baseDamage: primaryBaseDamage,
                damageModifier: primaryDamageModifier ?? 7,
                type: 'melee',
                areaOfEffect: { height: length, width: length, boundsType: 'curve' },
                cooldownDuration: 500,
                cooldownExpires: -1,
            },
            specialAttack,
        );
    }
}
