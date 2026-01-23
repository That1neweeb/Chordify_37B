import CartCard from "../components/CartCard";
import CartTable from "../components/CartTable";
import CartFooter from "../components/CartFooter";
import { useEffect, useState } from "react";
import { useApi } from "../hooks/useAPI.js";

function CartPage() {
    const { callApi, loading, error } = useApi();
    const [cartItems, setCartItems] = useState([]);
    
    const user_id = 13; // hard-coded for now, later replace with auth token

    // Fetch cart items
    const fetchCart = async () => {
        try {
            const data = await callApi("GET", `/cart/items`, { params: { user_id } });
            setCartItems(data.cartItems || []);
        } catch (err) {
            console.error("Fetch cart error:", err.message);
        }
    };

    // Update quantity in backend
    const updateQuantity = async (cartItemId, newQty) => {
        try {
            await callApi("PATCH", `/cart/item/${cartItemId}`, { data: { quantity: newQty } });
            setCartItems(prev =>
                prev.map(item =>
                    item.id === cartItemId ? { ...item, quantity: newQty } : item
                )
            );
        } catch (err) {
            console.error("Error updating quantity:", err.message);
        }
    };

    // Increase quantity locally
    const increaseQty = (id) => {
        setCartItems(prev =>
            prev.map(item =>
                item.id === id ? { ...item, quantity: item.quantity + 1 } : item
            )
        );
    };

    // Decrease quantity locally
    const decreaseQty = (id) => {
        setCartItems(prev =>
            prev.map(item =>
                item.id === id && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
            )
        );
    };

    // Total price calculation
    const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

    // Fetch cart on component mount
    useEffect(() => {
        fetchCart();
    }, []);

    return (
        <div className="py-10">
            <h2 className="font-bold text-3xl mt-20 ml-36 mb-10">Your cart</h2>
            <div className="p-10 px-40">
                <CartTable />

                {cartItems.map(item => (
                    <CartCard
                        key={item.id}
                        id={item.id}
                        image={`http://localhost:5000${item.image}`}
                        productBrand={item.brand}
                        productName={item.name}
                        price={item.price}
                        quantity={item.quantity}
                        onQuantityChange={updateQuantity}
                        increaseQty={() => increaseQty(item.id)}
                        decreaseQty={() => decreaseQty(item.id)}
                    />
                ))}
            </div>
            <CartFooter totalPrice={totalPrice} />
        </div>
    );
}

export default CartPage;
