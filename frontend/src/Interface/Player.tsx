interface Player {
    id: string;
    name: string;
    initiative: number;
    armorClass: number;
    maxHP: number;
    damageTaken: number;
    timelessHp: number;
    isDead?: boolean;
    states: string[];
}

export default Player;