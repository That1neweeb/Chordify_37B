import React from 'react';
import './AdminDash.css';

const AdminDash = () => {
  const recentCustomers = [
    { name: 'Satyam Shrestha', email: 'satyam@gmail.com', role: 'Seller', joined: 'Nov 20,2024', status: 'Active' },
    { name: 'Sidhant Giri', email: 'sidhant@gmail.com', role: 'Seller', joined: 'Nov 18,2024', status: 'Active' },
    { name: 'Sushil Chaudhary', email: 'sushil@gmail.com', role: 'Customer', joined: 'Nov 15,2024', status: 'pending' },
    { name: 'Abhinav Shrestha', email: 'abhi@gmail.com', role: 'Customer', joined: 'Nov 10,2024', status: 'Inactive' }
  ];

  const guitarInventory = [
    { name: 'Frender Stratocaster', brand: 'Frender <Abbots>', price: 'Rs.24000', sold: '156 sold', stock: 'Snake 15', condition: 'Battle Stre-New!' },
    { name: 'Gibson Les Paul', brand: 'Gibson <NeedLife>', price: 'Rs.30000', sold: '124 sold', stock: 'Stock', condition: 'Minto Ward' },
    { name: 'Taylor 814ce', brand: 'Taylor <Acoustic>', price: 'Rs.40000', sold: '98 sold', stock: 'Stock', condition: 'KeuzlaSh:Al' },
    { name: 'Ibanez RG Series', brand: 'Ibanez <Electric>', price: 'Rs.12000', sold: '87 sold', stock: 'Stock 25', condition: 'SarafliGudaHead' }
  ];

  const productCatalog = [
    { name: 'Boss Tuner Pedal', category: 'SN coll', price: 'Rs.1500', sold: '298 sold', stock: 'In Stock' },
    { name: 'Ernie Ball Strings', category: 'Strings', price: 'Rs.600', sold: '1250 sold', stock: 'In Stock' },
    { name: 'Leather Guitar Strap', category: 'Accessories', price: 'Rs.750', sold: '426 sold', stock: 'In Stock' },
    { name: 'Hardshell Case', category: 'Cases', price: 'Rs.1500', sold: '208 sold', stock: 'Low Stock' }
  ];

  return (
    <div className="admin-dashboard">
      <header className="dashboard-header">
        <div className="logo">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2"/>
            <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2"/>
            <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2"/>
          </svg>
          <span>Chordify</span>
        </div>
        <h1>ADMIN DASHBOARD</h1>
        <div className="header-right">
          <button className="settings-btn">⚙️</button>
          <div className="user-avatar"></div>
        </div>
      </header>

      <div className="dashboard-content">
        <aside className="sidebar">
          <div className="sidebar-item active">
            <span className="icon">📊</span>
            <span>Dashboard</span>
          </div>
          <div className="sidebar-item">
            <span className="icon">🎸</span>
            <span>Guitar Listing</span>
          </div>
          <div className="sidebar-item">
            <span className="icon">📦</span>
            <span>Product Listing</span>
          </div>
          <div className="sidebar-item">
            <span className="icon">👤</span>
            <span>User Listing</span>
          </div>
        </aside>

        <main className="main-content">
          <div className="dashboard-section">
            <h2>Dashboard</h2>

            <div className="recent-customers-section">
              <div className="section-header">
                <h3>Recent Customers</h3>
                <a href="#" className="view-all">View All &gt;</a>
              </div>
              <table className="customers-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Joined</th>
                    <th>Order Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {recentCustomers.map((customer, index) => (
                    <tr key={index}>
                      <td>{customer.name}</td>
                      <td>{customer.email}</td>
                      <td>{customer.role}</td>
                      <td>{customer.joined}</td>
                      <td>
                        <span className={`status ${customer.status.toLowerCase()}`}>
                          {customer.status}
                        </span>
                      </td>
                      <td>
                        <button className="action-btn edit">✏️</button>
                        <button className="action-btn delete">🗑️</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="inventory-sections">
              <div className="guitar-inventory">
                <div className="section-header">
                  <h3>Guitar Inventory</h3>
                  <a href="#" className="view-all">View All &gt;</a>
                </div>
                <div className="inventory-grid">
                  {guitarInventory.map((guitar, index) => (
                    <div key={index} className="inventory-card">
                      <div className="card-icon guitar-icon">🎸</div>
                      <div className="card-content">
                        <h4>{guitar.name}</h4>
                        <p className="brand">{guitar.brand}</p>
                        <div className="card-details">
                          <span className="stock-info">{guitar.stock}</span>
                          <span className="condition">{guitar.condition}</span>
                        </div>
                        <div className="card-footer">
                          <span className="price">{guitar.price}</span>
                          <span className="sold">{guitar.sold}</span>
                        </div>
                      </div>
                      <div className="card-actions">
                        <button className="card-action-btn">✏️</button>
                        <button className="card-action-btn">🗑️</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="product-catalog">
                <div className="section-header">
                  <h3>Product Catalog</h3>
                  <a href="#" className="view-all">View All &gt;</a>
                </div>
                <div className="inventory-grid">
                  {productCatalog.map((product, index) => (
                    <div key={index} className="inventory-card">
                      <div className="card-icon product-icon">🎵</div>
                      <div className="card-content">
                        <h4>{product.name}</h4>
                        <p className="brand">{product.category}</p>
                        <div className="card-details">
                          <span className="stock-info">Stock: {index + 1}</span>
                          <span className={`stock-badge ${product.stock.toLowerCase().replace(' ', '-')}`}>
                            {product.stock}
                          </span>
                        </div>
                        <div className="card-footer">
                          <span className="price">{product.price}</span>
                          <span className="sold">{product.sold}</span>
                        </div>
                      </div>
                      <div className="card-actions">
                        <button className="card-action-btn">✏️</button>
                        <button className="card-action-btn">🗑️</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDash;
