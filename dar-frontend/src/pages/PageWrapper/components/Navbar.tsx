import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const isLoggedIn = !!localStorage.getItem("token");
  return (
    <nav className="navbar">
      <div className="navbar__tab">
        <a href={`/food-items/`}>All food Items</a>
      </div>
      <div className="navbar__tab">
        <Link to="/">Home</Link>
      </div>
      <div className="navbar__tab">
        <Link to="/my-meals">My Meals</Link>
      </div>
      <div className="navbar__tab">
        <Link to="/login">{isLoggedIn ? "Logout" : "Login"}</Link>
      </div>
      <div>
        Image by KamranAydinov
        <a href="https://www.freepik.com/free-photo/front-view-vegetable_15718656.htm#fromView=search&page=1&position=47&uuid=c10af5f0-b6b7-4074-b87d-71a0cb5cbd1d">
          on Freepik
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
