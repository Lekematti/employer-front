import React, { useState, useEffect, useContext } from 'react';
import '../CSS/ManageUsers.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog } from '@fortawesome/free-solid-svg-icons';
import userHooks from '../hooks/userHooks';
import { MainContext } from '../Context/MainContext';

const ManageUsers = () => {
    const { user } = useContext(MainContext); // Access user context
    const { getAllUsersByCompanyId } = userHooks();
    const [users, setUsers] = useState([]);

    useEffect(() => {
        // Assume user.account.companyId holds the ID of the company
        if (user.account && user.account.id) {
            getAllUsersByCompanyId(user.account.id).then(setUsers);
        }
    }, []);

    

    const handleSettingsClick = (userId) => {
        console.log("Settings clicked for user with ID:", userId);
    };

    return (
        <div className="page-container">
            <h1>Manage users</h1>
            <div className="container">
                <table>
                    <thead>
                        <tr>
                            <th>Photo</th>
                            <th>Name</th>
                            <th>Phone</th>
                            <th>Email</th>
                            <th>Settings</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            <tr key={user.id}>
                                <td>
                                    <img src={`http://localhost:3000/uploads/${user.picture || 'default_avatar.png'}`} alt={user.name} style={{ width: 50, height: 50, borderRadius: '50%' }}/>
                                </td>
                                <td>{user.name}</td>
                                <td>{user.phone}</td>
                                <td>{user.email}</td>
                                <td>
                                    <button onClick={() => handleSettingsClick(user.id)} style={{ border: 'none', background: 'none' }}>
                                        <FontAwesomeIcon icon={faCog} className="settings-icon" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default ManageUsers;
