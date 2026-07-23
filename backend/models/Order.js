import mongoose from 'mongoose';

const OrderSchema = new mongoose.Schema({
  customerName: {
    type: String,
    required: true
  },
  customerEmail: {
    type: String,
    required: true
  },
  customerPhone: {
    type: String,
    required: true
  },
  deliveryAddress: {
    type: String,
    required: true
  },
  estimatedPrepTime: {
    type: Number,
    required: true
  },
  items: [
    {
      id: { type: String, required: true },
      name: { type: String, required: true },
      price: { type: Number, required: true },
      quantity: { type: Number, required: true },
      options: { type: Object } // In case there are customizations (milk, size, etc.)
    }
  ],
  subtotal: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'processing', 'completed', 'cancelled'],
    default: 'pending'
  }
}, { timestamps: true });

export const Order = mongoose.model('Order', OrderSchema);
