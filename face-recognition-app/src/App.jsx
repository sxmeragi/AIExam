import React, { useState, useEffect } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  Navigate,
  useNavigate,
} from "react-router-dom";
import FaceRecognition from "./components/FaceRecognition";
import ProductList from "./components/ProductList";
import AddProduct from "./components/AddProduct";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import Main from "./components/Main/Main";

const App = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const [userRole, setUserRole] = useState(null);
  const [accuracy, setAccuracy] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    setUserRole(null);
    setAccuracy(null);
    navigate("/login");
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetch(`${apiUrl}/user/role`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error("Unauthorized");
          }
          return res.json();
        })
        .then((data) => {
          setUserRole(data.role);
          setIsAuthenticated(true);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Error fetching user role:", err);
          localStorage.removeItem("token");
          setIsAuthenticated(false);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, []);

  const handleFaceRecognition = (role, accuracy) => {
    setUserRole(role);
    setAccuracy(accuracy);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Main></Main>
      {/* {!isAuthenticated ? (
        <Routes>
          <Route
            path="/login"
            element={
              <Login
                onLoginSuccess={() => {
                  setIsAuthenticated(true), navigate("/");
                }}
              />
            }
          />
          <Route path="/" element={<Navigate to="/login" />} />
        </Routes>
      ) : (
        <>
          <nav>
            <ul>
              <li>
                <Link to="/login">Login</Link>
              </li>

              <li>
                <Link to="/">FaceID</Link>
              </li>

              <li>
                <Link to="/products">Products</Link>
              </li>
              <li>
                {userRole === "director" ||
                  (userRole === "worker" && (
                    <Link to="/add-product">Add Product</Link>
                  ))}
              </li>
              <li>
                {userRole === "director" && (
                  <Link to="/dashboard">Dashboard</Link>
                )}
              </li>
              <li>
                <Link to="/login" onClick={handleLogout}>
                  Logout
                </Link>
              </li>
            </ul>
          </nav>

          <h1>Welcome to Face Recognition App</h1>

          <Routes>
            <Route
              path="/"
              element={
                <>
                  <FaceRecognition onFaceRecognized={handleFaceRecognition} />
                  {userRole && (
                    <>
                      <h3>Role - {userRole}</h3>
                      {accuracy && <h3>Accuracy: {accuracy.toFixed(2)}%</h3>}
                    </>
                  )}
                </>
              }
            />
            <Route path="/products" element={<ProductList />} />
            <Route
              path="/add-product"
              element={
                userRole === "director" || userRole === "worker" ? (
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
        </>
      )} */}
    </div>
  );
};

export default App;
