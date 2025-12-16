// src/components/CustomersTable.jsx
import React from 'react';
import { Edit2, Trash2 } from 'lucide-react';

export default function CustomersTable({ customers }) {
  return (
    <div className="bg-zinc-800 rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Recent Customers</h3>
        <button className="text-orange-500 hover:text-orange-400 text-sm">View All &gt;</button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-zinc-700">
              <th className="text-left py-3 px-4 text-orange-400 font-semibold">Name</th>
              <th className="text-left py-3 px-4 text-orange-400 font-semibold">Email</th>
              <th className="text-left py-3 px-4 text-orange-400 font-semibold">Role</th>
              <th className="text-left py-3 px-4 text-orange-400 font-semibold">Joined</th>
              <th className="text-left py-3 px-4 text-orange-400 font-semibold">Order Status</th>
              <th className="text-left py-3 px-4 text-orange-400 font-semibold">Action</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((customer) => (
              <tr key={customer.id} className="border-b border-zinc-700 hover:bg-zinc-700">
                <td className="py-4 px-4">{customer.name}</td>
                <td className="py-4 px-4 text-gray-400">{customer.email}</td>
                <td className="py-4 px-4">{customer.role}</td>
                <td className="py-4 px-4">{customer.joined}</td>
                <td className="py-4 px-4">
                  <span className={`px-3 py-1 rounded text-sm ${
                    customer.status === 'Active' ? 'bg-green-900 text-green-300' :
                    customer.status === 'pending' ? 'bg-yellow-900 text-yellow-300' :
                    'bg-red-900 text-red-300'
                  }`}>
                    {customer.status}
                  </span>
                </td>
                <td className="py-4 px-4 flex gap-3">
                  <button className="text-blue-400 hover:text-blue-300">
                    <Edit2 size={18} />
                  </button>
                  <button className="text-red-500 hover:text-red-400">
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
