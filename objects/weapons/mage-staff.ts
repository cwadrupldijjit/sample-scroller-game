import { AttackSpecs } from './attack-specs.js';
import { Weapon } from './weapon.js';

export class MageStaff extends Weapon {
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
                type: 'melee',
                baseDamage: primaryBaseDamage,
                areaOfEffect: { height: length, width: length, boundsType: 'curve' },
                cooldownDuration: 750,
                cooldownExpires: -1,
                damageModifier: primaryDamageModifier ?? 3,
            },
            specialAttack,
        );
    }
}
