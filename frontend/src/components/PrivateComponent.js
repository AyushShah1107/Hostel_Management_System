import { Navigate,Outlet } from "react-router-dom";
import React from "react";
const PrivateComponent=()=>{
    let auth=localStorage.getItem("stduser");
    return auth?<Outlet></Outlet>:<Navigate to="/signup"></Navigate>
}
export {PrivateComponent}