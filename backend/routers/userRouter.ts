import { Router } from "express";
import UserController from "../controllers/UserController";

const userRouter: Router = Router();

userRouter.post('/register', UserController.register);
userRouter.post('/login', UserController.login);
userRouter.get('/whoami', UserController.whoAmI);

export default userRouter;
