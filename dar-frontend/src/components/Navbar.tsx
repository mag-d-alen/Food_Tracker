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
        background: "#f0e68cc2",
        alignItems: "center",
      }}
    >
      <div style={{ padding: "0.5rem" }}>
        <a href={`/food-items/`}>All foood Items</a>
      </div>
      <div style={{ padding: "0.5rem" }}>
        <Link to="/">Home</Link>
      </div>
      <div style={{ padding: "0.5rem" }}>
        <Link to="/my-meals">My Meals</Link>
      </div>
      <div style={{ padding: "0.5rem" }}>
        <Link to="/login">Login</Link>
      </div>
      <div style={{ fontSize: "0.3rem", margin: "0 0 -1rem 50%" }}>
        <a href="https://www.freepik.com/free-photo/top-view-fresh-vegetables-with-raw-pasta-black_15805988.htm#query=food%20background&position=29&from_view=search&track=ais">
          Image by KamranAydinov
        </a>
        on Freepik
      </div>
    </nav>
  );
};

export default Navbar;
