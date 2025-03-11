import { Request, Response, NextFunction } from 'express';
import UserService from "../services/UserService"

class UserController {
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