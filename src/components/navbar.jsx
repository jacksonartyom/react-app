import React, { useState, useEffect } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { useCart } from "../context/CartContext";
import Cart from "../components/cart";

function Navbar() {
  const { cart } = useCart();

  const totalQty = cart.reduce((sum, i) => sum + i.qty, 0);

  const navigate = useNavigate();
  const location = useLocation();

  const [isOpen, setIsOpen] = useState(false);
  const [showCart, setShowCart] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsOpen(false);
    navigate("/");
  };

  // 🔥 ปิด sidebar เวลาเปลี่ยนหน้า
  useEffect(() => {
    setShowCart(false);
  }, [location]);

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-3">
        {/* Logo */}
        <NavLink className="navbar-brand" to="/home" onClick={handleClose}>
          JZ Stock
        </NavLink>

        {/* Toggle button */}
        <button className="navbar-toggler" type="button" onClick={handleToggle}>
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Menu */}
        <div className={`collapse navbar-collapse ${isOpen ? "show" : ""}`}>
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <NavLink
                to="/items"
                onClick={handleClose}
                className={({ isActive }) =>
                  "nav-link " + (isActive ? "active fw-bold" : "")
                }
              >
                Items
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/sale"
                onClick={handleClose}
                className={({ isActive }) =>
                  "nav-link " + (isActive ? "active fw-bold" : "")
                }
              >
                Sale
              </NavLink>
            </li>
          </ul>

          {/* 🛒 ปุ่ม Cart */}
          <button
            className="btn btn-outline-light position-relative"
            onClick={() => setShowCart(true)}
          >
            🛒
            {totalQty > 0 && (
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                {totalQty}
              </span>
            )}
          </button>

          {/* Sidebar Cart */}
        </div>
      </nav>

      {/* overlay */}
      {showCart && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100"
          style={{ background: "rgba(0,0,0,0.5)", zIndex: 1040 }}
          onClick={() => setShowCart(false)}
        ></div>
      )}

      {/* sidebar */}
      <div
        className="position-fixed top-0 bg-white p-3"
        style={{
          width: "350px",
          height: "100%",
          zIndex: 1050,
          overflowY: "auto",
          right: showCart ? "0" : "-350px", // ✅ ตรงนี้
          transition: "right 0.3s ease", // 🔥 เพิ่มความลื่น
        }}
      >
        <div className="d-flex justify-content-between align-items-center mb-2">
          <h5>Cart</h5>
          <button
            className="btn btn-sm btn-danger"
            onClick={() => setShowCart(false)}
          >
            X
          </button>
        </div>

        <Cart />
      </div>
    </>
  );
}

export default Navbar;
