import { Request, Response, NextFunction } from 'express';
import ApiError from '../errorHandler/errorHandler';
import UnitService from '../services/UnitService';
import UserService from '../services/UserService';
import Unit from '../database/Unit';
import TokenService from '../services/TokenService';

class UnitController {
    async create(req: Request, res: Response, next: NextFunction) : Promise<void>{
        try {
            const {
                name,
                armorClass,
                initiative,
                maxHP
            } = req.body;
            const authHeader = req.headers['authorization'];
            const token = authHeader && authHeader.split(' ')[1] || "";
            const userUID = await UserService.getUserIdFromToken(token);

            const isUnitValid = UnitService.validateCharacter(armorClass, maxHP, initiative, name);

            if (isUnitValid) {
                const new_unit =  await Unit.create({
                    name: name,
                    armorClass: armorClass,
                    initiative: initiative,
                    maxHP: maxHP,
                    userUID: userUID
                });
                res.status(201).json( new_unit )
            }
            throw ApiError.badRequest("Unit is not valid")
        } catch (error) {
            next(error);  
        }
    }

    async get(req: Request, res: Response, next: NextFunction) : Promise<void>{
        try {
            const token = TokenService.getUserInfoFromToken(req)
            const userUID = await UserService.getUserIdFromToken(token);
            const user = await UserService.getUserbyUID(userUID);
            const units = await user.getUnits();

            res.status(200).json(units)
        } catch (error) {
            next(error)
        }
    }
}

export default new UnitController();