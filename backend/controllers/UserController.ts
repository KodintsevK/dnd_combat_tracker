import { Request, Response, NextFunction } from 'express';
import UserService from "../services/UserService"

class UserController {

    async whoAmI(req: Request, res: Response, next: NextFunction) : Promise<void>{
        try {
            const authHeader = req.headers['authorization'];
            const token = authHeader && authHeader.split(' ')[1];

            await UserService.getUserFromToken(token)
            res.status(200);   
        } catch (error) {
            next(error);
        }
    }

    async register(req: Request, res: Response, next: NextFunction) : Promise<void> {
        try {
            let { email, password } = req.body;

            email = UserService.validateEmail(email);

            const user = await UserService.registration(email, password);

            res.status(201).json({ token: user.token, email: user.email });

        } catch (error) {
            next(error);
        }
    }

    async login(req: Request, res: Response, next: NextFunction) :Promise<void> {
        try {
            let { email, password } = req.body;

            email = UserService.validateEmail(email);

            const user = await UserService.login(email, password);
           
            res.json({ token: user.token, email: user.email });
        } catch (error) {
            next(error);
        }
    }
}


export default new UserController();