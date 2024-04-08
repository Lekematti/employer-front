import {Routes, Route, Navigate} from 'react-router-dom';
import Login from "./Login.jsx";
import Register from "./Register.jsx";
import Home from "./Home.jsx";

function Navigation() {
    return (
        <div>
            <Routes>
                <Route path="/" element={<Navigate to="/login"/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/register" element={<Register/>}/>
                <Route path="/home" element={<Home/>}/>
                {/*<Route path="/add-roles" element={<AddRoles/>}/>
                <Route path="/manage-roles" element={<ManageRoles/>}/>
                <Route path="/manage-users" element={<ManageUsers/>}/>
                <Route path="/manage-work-hours" element={<ManageWorkHours/>}/>
                <Route path="/manage-work-places" element={<ManageWorkPlaces/>}/>*/}
            </Routes>
        </div>
    );
}


export default Navigation;
