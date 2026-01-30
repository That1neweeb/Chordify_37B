

export default function ProductTable({ products =[], onApprove, onReject}) {
  return (
    <div className="bg-zinc-800 rounded-lg p-6">
      <table className="w-full">
        <thead>
          <tr className="border-b border-zinc-700">
            <th className="text-left py-3 text-orange-400">Name</th>
            <th className="text-left py-3 text-orange-400">Brand</th>
            <th className="text-left py-3 text-orange-400">Price</th>
            <th className="text-left py-3 text-orange-400">Condition</th>
            <th className="text-left py-3 text-orange-400">Action</th>
          </tr>
        </thead>

        <tbody>
          {products.map((product) => (
            <tr
              key={product.id}
              className="border-b border-zinc-700 hover:bg-zinc-700"
            >
              <td className="py-3">{product.name}</td>
              <td className="py-3 text-gray-400">{product.brand}</td>
              <td className="py-3">Rs. {product.price}</td>
              <td className="py-3">{product.condition}</td>

              <td className="py-3">
                <div className="flex gap-3">
                  <button className="px-3 py-1 rounded bg-green-600 hover:bg-green-500 text-white text-sm"
                  onClick={() => onApprove && onApprove(product.id)}
                  >
                    Accept
                  </button>

                  <button className="px-3 py-1 rounded bg-red-600 hover:bg-red-500 text-white text-sm"
                  onClick={() => onReject && onReject(product.id)}
                  >
                    Reject
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
