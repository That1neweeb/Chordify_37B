import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useApi from "../hooks/useAPI.js";
import { toast } from "react-toastify";
import FakePaymentModal from "../components/FakePaymentModal.jsx";
import CreateOrderModal from "../components/CreateOrderModal.jsx";


function CheckoutPage() {
    const { callApi } = useApi();
    const navigate = useNavigate();
    const location = useLocation();

    const [orderItems, setOrderItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [totalPrice, setTotalPrice] = useState(0);
    const [isCreateOrder, setIsCreateOrderOpen] = useState(false);

    //payment handler to open the fake payment model
    const handleCreateOrder = () => {
        setIsCreateOrderOpen(true);
    };

    useEffect(() => {
        const fetchCheckoutItems = async () => {
            try {
                if (location.state?.order) {
                    setOrderItems(location.state.order);
                } else {
                    const res = await callApi("GET", "/cart/items");
                    setOrderItems(res.data || []);
                }
            } catch (err) {
                console.error("Checkout fetch error:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchCheckoutItems();
    }, []);

    useEffect(() => {
        const total = orderItems.reduce(
            (sum, item) => sum + item.price * item.quantity,
            0
        );
        setTotalPrice(total);
    }, [orderItems]);

    const handleCreateOrderConfirm = async (address, phone) => {
            try {
                const res = await callApi("POST", "/orders/create", { data : { items: orderItems, address, phone }});
                console.log(res);

                toast.success("Order created successfully");
                navigate("/orders"); 
            } catch (err) {
                toast.error("Failed to create order");
            } finally {
                setIsCreateOrderOpen(false);
            }
        };



    if (loading) return <p>Loading checkout...</p>;
    if (orderItems.length === 0) return <p>No items to checkout</p>;

    return (
        <div className="p-10">
            <button
                onClick={() => navigate(-1)}
                className="mb-4 px-4 py-2 rounded bg-[#393328]"
            >
                ← Back
            </button>

            <h2 className="text-3xl font-bold mb-6">Checkout</h2>

            <div className="flex flex-col gap-6">
                {orderItems.map(item => (
                    <div key={item.id} className="grid grid-cols-12 items-center border-b py-4">
                        <div className="col-span-2">
                            <img
                                src={
                                    item.image_urls?.length
                                        ? `http://localhost:5000${item.image_urls[0]}`
                                        : "/placeholder.png"
                                }
                                className="h-24 w-24 object-cover rounded"
                            />
                        </div>

                        <div className="col-span-7">
                            <p className="font-semibold">{item.name}</p>
                            <p className="text-sm text-[#ABA6A6]">{item.brand}</p>
                            <p>Quantity: {item.quantity}</p>
                        </div>

                        <div className="col-span-3 text-right font-semibold">
                            Rs. {item.price * item.quantity}
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-6 flex justify-between text-xl font-bold">
                <p>Total:</p>
                <p>Rs. {totalPrice}</p>
            </div>

            <button
                onClick={handleCreateOrder}
                className="mt-6 w-full h-12 bg-[#F2A60D] text-black font-bold"
            >
                Create Order
            </button>

            {isCreateOrder && 
                <CreateOrderModal
                    total={totalPrice}
                    onConfirm={handleCreateOrderConfirm}
                    onCancel={() => setIsCreateOrderOpen(false)}
                />

            }
        </div>
    );
}

export default CheckoutPage;
