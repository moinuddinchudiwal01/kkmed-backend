import { NextFunction, Request, Response } from "express";
import { catchAsyncError } from "../utils/catchAsyncWrapper";
import { Order } from "../models/order.model";
import { HttpStatusCode } from "../constants/statusCode";

// Create Order
export const createOrder = catchAsyncError(
    async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
        const { userId, vendorId, orderItems, shippingAddress, paymentMethod, orderMode } = req.body;
        const orderTotal = orderItems.reduce((total: number, item: any) => total + item.price * item.quantity, 0);

        const newOrder = new Order({
            userId,
            vendorId,
            orderItems,
            orderTotal,
            orderMode,
            shippingAddress,
            paymentMethod,
        });

        await newOrder.save();

        return res.status(HttpStatusCode.CREATED).json({
            status: true,
            statusCode: HttpStatusCode.CREATED,
            message: 'Order created successfully',
            data: newOrder
        });
    }
)