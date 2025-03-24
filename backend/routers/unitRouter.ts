import { Router } from "express";
import UnitController from "../controllers/UnitController";

const unitRouter: Router = Router();

unitRouter.post('/', UnitController.create);
unitRouter.get('/', UnitController.get);

export default unitRouter;
