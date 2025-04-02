import ApiError from "../errorHandler/errorHandler";
import BaseService from "./BaseService";

class UnitService  {
    className: string;
    constructor() {
        this.className = this.constructor.name;
    }

    validateArmorClass(ac: number): boolean {
        if (!(ac >= 1 && ac <= 30)) {
            throw ApiError.badRequest("armorClass is not valid")
        }
        return true;
    }
    
    // Валидация максимального здоровья (1-500)
    validateMaxHealth(hp: number): boolean {
        if (!(hp >= 1 && hp <= 500)) {
            throw ApiError.badRequest("Max hp is not valid")
        }
        return true;
    }
    
      // Валидация инициативы (0-30)
    validateInitiative(initiative: number): boolean {
        if (!(initiative >= 0 && initiative <= 30)) {
            throw ApiError.badRequest("Max hp is not valid")
        }
        return true;
    }
    
    // Общая валидация всех параметров
    validateCharacter(ac: number, hp: number, initiative: number, name: string): boolean {
        const validName = (!name) ? false : true;
        return (
            validName &&
            this.validateArmorClass(ac) &&
            this.validateMaxHealth(hp) &&
            this.validateInitiative(initiative)
        );
    }
}

export default new UnitService();