interface Player {
    id: number;
    name: string;
    initiative: number;
    armorClass: number;
    maxHP: number;
    damageTaken: number;
    timelessHp: number;
    isDead?: boolean;
}

export default Player;