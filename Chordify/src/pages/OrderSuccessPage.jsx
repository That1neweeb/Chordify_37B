import { useLocation, useNavigate } from "react-router-dom";

function OrderSuccessPage() {
    const location = useLocation();
    const navigate = useNavigate();
    const orderId = location.state?.orderId;

    if (!orderId) {
        return (
            <div className="p-10 text-center">
                <h2 className="text-2xl font-bold mb-4">No Order Found</h2>
                <button
                    onClick={() => navigate("/")}
                    className="mt-4 px-4 py-2 bg-[#F2A60D] rounded"
                >
                    Continue Shopping
                </button>
            </div>
        );
    }

    return (
        <div className="p-10 flex flex-col items-center gap-6">
            <h2 className="text-3xl font-bold text-green-600">Order Successful!</h2>
            <p>Your order ID: <span className="font-semibold">{orderId}</span></p>
            <p>Thank you for your purchase. Your items will be shipped soon.</p>

            <div className="flex gap-4 mt-4">
                <button
                    onClick={() => navigate("/")}
                    className="px-4 py-2 bg-[#F2A60D] rounded text-black"
                >
                    Continue Shopping
                </button>
                <button
                    onClick={() => navigate("/orders")}
                    className="px-4 py-2 bg-gray-800 rounded text-white"
                >
                    View My Orders
                </button>
            </div>
        </div>
    );
}

export default OrderSuccessPage;
