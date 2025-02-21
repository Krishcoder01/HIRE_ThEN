import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../Components/Home";
import Register from "../Components/Register";
import Login from "../Components/Login";
import Dashboard from "../Components/Dashboard";

const Routing =()=>{

    const routesConfig=[
        { path : "/" , component : <Home/>},
        { path : "/login" , component : <Login/>},
        { path : "/register" , component : <Register/>},
        { path : "/dashboard" , component : <Dashboard/>},
    ]

    return(
        <Routes>
            {routesConfig.map((route,index)=>(
                <Route key={index} path={route.path} element={route.component}/>
            ))}
        </Routes>
    )
}

export default Routing;