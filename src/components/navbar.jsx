import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

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

  return (
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

        {/* <button className="btn btn-danger ms-auto" onClick={handleLogout}>
          Logout
        </button> */}
      </div>
    </nav>
  );
}

export default Navbar;
