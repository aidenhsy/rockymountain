import asyncHandler from "express-async-handler";
import Order from "../models/Order.js";

export const createOrder = asyncHandler(async (req, res) => {
  const {
    cartItems,
    shippingAddress,
    paymentMethod,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  const order = new Order({
    orderItems: cartItems,
    user: req.user._id,
    shippingAddress,
    paymentMethod,
    taxPrice,
    shippingPrice,
    totalPrice,
  });
  const newOrder = await order.save();
  res.json(newOrder);
});

// @desc    Get order by ID
// @route   Get /api/orders/:id
// @access  Private
export const getOrderDetails = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );
  if (order) {
    res.json(order);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

// @desc    Update order to paid
// @route   Get /api/orders/:id/pay
// @access  Private
export const updateOrderToPaid = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (order) {
    (order.isPaid = true), (order.paidAt = Date.now());
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.payer.email_address,
    };

    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});
