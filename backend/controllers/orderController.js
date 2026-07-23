import { Order } from '../models/Order.js';

export const createOrder = async (req, res) => {
  try {
    const { customerName, customerEmail, customerPhone, deliveryAddress, items, subtotal } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ error: 'Order must contain at least one item.' });
    }

    // Calculate Estimated Prep Time
    // Base time = 3 minutes. Each item adds 2 minutes per quantity.
    const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
    const estimatedPrepTime = 3 + (totalItems * 2);

    const newOrder = new Order({
      customerName,
      customerEmail,
      customerPhone,
      deliveryAddress,
      estimatedPrepTime,
      items,
      subtotal
    });

    const savedOrder = await newOrder.save();
    
    console.log(`[New Order] Received from ${customerName} (${savedOrder._id})`);
    
    res.status(201).json({
      message: 'Order placed successfully',
      orderId: savedOrder._id,
      estimatedPrepTime
    });
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ error: 'Internal server error while placing order.' });
  }
};
