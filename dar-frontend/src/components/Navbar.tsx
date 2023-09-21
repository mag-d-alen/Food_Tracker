import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav
      style={{
        display: "flex",
        flexDirection: "row",
        gap: "1.5rem",
        width: "100%",
        height: "4rem",
        background: "khaki",
        alignItems: "center",
      }}>
      <div style={{ padding: "0.5rem" }}>
        <a href={`/food-items/`}>All foood Items</a>
      </div>
      <div style={{ padding: "0.5rem" }}>
        <Link to="/">Home</Link>
      </div>
      <div style={{ padding: "0.5rem" }}>
        <Link to="/my-meals">My Meals</Link>
      </div>
    </nav>
  );
};

export default Navbar;
