import {Routes, Route, Navigate} from 'react-router-dom';
import Login from "../screens/Login.jsx";
import Register from "../screens/Register.jsx";
import Home from "../screens/Home.jsx";
import ManageWorkHours from "../screens/workHours.jsx";
import {MainContext} from "../Context/MainContext.jsx";
import {useContext} from "react";
import WorkPlaces from "../screens/WorkPlaces.jsx";

function Navigation() {
    const {isLogged} = useContext(MainContext);
    return (
        isLogged ? (
            <Routes>
                <Route path="/home" element={<Home/>}/>
                <Route path="/manage-work-places" element={<WorkPlaces/>}/>
                <Route path="/manage-work-hours" element={<ManageWorkHours/>}/>
                {/* <Route path="/add-roles" element={<AddRoles/>}/>
                <Route path="/manage-roles" element={<ManageRoles/>}/>
                <Route path="/manage-users" element={<ManageUsers/>}/> */}
               
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
