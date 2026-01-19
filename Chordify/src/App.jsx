import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminLayout from './layouts/AdminLayout'; // <-- import layout
import AdminDashboard from './pages/AdminDashboard';
import ProductListing from './pages/ProductListing';
import UserListing from './pages/UserListing';
import GuitarListing from './pages/GuitarListing';

function App() {
  return (
      <Routes>
        <Route element={<AdminLayout />}>
          <Route path="/" element={<AdminDashboard />} />
          <Route path="/products" element={<ProductListing />} />
          <Route path="/users" element={<UserListing />} />
          <Route path="/guitars" element={<GuitarListing />} />
        </Route>
      </Routes>
  );
}

export default App;
