import React, { useEffect, useState } from "react";
import AxiosInstance from "../config/axiosInstance.ts";
import { Link, useNavigate } from "react-router-dom";

interface LoginProps {
  onLogin: () => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const login = async () => {
    try {
      const response = await AxiosInstance.post("/users/login", {
        email,
        password,
      });

      //==============
      const expirationDate = new Date();
      expirationDate.setDate(expirationDate.getDate() + 2);

      const cookieValue =
        encodeURIComponent("token") +
        "=" +
        encodeURIComponent(response.data) +
        "; expires=" +
        expirationDate.toUTCString() +
        "; path=/";

      document.cookie = cookieValue;
      console.log(response.data);

      if (response.status === 200) {
        const token = response.data.data;
        localStorage.setItem("token", token);

        setIsLoggedIn(true);
        alert("Login successful");
        console.log("successfully logged");
        onLogin();
      }

      setEmail("");
      setPassword("");
      navigate("/");
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn, navigate]);

  return (
    <>
      <br />
      <br />
      <div className="container">
        <div className="row">
          <div className="col-6">
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                className="form-control"
                placeholder="Email here"
              />
            </div>
          </div>
          <div className="col-6">
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                className="form-control"
                placeholder="Password here"
              />
            </div>
          </div>
          <br />
          <div className="col-6 btn-center">
            <br />
            <button className="btn btn-primary col-12" onClick={login}>
              Login
            </button>
            <br />
            <br />
            <Link to="/signup" className="btn btn-outline-dark col-12">
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
