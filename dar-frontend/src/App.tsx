import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar.tsx";
import { Home } from "./components/Home.tsx";
import { FoodItemsList } from "./components/foodItem/FoodItemsList.tsx";
import { Login } from "./components/auth/login.tsx";
import { MealsPage } from "./components/meals/MealsPage.tsx";

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/my-meals" element={<MealsPage />} />
          <Route path="/food-items" element={<FoodItemsList />} />
        </Routes>
      </Router>
    </>
  );
}
export default App;
