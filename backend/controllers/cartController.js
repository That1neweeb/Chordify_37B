
import { Cart } from "../models/association.js"
import { CartItem } from "../models/association.js"
import { Products } from "../models/association.js";

export const addToCart = async(req,res) => {
    try {
        const {user_id, product_id, quantity = 1} = req.body

        let cart = await Cart.findOne({where: {user_id}});
        if(!cart) {
            cart = await Cart.create({user_id});
        }

        //check if the product is already in cart
        let cartItem = await CartItem.findOne({
            where: {
                cart_id: cart.id,
                product_id
            }
        });

        if(cartItem) {
            cartItem.quantity += quantity;
            await cartItem.save();
        } else {
            cartItem = await CartItem.create({
                cart_id: cart.id,
                product_id,
                quantity
            });
        }

        res.status(200).send({message: "Product added to cart"});
        
    } catch(e) {
        res.status(500).send({message: `Server error : ${e.message}`});
    }
}
export const getCartItems = async (req, res) => {
    try {
        const user_id = req.query.user_id;
        if (!user_id) {
            return res.status(400).json({ message: "user_id required" });
        }

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
            res.status(404).json({message: "CartItem not found"});
        }
        
        cartItem.quantity = quantity;
        await cartItem.save();

        res.status(200).json({message: "Quantity updated successfully", quantity});
    } catch(e){
        res.status(500).json({ message: `Server error : ${e.message}` });   
    }
}