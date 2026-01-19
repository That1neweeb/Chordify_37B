// src/pages/AdminDashboard.jsx
import React, { useState, useEffect} from "react";
import GuitarTable from "../components/GuitarTable";
import ProductTable from "../components/ProductTable";
import CustomersTable from "../components/CustomersTable";
import UserTable from "../components/UserTable";
// import GuitarInventory from "../components/GuitarInventory";
import ProductCatalog from "../components/ProductCatalog";
import { useNavigate, useOutletContext } from "react-router-dom";
import axios from "axios";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const { setActiveMenu } = useOutletContext(); // get setter from layout

  const [pendingGuitars, setPendingGuitars] = useState([]);
  const [pendingProducts, setPendingProducts] = useState([]);
  const [users, setUsers] = useState([]);// user state

   // Fetch pending guitars
  const fetchPendingGuitars = async () => {
    try {
      const res = await axios.get("http://localhost:5000/guitar/pending");
      setPendingGuitars(res.data);
    } catch (err) {
      console.error("Failed to fetch pending guitars:", err);
    }
  };

  // Fetch pending products
  const fetchPendingProducts = async () => {
    try {
      const res = await axios.get("http://localhost:5000/product/pending");
      setPendingProducts(res.data);
    } catch (err) {
      console.error("Failed to fetch pending products:", err);
    }
  };

   // Fetch users
  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:5000/users");
      setUsers(res.data);
    } catch (err) {
      console.error("Failed to fetch users:", err);
    }
  };

  useEffect(() => {
    fetchPendingGuitars();
    fetchPendingProducts();
    fetchUsers();
  }, []);


  // Approve guitar
  const handleApprove = async (id) => {
    try {
      await axios.put(`http://localhost:5000/guitar/approve/${id}`);
      alert("Guitar approved!");
      fetchPendingGuitars(); // refresh table
    } catch (err) {
      console.error("Failed to approve guitar:", err);
      alert("Failed to approve guitar");
    }
  };

  // Reject guitar
  const handleReject = async (id) => {
    try {
      await axios.put(`http://localhost:5000/guitar/reject/${id}`);
      alert("Guitar rejected!");
      fetchPendingGuitars(); // refresh table
    } catch (err) {
      console.error("Failed to reject guitar:", err);
      alert("Failed to reject guitar");
    }
  };

  //Approve Products
  const handleApproveProduct = async (id) => {
    try {
      await axios.put(`http://localhost:5000/product/approve/${id}`);
      alert("Product approved!");
      fetchPendingProducts();
    } catch (err) {
      console.error(err);
      alert("Failed to approve product");
    }
  };

  //Reject Products
  const handleRejectProduct = async (id) => {
    try {
      await axios.put(`http://localhost:5000/product/reject/${id}`);
      alert("Product rejected!");
      fetchPendingProducts();
    } catch (err) {
      console.error(err);
      alert("Failed to reject product");
    }
  };


  // const customers = [
  //   { id: 1, name: "Satyam", email: "satyam@gmail.com", role: "Seller", joined: "Nov 20 2024", status: "Active" },
  //   { id: 2, name: "Sidhant", email: "sidhant@gmail.com", role: "Seller", joined: "Nov 18 2024", status: "Active" },
  //   { id: 3, name: "Sushil", email: "sushil@gmail.com", role: "Customer", joined: "Nov 15 2024", status: "pending" },
  //   { id: 4, name: "Abhinav", email: "abhi@gmail.com", role: "Customer", joined: "Nov 10 2024", status: "Inactive" },
  // ];

  // const guitars = [
  //   { id: 1, name: "Fender Stratocaster", brand: "Fender - Electric", price: "Rs.24000", sold: "166 sold", stock: "15", condition: "Brand-New" },
  //   { id: 2, name: "Gibson Les Paul", brand: "Gibson - Needy", price: "Rs.30000", sold: "124 sold", stock: "8", condition: "Used" },
  //   { id: 3, name: "Ibanez RG", brand: "Ibanez - Electric", price: "Rs.28000", sold: "98 sold", stock: "10", condition: "Brand-New" },
  //   { id: 4, name: "Yamaha Pacifica", brand: "Yamaha - Electric", price: "Rs.18000", sold: "75 sold", stock: "12", condition: "Brand-New" },
  //   { id: 5, name: "Epiphone SG", brand: "Epiphone - Electric", price: "Rs.22000", sold: "50 sold", stock: "7", condition: "Used" },
  // ];

  // const products = [
  //   { id: 1, name: "Boss Tuner Pedal", category: "Pedals", price: "Rs.1500", sold: "234 sold", stock: "35", status: "In Stock" },
  //   { id: 2, name: "Ernie Ball Strings", category: "Strings", price: "Rs.600", sold: "1250 sold", stock: "100", status: "In Stock" },
  // ];

  return (
    <div className="space-y-6">
      {/* Customers Section */}
      <div className="flex items-center justify-between">
  <h2 className="text-xl font-semibold text-white">Users</h2>
  <button
    className="text-orange-500 hover:text-orange-400 text-sm"
    onClick={() => {
      setActiveMenu("User Listing");
      navigate("/users");
    }}
  >
    View More &gt;
  </button>
</div>

<div className="space-y-2">
  {users.length === 0 ? (
    <p className="text-white">No users found</p>
  ) : (
    <UserTable
      users={users.slice(0, 5)}   // 👈 ONLY 5 USERS
      fetchUsers={fetchUsers}
    />
  )}
</div>

    {/* Pending Guitars Section */}
    <div className="flex items-center justify-between">
    <h2 className="text-xl font-semibold text-white">Pending Guitars</h2>
    <button
      className="text-orange-500 hover:text-orange-400 text-sm"
      onClick={() => {
        setActiveMenu("Guitar Listing");
        navigate("/guitars");
      }}
    >
        View More &gt;
      </button>
    </div>

    <div className="space-y-2">
        {pendingGuitars.length === 0 ? (
          <p className="text-white">No pending guitars</p>
        ) : (
          <GuitarTable 
            guitars={pendingGuitars. slice(0,5)}// obnly shows first five in dashboard 
            onApprove={handleApprove} 
            onReject={handleReject} 
          />
        )}
      </div>


      {/* Pending Products Section */}
      <div className="flex items-center justify-between mt-4">
        <h2 className="text-xl font-semibold text-white">Pending Products</h2>
        <button
          className="text-orange-500 hover:text-orange-400 text-sm"
          onClick={() => {
            setActiveMenu("Product Listing");
            navigate("/products");
          }}
        >
          View More &gt;
        </button>
      </div>
      <div className="space-y-2">
        {pendingProducts.length === 0 ? (
          <p className="text-white">No pending products</p>
        ) : (
          <ProductTable
            products={pendingProducts. slice(0,5)} //only shows first 5 in dashboard
            onApprove={handleApproveProduct}
            onReject={handleRejectProduct}
          />
        )}
      </div>
    </div>
  );
}
