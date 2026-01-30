
import { Cart } from "../models/association.js"
import { CartItem } from "../models/association.js"
import { Products } from "../models/association.js";

export const addToCart = async (req, res) => {
  try {
    const user_id = req.user.id; // from token
    const { product_id, quantity = 1 } = req.body;

    // Fetch the product
    const product = await Products.findByPk(product_id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    // Prevent adding own product
    if (product.user_id === user_id) {
      return res.status(400).json({ message: "Cannot add your own product to cart" });
    }

    // Get or create cart
    let cart = await Cart.findOne({ where: { user_id } });
    if (!cart) cart = await Cart.create({ user_id });

    // Check if product already in cart
    let cartItem = await CartItem.findOne({
      where: { cart_id: cart.id, product_id }
    });

    if (cartItem) {
      cartItem.quantity += quantity;
      await cartItem.save();
    } else {
      cartItem = await CartItem.create({
        cart_id: cart.id,
        product_id,
        quantity
      });
    }

    // Fetch updated cart with all items
    const updatedCart = await Cart.findOne({
      where: { user_id },
      include: {
        model: CartItem,
        include: Products
      }
    });

    // Map cart items to frontend-friendly format
    const cartItems = updatedCart.CartItems.map(ci => ({
      id: ci.id,
      name: ci.Product.name,
      brand: ci.Product.brand,
      price: ci.Product.price,
      quantity: ci.quantity,
      image: ci.Product.image_urls
    }));

    res.status(200).json({
      message: "Product added to cart",
      cartItems
    });

  } catch (e) {
    console.error("Add to cart error:", e);
    res.status(500).json({ message: `Server error: ${e.message}` });
  }
};


export const getCartItems = async (req, res) => {
    try {
        const user_id = req.user.id; // from token

        const cart = await Cart.findOne({
            where: { user_id },
            include: {
                model: CartItem,
                include: Products
            }
        });

        // If user has no cart
        if (!cart) {
            return res.status(200).json({ cartItems: [] });
        }

        const cartItems = cart.CartItems.map(ci => ({
            id: ci.id,
            name: ci.Product.name,
            brand: ci.Product.brand,
            price: ci.Product.price,
            quantity: ci.quantity,
            image: ci.Product.image_urls
        }));

        res.status(200).json({
            cartItems,
            message: "cart items fetched successfully"
        });

    } catch (e) {
        res.status(500).json({ message: `Server error : ${e.message}` });
    }
};


export const updateCartQuantity = async(req,res) => {
    try {
        const cartItemId = req.params.id
        const {quantity} = req.body

        if (quantity < 1) {
            return res.status(400).json({ message: "Quantity must be >= 1" });
        }

        const cartItem = await CartItem.findByPk(cartItemId);
        if(!cartItem) {
            return res.status(404).json({message: "CartItem not found"});
        }
        
        cartItem.quantity = quantity;
        await cartItem.save();

        res.status(200).json({message: "Quantity updated successfully", quantity});
    } catch(e){
        res.status(500).json({ message: `Server error : ${e.message}` });   
    }
}


export const removeCartItem = async (req, res) => {
    try {
        const cartItemId = req.params.id;
        const user_id = req.user.id; // from token

        // Find the cart item
        const cartItem = await CartItem.findByPk(cartItemId, {
            include: {
                model: Cart,
                where: { user_id } // ensure user owns this cart item
            }
        });

        if (!cartItem) {
            return res.status(404).json({ message: "Cart item not found" });
        }

        // Delete the cart item
        await cartItem.destroy();

        // Fetch updated cart
        const cart = await Cart.findOne({
            where: { user_id },
            include: {
                model: CartItem,
                include: Products
            }
        });

        const cartItems = cart ? cart.CartItems.map(ci => ({
            id: ci.id,
            name: ci.Product.name,
            brand: ci.Product.brand,
            price: ci.Product.price,
            quantity: ci.quantity,
            image: ci.Product.image_urls
        })) : [];

        res.status(200).json({
            message: "Cart item removed successfully",
            cartItems
        });

    } catch (e) {
        console.error("Remove cart item error:", e);
        res.status(500).json({ message: `Server error: ${e.message}` });
    }
};
