import { Router } from 'express';
import { createOrder } from '../controllers/order.controller';

const orderRouter = Router();

orderRouter.post('/', createOrder);
// orderRouter.get('/orders/:id', getOrderById);
// orderRouter.patch('/orders/:id/status', updateOrderStatus);
// orderRouter.get('/orders', getAllOrders);

export default orderRouter;
