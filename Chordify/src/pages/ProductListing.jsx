import React, { useState } from 'react';
// Import the new component created in the previous step
import ProductTable from '../components/ProductTable';

// This is the dedicated page component for the Product Catalog view.
export default function ProductListing() {
  // Initialize the product state array.
  // This data was originally in your AdminDash component, 
  // but it's cleaner to keep it here, in the dedicated page component.
  const [products, setProducts] = useState([
    { id: 1, name: 'Guitar Strings Set', category: 'Accessories', price: 2500, stock: 150, status: 'In Stock' },
    { id: 2, name: 'Guitar Tuner', category: 'Accessories', price: 1500, stock: 75, status: 'In Stock' },
    { id: 3, name: 'Guitar Case', category: 'Cases', price: 600, stock: 20, status: 'Low Stock' },
    { id: 4, name: 'Guitar Pick Assortment', category: 'Accessories', price: 500, stock: 300, status: 'In Stock' },
    { id: 5, name: 'Acoustic Guitar Model X', category: 'Instruments', price: 45000, stock: 5, status: 'Low Stock' },
    { id: 6, name: 'Electric Guitar Model Z', category: 'Instruments', price: 80000, stock: 12, status: 'In Stock' },
    { id: 7, name: 'Capo Standard', category: 'Accessories', price: 900, stock: 55, status: 'In Stock' },
    { id: 8, name: 'Microfiber Cleaning Cloth', category: 'Maintenance', price: 300, stock: 200, status: 'In Stock' },
  ]);

  // In a real application, you would add functions here to:
  // - fetch products (useEffect)
  // - addProduct(newProduct)
  // - editProduct(id, updates)
  // - deleteProduct(id)

  return (
    <div className="p-6">
      {/* Pass the product data down to the reusable table component. 
        Any actions (edit/delete) would eventually trigger functions defined here.
      */}
      <ProductTable products={products} />
    </div>
  );
}