import {Routes, Route, Navigate} from 'react-router-dom';
import Login from "../screens/Login.jsx";
import Register from "../screens/Register.jsx";
import Home from "../screens/Home.jsx";
import ManageWorkHours from "../screens/workHours.jsx";
import {MainContext} from "../Context/MainContext.jsx";
import {useContext} from "react";
import WorkPlaces from "../screens/WorkPlaces.jsx";
import IconsComponent from './IconsComponent.jsx';

function Navigation() {
    const {isLogged} = useContext(MainContext);

    return (
        <>
            {isLogged && <IconsComponent />}
            <Routes>
                {isLogged ? (
                    <>
                        <Route path="/home" element={<Home/>}/>
                        <Route path="/manage-work-places" element={<WorkPlaces/>}/>
                        <Route path="/manage-work-hours" element={<ManageWorkHours/>}/>
                        {/* More authenticated routes */}
                    </>
                ) : (
                    <>
                        <Route path="/" element={<Navigate to="/login"/>}/>
                        <Route path="/login" element={<Login/>}/>
                        <Route path="/register" element={<Register/>}/>
                        {/* Potentially more public routes */}
                    </>
                )}
            </Routes>
        </>
    );
}


export default Navigation;
