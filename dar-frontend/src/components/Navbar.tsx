import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar__tab">
        <a href={`/food-items/`}>All foood Items</a>
      </div>
      <div className="navbar__tab">
        <Link to="/">Home</Link>
      </div>
      <div className="navbar__tab">
        <Link to="/my-meals">My Meals</Link>
      </div>
      <div className="navbar__tab">
        <Link to="/login">Login</Link>
      </div>
      <div>
        <a href="https://www.freepik.com/free-photo/top-view-fresh-vegetables-with-raw-pasta-black_15805988.htm#query=food%20background&position=29&from_view=search&track=ais">
          Image by KamranAydinov
        </a>
        on Freepik
      </div>
    </nav>
  );
};

export default Navbar;
