import React, { useState } from 'react';
import { Search, Edit2, Trash2 } from 'lucide-react';

// This component displays the searchable product table
// It expects the list of products to be passed in as a prop.
export default function ProductTable({ products }) {
  const [searchTerm, setSearchTerm] = useState('');

  // Filter products based on the search term
  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    // The main container for the product catalog section
    <div className="bg-zinc-900 rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">Product Catalog</h2>
        <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-md font-medium">
          Add Product
        </button>
      </div>

      {/* Search Bar */}
      <div className="relative mb-6">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-white text-black pl-12 pr-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
        />
      </div>

      {/* Product Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-zinc-700">
              <th className="text-left py-3 px-4 text-orange-400 font-semibold">Product name</th>
              <th className="text-left py-3 px-4 text-orange-400 font-semibold">Category</th>
              <th className="text-left py-3 px-4 text-orange-400 font-semibold">PRICE</th>
              <th className="text-left py-3 px-4 text-orange-400 font-semibold">Stock</th>
              <th className="text-left py-3 px-4 text-orange-400 font-semibold">Status</th>
              <th className="text-left py-3 px-4 text-orange-400 font-semibold">ACTION</th>
            </tr>
          </thead>
          <tbody>
            {/* Map over the filtered products to create table rows */}
            {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                    <tr key={product.id} className="border-b border-zinc-800 hover:bg-zinc-800">
                      <td className="py-4 px-4">{product.name}</td>
                      <td className="py-4 px-4 text-gray-400">{product.category}</td>
                      <td className="py-4 px-4 text-yellow-400">{product.price}</td>
                      <td className="py-4 px-4 text-gray-400">{product.stock}</td>
                      <td className="py-4 px-4">
                        <span className={`px-3 py-1 rounded text-sm ${
                          product.status === 'In Stock'
                            ? 'bg-green-900 text-green-300'
                            : 'bg-orange-900 text-orange-300'
                        }`}>
                          {product.status}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex gap-3">
                          <button className="text-blue-400 hover:text-blue-300">
                            <Edit2 size={18} />
                          </button>
                          <button className="text-red-500 hover:text-red-400">
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                ))
            ) : (
                <tr>
                    <td colSpan="6" className="py-8 text-center text-gray-500">
                        No products found matching "{searchTerm}"
                    </td>
                </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}