function FakePaymentModal({ amount, onSuccess, onCancel }) {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-black p-6 rounded shadow-lg w-96">
                <h2 className="text-xl font-bold mb-4">Simulated Payment</h2>
                <p className="mb-4">Amount to pay: Rs. {amount}</p>
                <div className="flex justify-between">
                    <button
                        onClick={onCancel}
                        className="px-4 py-2 bg-gray-400 rounded"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onSuccess}
                        className="px-4 py-2 bg-green-500 text-white rounded"
                    >
                        Pay Now
                    </button>
                </div>
            </div>
        </div>
    );
}

export default FakePaymentModal;
