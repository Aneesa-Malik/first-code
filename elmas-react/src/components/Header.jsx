import { useEffect, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { useCart } from "../context/CartContext.jsx";
import { useSearch } from "../context/SearchContext.jsx";

const ROUTE_MAP = {
  home: "/",
  jewellery: "/jewellery",
  jewelry: "/jewellery",
  collections: "/collections",
  collection: "/collections",
  contact: "/contact",
  register: "/register",
  registor: "/register",
  login: "/login",
  price: "/estimator",
  pricing: "/estimator",
  cart: "/cart",
};

export default function Header() {
  const { user, logout } = useAuth();
  const { items } = useCart();
  const { query, setQuery } = useSearch();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  // Clear the search box and close the mobile menu whenever the page changes
  useEffect(() => {
    setQuery("");
    setOpen(false);
  }, [pathname]); // eslint-disable-line react-hooks/exhaustive-deps

  const liveFilter = pathname === "/jewellery" || pathname === "/collections";
  const placeholder =
    pathname === "/jewellery"
      ? "Search exquisite collection..."
      : pathname === "/collections"
      ? "Filter this collection..."
      : "Search page...";

  function handleKeyDown(e) {
    if (liveFilter || e.key !== "Enter") return;
    const input = query.toLowerCase().trim();
    if (ROUTE_MAP[input]) {
      navigate(ROUTE_MAP[input]);
    } else {
      alert(`Sorry, '${input}' page not found. Try searching 'Jewellery', 'Collections' or 'Contact'.`);
    }
  }

  return (
    <>
      <div className="top-bar text-center text-uppercase">
        ✨ Free Insured Shipping Across Pakistan on Orders Above Rs. 50,000 ✨
      </div>

      <nav className="navbar navbar-expand-lg navbar-light sticky-top shadow-sm">
        <div className="container">
          <Link className="navbar-brand" to="/">
            ELMAS <span>JEWELRY</span>
          </Link>

          <button
            className="navbar-toggler border-0"
            type="button"
            aria-label="Toggle navigation"
            onClick={() => setOpen((o) => !o)}
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className={`collapse navbar-collapse ${open ? "show" : ""}`} id="elmasNav">
            <ul className="navbar-nav mx-auto text-center">
              <li className="nav-item"><NavLink className="nav-link" to="/" end>Home</NavLink></li>
              <li className="nav-item"><NavLink className="nav-link" to="/collections">Collections</NavLink></li>
              <li className="nav-item"><NavLink className="nav-link" to="/jewellery">Jewellery</NavLink></li>
              <li className="nav-item"><NavLink className="nav-link" to="/estimator">Pricing</NavLink></li>
              <li className="nav-item"><NavLink className="nav-link" to="/contact">Contact</NavLink></li>
            </ul>

            <div className="d-flex align-items-center justify-content-center gap-4 mt-3 mt-lg-0">
              <input
                type="text"
                id="pageSearch"
                className="search-box d-none d-sm-block"
                placeholder={placeholder}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
              />

              <Link to="/cart" className="cart-container" title="View Shopping Bag">
                <i className="bi bi-bag-heart-fill cart-icon"></i>
                <span className="cart-badge">{items.length}</span>
              </Link>

              <div className="auth-links small text-uppercase tracking-wider">
                {user ? (
                  <>
                    <span className="text-muted me-2">Hi, {user.name}</span>
                    <a
                      href="#logout"
                      className="text-decoration-none fw-semibold"
                      style={{ color: "var(--luxury-gold)" }}
                      onClick={(e) => {
                        e.preventDefault();
                        logout();
                        navigate("/");
                      }}
                    >
                      Logout
                    </a>
                  </>
                ) : (
                  <>
                    <Link to="/login" className="text-decoration-none text-dark me-2 fw-semibold">Login</Link>
                    <span className="text-muted">|</span>
                    <Link to="/register" className="text-decoration-none ms-2 fw-semibold" style={{ color: "var(--luxury-gold)" }}>Register</Link>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
