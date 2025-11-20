import React, { useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import "./Login.css";
import Header from "../header/Header";
import Button from "../product/Button";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const [state, setState] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handler = (event) => {
    const { name, value } = event.target;
    setState({ ...state, [name]: value });
  };

  const loginData = (event) => {
    event.preventDefault();

    axios
      .post(`${import.meta.env.VITE_API_URL}/login`, state)
      .then((res) => {
        if (res.data.token) {
          localStorage.setItem("token", res.data.token);
          localStorage.setItem("role", res.data.role);
          window.dispatchEvent(new Event("login"));
        }
Swal.fire("Success", res.data.message, "success").then(() => {
  if (res.data.role === "admin") navigate("/dashboard", { replace: true });
  else if (res.data.role === "seller") navigate("/seller", { replace: true });
  else navigate("/", { replace: true }); // buyer
});

      })
      .catch((err) => {
        Swal.fire("Login failed:", err.message, "error");
      });
  };

  return (
    <>
      <Header />

      <div className="login-page">
        <div className="login-card">

          <h2 className="login-title">Welcome Back</h2>
          <p className="login-subtitle">Please login to continue</p>

          <form onSubmit={loginData} className="login-form">

            <div className="form-group">
              <label>Email</label>
              <input
                type="text"
                name="email"
                placeholder="Enter your email"
                onChange={handler}
              />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                name="password"
                placeholder="Enter password"
                onChange={handler}
              />
            </div>

            <Button name="Login" />

            <div className="login-links">
              <p>
                Create New Account?{" "}
                <Link to="/sign" className="link">Sign Up</Link>
              </p>
              <p>
                Are you a seller?{" "}
                <Link to="/verify" className="link">Seller Login</Link>
              </p>
            </div>

          </form>
        </div>

        <div className="login-image">
          <img
            src="img/fun-3d-cartoon-teenage-boy-shopping.jpg"
            alt="Login"
          />
        </div>
      </div>
    </>
  );
}

export default Login;
