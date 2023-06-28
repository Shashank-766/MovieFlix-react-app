import React from "react";
import { UserAuth } from "./context/Auth_context";
import { Navigate } from "react-router-dom";

const ProtectedRoutes = ({ children }) => {
    const { user } = UserAuth();
    if (!user) {
        return <Navigate to="/" />;
    } else {
        return children;
    }
};

export default ProtectedRoutes;
