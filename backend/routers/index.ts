import { Router } from "express";
import userRouter from "./userRouter";
import unitRouter from "./unitRouter";

const router: Router = Router();

router.use('/user', userRouter);
router.use('/unit', unitRouter);

export default router;
