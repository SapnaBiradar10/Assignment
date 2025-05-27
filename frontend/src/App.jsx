import { Route, Routes, Link } from 'react-router-dom';
import Home from './Routing/Home';
import Products from './Routing/Products';
import Wishlist from './Routing/Wishlist';
import ProtectedRoute from './Routing/ProtectedRoute';
import AuthForm from './Routing/Authform';
import About from './Routing/About';

// Optional: Simple 404 component
function PageNotFound() {
  return (
    <div className="text-center mt-5">
      <h2>404 - Page Not Found</h2>
      <Link to="/" className="btn btn-primary mt-3">Go Home</Link>
    </div>
  );
}

function App() {
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-dark">
        <div className="container-fluid">
          <Link to="/" className="navbar-brand text-white">Home</Link>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-4 mb-2 mb-lg-0">
              <li className="nav-item">
                <Link to="/pro" className="nav-link text-white">Products</Link>
              </li>
              <li className="nav-item">
                <Link to="/wish" className="nav-link text-white">Wishlist</Link>
              </li>
              <li className="nav-item">
                <Link to="/about" className="nav-link text-white">About</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/pro" element={<Products />} />
          <Route path="/wish" element={<Wishlist />} />
          <Route path="/about" element={<About />} />
        </Route>
        <Route path="/auth" element={<AuthForm />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
}

export default App;