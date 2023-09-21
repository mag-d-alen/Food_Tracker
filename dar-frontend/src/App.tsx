import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar.tsx";
import { MealsList } from "./components/meals/MealsList.tsx";
import { Home } from "./components/Home.tsx";
import { FoodItemsList } from "./components/FoodItemsList.tsx";

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/my-meals" element={<MealsList />} />
          <Route path="/food-items" element={<FoodItemsList />} />
        </Routes>
      </Router>
    </>
  );
}
export default App;
