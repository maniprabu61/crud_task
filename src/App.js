import React, { useState, useEffect } from "react";
import { Routes, Route, Link, useLocation, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AuthService from "./services/auth.service";

import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import Profile from "./components/Profile";
import NavigationMenu from "./components/NavigationMenu";
import LandingPage from "./components/LandingPage";
import Userlist from "./components/Userlist";
import ErrorPage from "./components/CustomError";

const App = () => {
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    AuthService.loadAllusers()
  }, []);
  useEffect(() => {authCheck(location.pathname);}, [location.pathname]);

  const user = localStorage.getItem('user');
  function authCheck(url) {
    const publicPaths = ['/login', '/register', '/'];
    if (!user && !publicPaths.includes(url)) {
      navigate('/login');
    }
}

  return (
    <div>
      <NavigationMenu/>

      <div className="container mt-3">
        <Routes>
          <Route exact path={"/"} element={<LandingPage />} />
          <Route exact path={"/home"} element={<Home />} />
          <Route exact path={"/login"} element={<Login />} />
          <Route exact path={"/register"} element={<Register />} />
          <Route exact path={"/register/:id"} element={<Register />} />
          <Route exact path={"/profile"} element={<Profile />} />
          <Route exact path={"/users"} element={<Userlist />} />
          <Route path={"*"} element={<ErrorPage />} />

        </Routes>
      </div>
    </div>
  );
};

export default App;
