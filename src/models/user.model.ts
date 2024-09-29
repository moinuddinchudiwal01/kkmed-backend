import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
  mobileNumber: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  otp: {
    type: String
  },
  otpExpiresAt: {
    type: Number
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  firstName: {
    type: String,
    default: 'John'
  },
  lastName: {
    type: String,
    default: 'Doe'
  },
  email: {
    type: String,
    default: 'john.doe@example.com',
    lowercase: true
  },
  profilePic: {
    type: String,
    default: 'https://example.com/default-profile-pic.png'
  },
  role: {
    type: String,
    enum: ['Admin', 'Vendor', 'DeliveryBoy', 'User'],
    default: 'User',
  },
  address: {
    type: String,
  },
  isActive: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  vendorDetails: {
    businessName: String,
    businessAddress: String,
    gstNumber: String
  },
  deliveryBoyDetails: {
    vehicleNumber: String,
    drivingLicense: String
  },
  cart: [
    {
      productId: { type: Schema.Types.ObjectId, ref: 'Product' },
      quantity: { type: Number, default: 1 }
    }
  ],
  orders: [
    {
      orderId: { type: Schema.Types.ObjectId, ref: 'Order' },
      orderDate: { type: Date, default: Date.now }
    }
  ]
});

export const UserModel = mongoose.model('User', userSchema);

