import { toast } from "react-toastify";
import CartCard from "../components/CartCard";
import CartTable from "../components/CartTable";
import CartFooter from "../components/CartFooter";
import { useEffect, useState } from "react";
import { useApi } from "../hooks/useAPI.js";
import FakePaymentModal from "../components/FakePaymentModal.jsx";
import { useNavigate } from "react-router-dom";
import CreateOrderModal from "../components/CreateOrderModal.jsx";



function CartPage() {
    const { callApi, loading, error } = useApi();
    const [cartItems, setCartItems] = useState([]);
    const [paymentOpen, setPaymentOpen] = useState(false);
    const navigate = useNavigate();
    const [createdOrderId, setCreatedOrderId] = useState(null);
    const [showCreateOrder, setShowCreateOrder] = useState(false);
    




    // Fetch cart items from backend
    const fetchCart = async () => {
        try {
            const data = await callApi("GET", `/cart/items`, {});
            setCartItems(data.cartItems || []);
            
        } catch (err) {
            console.error("Fetch cart error:", err.message);
        }
    };

   const handleCheckout = () => {
        if (cartItems.length === 0) {
            return toast.error("Your cart is empty");
        }
        setShowCreateOrder(true);
    };


    const handleCreateOrderConfirm = async (address, phone) => {
    try {
        const res = await callApi("POST", "/orders/create", {
            data: { address, phone }
        });

        setCreatedOrderId(res.order_id);
        setShowCreateOrder(false);
        setPaymentOpen(true); 
    } catch (err) {
        toast.error("Failed to create order");
    }
};



   const handlePaymentSuccess = async () => {
    try {
        await callApi("PATCH", `/orders/${createdOrderId}/pay`);

        toast.success("Payment successful!");
        setPaymentOpen(false);
        setCartItems([]);

        navigate("/orders");
    } catch (err) {
        toast.error("Payment failed");
    }
};





 

    // Update quantity in backend
    const updateQuantity = async (cartItemId, newQty) => {
        if (newQty < 1) return;

        //  update UI
        setCartItems(prev =>
            prev.map(item =>
                item.id === cartItemId ? { ...item, quantity: newQty } : item
            )
        );

        try {
            await callApi("PATCH", `/cart/item/${cartItemId}`, { data: { quantity: newQty } });
        } catch (err) {
            console.error("Error updating quantity:", err.message);
            // Revert if failed
            fetchCart();
        }
    };

    // Remove item from cart

    const removeItem = async (cartItemId) => {
        toast.info(
            <div>
                <p>Remove this item from cart?</p>
                <div className="flex justify-end gap-2 mt-2">
                    <button
                        onClick={async () => {
                            await callApi("DELETE", `/cart/item/${cartItemId}`, {});
                            setCartItems(prev => prev.filter(item => item.id !== cartItemId));
                            toast.dismiss(); // remove the toast
                        }}
                        className="bg-red-500 text-white px-2 py-1 rounded"
                    >
                        Yes
                    </button>
                    <button
                        onClick={() => toast.dismiss()}
                        className="bg-gray-300 text-black px-2 py-1 rounded"
                    >
                        No
                    </button>
                </div>
            </div>,
            { autoClose: false, closeOnClick: false }
        );
    };



    const handlePaymentCancel = () => {
        setPaymentOpen(false);
    };




 

    // Total price
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
                        image={`http://localhost:5000${item.image[0]}`}
                        productBrand={item.brand}
                        productName={item.name}
                        price={item.price}
                        quantity={item.quantity}
                        onQuantityChange={updateQuantity}
                        onRemove={removeItem}
                    />
                ))}
            </div>
            <CartFooter totalPrice={totalPrice} onCheckout={handleCheckout} />
            
           {showCreateOrder && (
                <CreateOrderModal
                    total={totalPrice}
                    onConfirm={handleCreateOrderConfirm}
                    onCancel={() => setShowCreateOrder(false)}
                />
            )}

            {paymentOpen && (
                <FakePaymentModal
                    amount={totalPrice}
                    onSuccess={handlePaymentSuccess}
                    onCancel={() => setPaymentOpen(false)}
                />
            )}


        </div>
    );
}

export default CartPage;
