// src/pages/AdminDashboard.jsx
import React, { useState, useEffect} from "react";
import GuitarTable from "../../components/Adminpart/guitar/GuitarTable";
import ProductTable from "../../components/Adminpart/product/ProductTable";
import CustomersTable from "../../components/Adminpart/user/CustomersTable";
import UserTable from "../../components/Adminpart/user/UserTable";
// import GuitarInventory from "../components/GuitarInventory";
import ProductCatalog from "../../components/Adminpart/product/ProductCatalog";
import { useNavigate, useOutletContext } from "react-router-dom";
import useApi from "../../hooks/useApi";
import toast from "react-hot-toast";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const { setActiveMenu } = useOutletContext(); // get setter from layout

  const {callApi, loading, error} = useApi();

  const [pendingGuitars, setPendingGuitars] = useState([]);
  const [pendingProducts, setPendingProducts] = useState([]);
  const [users, setUsers] = useState([]);// user state

   // Fetch pending guitars
  const fetchPendingGuitars = async () => {
    try {
      const data = await callApi("get", "/guitar/pending");
      setPendingGuitars(Array.isArray(data)? data : []);
    } catch (err) {
      setPendingGuitars([]);
      toast.error("Failed to fetch pending guitars:", err);
    }
  };

  // Fetch pending products
  const fetchPendingProducts = async () => {
    try {
      const data = await callApi("get", "/product/pending");
      setPendingProducts(Array.isArray(data) ? data : []);
    } catch (err) {
      setPendingProducts([])
      console.error("Failed to fetch pending products:", err);
      toast.error("Failed to fetch pending products!");
    }
  };

   // Fetch users
  const fetchUsers = async () => {
    try {
      const data = await callApi("get", "/users");
      setUsers(Array.isArray(data) ? data : []);
    } catch (err) {
      setUsers([]);
      console.error("Failed to fetch users:", err);
      toast.error("Failed to fetch users!");
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
      await callApi("put", `/guitar/approve/${id}`);
      toast.success("Guitar approved!");
      fetchPendingGuitars(); // refresh table
    } catch (err) {
      console.error("Failed to approve guitar:", err);
      toast.error("Failed to approve guitar");
    }
  };

  // Reject guitar
  const handleReject = async (id) => {
    try {
      await callApi("put", `/guitar/reject/${id}`);
      toast.success("Guitar rejected!");
      fetchPendingGuitars(); // refresh table
    } catch (err) {
      console.error("Failed to reject guitar:", err);
      toast.error("Failed to reject guitar");
    }
  };

  //Approve Products
  const handleApproveProduct = async (id) => {
    try {
      await callApi("put", `/product/approve/${id}`);
      toast.success("Product approved!");
      fetchPendingProducts();
    } catch (err) {
      console.error(err);
      toast.error("Failed to approve product");
    }
  };

  //Reject Products
  const handleRejectProduct = async (id) => {
    try {
      await callApi("put", `/product/reject/${id}`);
      toast.success("Product rejected!");
      fetchPendingProducts();
    } catch (err) {
      console.error(err);
      toast.error("Failed to reject product");
    }
  };

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
      users={users.slice(0, 5)}   //  ONLY 5 USERS
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
            guitars={pendingGuitars.slice(0,5)}// only shows first five in dashboard 
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
