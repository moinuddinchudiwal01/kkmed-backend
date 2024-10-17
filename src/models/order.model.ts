import mongoose, { Document, Schema } from "mongoose";
import { OrderMode, OrderStatus, PaymentMethod, PaymentStatus } from "../enums/order.enum";
import { object } from "joi";

export interface IOrder extends Document {
    userId: mongoose.Types.ObjectId;
    vendorId: mongoose.Types.ObjectId;
    deliveryPersonId: mongoose.Types.ObjectId;
    orderItems: {
        productId: mongoose.Types.ObjectId;
        quantity: number;
        price: number;
    }[];
    orderTotal: number;
    orderStatus: OrderStatus;
    orderMode: OrderMode;
    shippingAddress: {
        street: string;
        city: string;
        postalCode: string;
        country: string;
    };
    paymentMethod: PaymentMethod;
    paymentStatus: PaymentStatus;
}

// Define schema
const orderSchema = new Schema<IOrder>({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    vendorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Vendor', required: true },
    deliveryPersonId: { type: mongoose.Schema.Types.ObjectId, ref: 'DeliveryPerson', required: false },
    orderItems: [
        {
            productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
            quantity: { type: Number, required: true },
            price: { type: Number, required: true },
        }
    ],
    orderTotal: { type: Number, required: true },
    orderStatus: { type: String, enum: Object.values(OrderStatus), default: OrderStatus.PENDING, required: true },
    orderMode: { type: String, enum: Object.values(OrderMode), default: OrderMode.REGULAR, required: true },
    shippingAddress: {
        street: { type: String, required: true },
        city: { type: String, required: true },
        postalCode: { type: String, required: true },
        country: { type: String, required: true }
    },
    paymentMethod: { type: String, enum: Object.values(PaymentMethod), required: true },
    paymentStatus: { type: String, enum: Object.values(PaymentStatus), default: PaymentStatus.PENDING },
}, { timestamps: true });

// Create model
export const Order = mongoose.model<IOrder>('orders', orderSchema);