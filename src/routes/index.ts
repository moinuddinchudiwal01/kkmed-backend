import { Router } from 'express';
import authRouter from './auth.routes';
import userRouter from './user.routes';
import orderRouter from './order.routes';

const router = Router();

router.use('/auth', authRouter);
router.use("/users", userRouter)
router.use("/orders", orderRouter)
export default router;
