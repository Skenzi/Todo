import React from "react";
import LoginPage from "./pages/LoginPage.jsx";
import apiContext from "../context/index.js";
import { useContext } from "react";

const PrivateRoute = ({ children }) => {
    const {user} = useContext(apiContext);
    return user.username && user.password ? children : <LoginPage />;
};

export default PrivateRoute;