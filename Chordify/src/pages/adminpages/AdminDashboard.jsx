import React, { useState, useEffect} from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import useApi from "../../hooks/useAPI.js";
import {toast} from "react-toastify";
import UserTable from "../../components/UserTable";
import PostTable from "../../components/PostTable";
import ProductTable from "../../components/ProductTable.jsx";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const { setActiveMenu } = useOutletContext(); // get setter from layout

  const { callApi } = useApi();

  const [pendingProducts, setPendingProducts] = useState([]);
  const [pendingPosts, setPendingPosts] = useState([]);
  const [users, setUsers] = useState([]);// user state

   // Fetch pending guitars
  const fetchPendingProducts = async () => {
    try {
      const res = await callApi("GET", "/admin/products/pending");
      console.log(res);
      setPendingProducts(res.data);
    } catch (err) {
      setPendingProducts([]);
      toast.error("Failed to fetch pending products:", err);
    }
  };

 
  // Fetch pending posts
  const fetchPendingPosts = async () => {
    try {
      const res = await callApi("GET", "/admin/posts/pending");
      setPendingPosts(res)
      
    } catch (err) {
      setPendingPosts([]);
      console.error("Failed to fetch pending posts:", err);
      toast.error("Failed to fetch pending posts!");
    }
  };


   // Fetch users
  const fetchUsers = async () => {
    try {
      const res = await callApi("GET", "/admin/users");   
      setUsers(res)
      
    } catch (err) {
      setUsers([]);
      console.error("Failed to fetch users:", err);
      toast.error("Failed to fetch users!");
    }
  };

  useEffect(() => {
    fetchPendingProducts();
    fetchPendingPosts();
    fetchUsers();
  }, []);


// Approve product
const handleApprove = async (id) => {
  try {
    await callApi("PATCH", `/admin/products/${id}/approve`);
    toast.success("Product approved!");
    fetchPendingProducts(); // refresh table
  } catch (err) {
    console.error("Failed to approve product:", err);
    toast.error(err.response?.data?.message || "Failed to approve product");
  }
};

// Reject product
const handleReject = async (id) => {
  try {
    await callApi("PATCH", `/admin/products/${id}/reject`);
    toast.success("Product rejected!");
    fetchPendingProducts(); // refresh table
  } catch (err) {
    console.error("Failed to reject product:", err);
    toast.error(err.response?.data?.message || "Failed to reject product");
  }
};



  // Approve Post (NEW)
  const handleApprovePost = async (id) => {
    try {
      await callApi("put", `/admin/posts/${id}/approve`);
      toast.success("Post approved!");
      fetchPendingPosts();
    } catch (err) {
      console.error("Failed to approve post:", err);
      toast.error("Failed to approve post");
    }
  };

  /// Reject Post (NEW)
  const handleRejectPost = async (id) => {
    try {
      await callApi("put", `/admin/posts/${id}/reject`);
      toast.success("Post rejected!");
      fetchPendingPosts();
    } catch (err) {
      console.error("Failed to reject post:", err);
      toast.error("Failed to reject post");
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
      navigate("/admin/userlistings");
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

    {/* Pending Products Section */}
    <div className="flex items-center justify-between">
    <h2 className="text-xl font-semibold text-white">Pending Products</h2>
    <button
      className="text-orange-500 hover:text-orange-400 text-sm"
      onClick={() => {
        setActiveMenu("Product Listing");
        navigate("/admin/productlistings");
      }}
    >
        View More &gt;
      </button>
    </div>

    <div className="space-y-2">
        {pendingProducts.length === 0 ? (
          <p className="text-white">No pending guitars</p>
        ) : (
          <ProductTable 
            products={pendingProducts.slice(0,5)}// only shows first five in dashboard 
            onApprove={handleApprove} 
            onReject={handleReject} 
          />
        )}
      </div>

      
    {/* Pending Posts Section */}
      <div className="flex items-center justify-between mt-4">
        <h2 className="text-xl font-semibold text-white">Pending Posts</h2>
        <button
          className="text-orange-500 hover:text-orange-400 text-sm"
          onClick={() => {
            setActiveMenu("Post Listing");
            navigate("/admin/posts");
          }}
        >
          View More &gt;
        </button>
      </div>

      <div className="space-y-2">
        {pendingPosts.length === 0 ? (
          <p className="text-white">No pending posts</p>
        ) : (
          <PostTable
            posts={pendingPosts.slice(0, 5)}
            onApprove={handleApprovePost}
            onReject={handleRejectPost}
          />
        )}
      </div>
    </div>
  );
}

