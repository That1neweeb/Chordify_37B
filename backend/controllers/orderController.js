import { Order, OrderItem, Cart, CartItem, Products } from "../models/association.js";

// Create a new order
export const createOrder = async (req, res) => {
  try {
    const user_id = req.user.id;
    const { items: itemsFromFrontend, address, phone } = req.body;

    let items = [];

    if (itemsFromFrontend && itemsFromFrontend.length > 0) {
      // Buy Now flow: validate product exists
      for (let item of itemsFromFrontend) {
        const product = await Products.findByPk(item.id);
        if (!product) {
          return res.status(400).json({ message: `Product with id ${item.id} does not exist` });
        }
        items.push({
          product_id: item.id,
          quantity: item.quantity,
          price: item.price,
        });
      }
    } else {
      // Cart checkout flow
      const cart = await Cart.findOne({
        where: { user_id },
        include: { model: CartItem, include: Products },
      });

      if (!cart || cart.CartItems.length === 0) {
        return res.status(400).json({ message: "Cart is empty" });
      }

      items = cart.CartItems
        .filter(ci => ci.Product)
        .map(ci => ({
          product_id: ci.product_id,
          quantity: ci.quantity,
          price: ci.Product.price,
        }));

      if (items.length === 0) {
        return res.status(400).json({ message: "Cart has no valid products" });
      }
    }

    // Calculate total
    const total = items.reduce((sum, item) => sum + item.quantity * item.price, 0);

    // Create order (status PENDING)
    const order = await Order.create({
      user_id,
      total_amount: total,
      status: "PENDING",
      address,
      phone,
    });

    // Create order items
    const orderItems = items.map(item => ({
      order_id: order.id,
      product_id: item.product_id,
      quantity: item.quantity,
      price: item.price,
    }));

    await OrderItem.bulkCreate(orderItems);

    return res.status(201).json({
      message: "Order created successfully",
      order_id: order.id,
    });

  } catch (error) {
    console.error("Create Order Error:", {
        message: error.message,
        stack: error.stack,
        requestBody: req.body,
    });
    return res.status(500).json({ message: error.message });
}

};


/**
 * Pay for an order (PAID)
 * Only works if status is PENDING
 */
export const payOrder = async (req, res) => {
  try {
    const user_id = req.user.id;
    const { id } = req.params;

    const order = await Order.findOne({ where: { id, user_id } });

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    if (order.status !== "PENDING") {
      return res.status(400).json({ message: "Order already processed" });
    }

    // Simulate payment success
    order.status = "PAID";
    await order.save();

    // Clear cart after successful payment
    const cart = await Cart.findOne({ where: { user_id } });
    if (cart) {
      await CartItem.destroy({ where: { cart_id: cart.id } });
    }

    return res.json({
      message: "Payment successful",
      order_id: order.id,
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Get all orders of the user
 */
export const getUserOrders = async (req, res) => {
  try {
    const user_id = req.user.id;

    const orders = await Order.findAll({
      where: { user_id },
      include: {
        model: OrderItem,
        include: Products,
      },
      order: [["createdAt", "DESC"]],
    });

    return res.status(200).json(orders);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Cancel an order (only if PENDING)
 */
export const cancelOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const user_id = req.user.id;

    const order = await Order.findOne({ where: { id, user_id } });

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    if (order.status !== "PENDING") {
      return res.status(400).json({ message: "Order cannot be cancelled" });
    }

    order.status = "CANCELLED";
    await order.save();

    return res.status(200).json({ message: "Order cancelled successfully" });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
