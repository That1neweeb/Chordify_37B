import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import CustomersTable from "../components/CustomersTable";
import GuitarInventory from "../components/GuitarInventory";
import ProductCatalog from "../components/ProductCatalog";

export default function AdminDashboard() {
  const [activeMenu, setActiveMenu] = useState("Dashboard");

  const customers = [
    { id: 1, name: "Satyam", email: "satyam@gmail.com", role: "Seller", joined: "Nov 20 2024", status: "Active" },
    { id: 2, name: "Sidhant", email: "sidhant@gmail.com", role: "Seller", joined: "Nov 18 2024", status: "Active" },
    { id: 3, name: "Sushil", email: "sushil@gmail.com", role: "Customer", joined: "Nov 15 2024", status: "pending" },
    { id: 4, name: "Abhinav", email: "abhi@gmail.com", role: "Customer", joined: "Nov 10 2024", status: "Inactive" },
  ];

  const guitars = [
    { id: 1, name: "Fender Stratocaster", brand: "Fender - Electric", price: "Rs.24000", sold: "166 sold", stock: "15", condition: "Brand-New" },
    { id: 2, name: "Gibson Les Paul", brand: "Gibson - Needy", price: "Rs.30000", sold: "124 sold", stock: "8", condition: "Used" },
  ];

  const products = [
    { id: 1, name: "Boss Tuner Pedal", category: "Pedals", price: "Rs.1500", sold: "234 sold", stock: "35", status: "In Stock" },
    { id: 2, name: "Ernie Ball Strings", category: "Strings", price: "Rs.600", sold: "1250 sold", stock: "100", status: "In Stock" },
  ];

  return (
  <div className="min-h-screen bg-black text-white flex">
    <Sidebar activeMenu={activeMenu} setActiveMenu={setActiveMenu} />

    <div className="flex-1">

      <div className="bg-red-500 text-white p-4 text-xl">
        Admin Dashboard
      </div>

      <Header />

      <div className="p-6 space-y-6">
        <CustomersTable customers={customers} />
        <GuitarInventory guitars={guitars} />
        <ProductCatalog products={products} />
      </div>

    </div>
  </div>
);

}
