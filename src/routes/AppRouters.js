import { Routes } from "react-router-dom";
import { Route } from "react-router-dom";

import Home from "../views/Home";
import Login from "../views/Login";
import SignUp from "../views/SignUp";

const AppRouters = (props) => {
    return (
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/login" element={<Login user={props.user} setUser={props.setUser} />}/>
            <Route path="/signup" element={<SignUp/>}/>
        </Routes>
    )
}

export default AppRouters;