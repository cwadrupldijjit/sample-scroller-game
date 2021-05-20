import { Dimensions } from 'generic-types/dimensions.js';

export interface AttackSpecs {
    baseDamage: number;
    damageModifier: number;
    areaOfEffect: Dimensions;
    type: 'ranged'|'melee';
    cooldownDuration: number;
    cooldownExpires: number;
}
