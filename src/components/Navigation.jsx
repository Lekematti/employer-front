import {Routes, Route, Navigate} from 'react-router-dom';
import Login from "./Login.jsx";
import Register from "./Register.jsx";
import Home from "./Home.jsx";
import {MainContext} from "../Context/MainContext.jsx";
import {useContext} from "react";
import WorkPlaces from "./WorkPlaces.jsx";

function Navigation() {
    const {isLogged} = useContext(MainContext);
    return (
        isLogged ? (
            <Routes>
                <Route path="/home" element={<Home/>}/>
                <Route path="/manage-work-places" element={<WorkPlaces/>}/>
                {/*<Route path="/add-roles" element={<AddRoles/>}/>
                <Route path="/manage-roles" element={<ManageRoles/>}/>
                <Route path="/manage-users" element={<ManageUsers/>}/>
                <Route path="/manage-work-hours" element={<ManageWorkHours/>}/>
                */}
            </Routes>
        ) : (
            <Routes>
                <Route path="/" element={<Navigate to="/login"/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/register" element={<Register/>}/>
            </Routes>
        )
    );
}


export default Navigation;
