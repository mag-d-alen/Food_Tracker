import { Route, Routes, Navigate, BrowserRouter } from "react-router-dom";
import "./App.css";

import { Home, LoginPage, Profile, FoodItemsPage, RegisterPage } from "./pages";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<RegisterPage />} />{" "}
        <Route path="/food-items" element={<FoodItemsPage />} />
        <Route
          path="/my-meals"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const isAuthenticated = !!window.sessionStorage.getItem("token");
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return children;
};
