import { useEffect, useState } from "react";
import useApi from "../hooks/useAPI";
import { toast } from "react-toastify";

function OrdersPage() {
  const { callApi } = useApi();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await callApi("GET", "/orders");
        setOrders(res);
      } catch (err) {
        toast.error("Failed to load orders");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const handleCancel = async (orderId) => {
    try {
      await callApi("PATCH", `/orders/${orderId}/cancel`);
      toast.success("Order cancelled");
      setOrders(prev =>
        prev.map(order =>
          order.id === orderId
            ? { ...order, status: "CANCELLED" }
            : order
        )
      );
    } catch (err) {
      toast.error("Cannot cancel order");
    }
  };

  if (loading) return <p>Loading orders...</p>;
  if (orders.length === 0) return <p>No orders found</p>;

  return (
    <div className="p-10">
      <h2 className="text-3xl font-bold mb-6">My Orders</h2>

      <div className="flex flex-col gap-6">
        {orders.map(order => (
          <div key={order.id} className="border p-6 rounded-lg">
            <div className="flex justify-between mb-4">
              <div>
                <p className="font-semibold">Order #{order.id}</p>
                <p className="text-sm text-gray-500">
                  {new Date(order.createdAt).toLocaleDateString()}
                </p>
              </div>

              <div className="text-right">
                <p className="font-bold">Rs. {order.total_amount}</p>
                <p className={`font-semibold ${
                  order.status === "PENDING" ? "text-yellow-500" :
                  order.status === "PAID" ? "text-green-500" :
                  "text-red-500"
                }`}>
                  {order.status}
                </p>
              </div>
            </div>

            {order.OrderItems.map(item => (
              <div key={item.id} className="flex items-center gap-4 border-t py-3">
                <img
                  src={`http://localhost:5000${item.Product.image_urls[0]}`}
                  className="h-16 w-16 object-cover rounded"
                />
                <div className="flex-1">
                  <p className="font-semibold">{item.Product.name}</p>
                  <p className="text-sm text-gray-500">
                    Qty: {item.quantity}
                  </p>
                </div>
                <p>Rs. {item.price * item.quantity}</p>
              </div>
            ))}
            
            {order.status === "PENDING" && (
            <div className="flex gap-4 mt-4">
                <button
                onClick={() => handleCancel(order.id)}
                className="px-4 py-2 bg-red-500 text-white rounded"
                >
                Cancel Order
                </button>

                <button
                onClick={() => handlePayOrder(order.id)}
                className="px-4 py-2 bg-green-500 text-white rounded"
                >
                Pay Now
                </button>
            </div>
            )}

          </div>
        ))}
      </div>
    </div>
  );
}

export default OrdersPage;
