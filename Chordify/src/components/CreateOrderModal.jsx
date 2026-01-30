import { useState } from "react";

function CreateOrderModal({ total, onConfirm, onCancel }) {
    const [address, setAddress] = useState("");
    const [phone, setPhone] = useState("");

    const handleConfirm = () => {
        if (!address.trim() || !phone.trim()) {
            alert("Please enter both address and phone number");
            return;
        }
        onConfirm(address, phone);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
            <div className="bg-black p-6 rounded w-[400px]">
                <h2 className="text-xl font-bold mb-4">Confirm Order</h2>

                <p className="mb-4">
                    Total Amount: <strong>Rs. {total}</strong>
                </p>

                <div className="flex flex-col gap-3 mb-4">
                    <input
                        type="text"
                        placeholder="Address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        className="p-2 rounded text-white"
                    />
                    <input
                        type="text"
                        placeholder="Phone number"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="p-2 rounded text-white"
                    />
                </div>

                <div className="flex justify-center gap-4">
                    <button
                        onClick={onCancel}
                        className="px-4 py-2 bg-[#C26F6F] rounded"
                    >
                        Cancel
                    </button>

                    <button
                        onClick={handleConfirm}
                        className="px-4 py-2 bg-[#F2A60D] font-semibold text-black"
                    >
                        Create Order
                    </button>
                </div>
            </div>
        </div>
    );
}

export default CreateOrderModal;
