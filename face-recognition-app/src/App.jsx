import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import FaceRecognition from "./components/FaceRecognition";
import ProductList from "./components/ProductList";
import AddProduct from "./components/AddProduct";
import Dashboard from "./components/Dashboard";


const App = () => {

  const apiUrl = import.meta.env.VITE_API_URL;
  const [userRole, setUserRole] = useState(null);
  const [accuracy, setAccuracy] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetch(`${apiUrl}/user/role`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setUserRole(data.role);
        })
        .catch((err) => console.error("Error fetching user role:", err));
    }
  }, []);

  const handleFaceRecognition = (role, accuracy) => {
    setUserRole(role);
    setAccuracy(accuracy);
  };

  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/products">Products</Link>
            </li>
            <li>
              {userRole === "director" && (
                <Link to="/add-product">Add Product</Link>
              )}
            </li>
            <li>
              {userRole === "director" && (
                <Link to="/dashboard">Dashboard</Link>
              )}
            </li>
          </ul>
        </nav>

        <h1>Welcome to Face Recognition App</h1>

        <Routes>
          <Route
            path="/"
            element={
              <>
                <h2>Welcome to the Home Page</h2>
                <FaceRecognition onFaceRecognized={handleFaceRecognition} />
                {accuracy && <p>Face Recognition Accuracy: {accuracy}%</p>}
                {userRole && <p>Your role: {userRole}</p>}
              </>
            }
          />

          <Route path="/products" element={<ProductList />} />

          <Route
            path="/add-product"
            element={
              userRole === "worker" ? (
                <AddProduct />
              ) : (
                <p>You don't have permission to add products.</p>
              )
            }
          />

          <Route
            path="/dashboard"
            element={
              userRole === "director" ? (
                <Dashboard />
              ) : (
                <p>You don't have permission to access this page.</p>
              )
            }
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
