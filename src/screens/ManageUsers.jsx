import React from 'react';
import '../CSS/ManageUsers.css'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog } from '@fortawesome/free-solid-svg-icons';

const ManageUsers = () => {
    const data = [
        { id: 1, name: 'John Doe', age: 30, email: 'john@example.com' },
        { id: 2, name: 'Jane Smith', age: 25, email: 'jane@example.com' },
        { id: 3, name: 'Bob Johnson', age: 40, email: 'bob@example.com' },
        { id: 4, name: 'Jane Smith', age: 25, email: 'jane@example.com' },
        { id: 5, name: 'Jane Smith', age: 25, email: 'jane@example.com' },
        { id: 6, name: 'Jane Smith', age: 25, email: 'jane@example.com' },
        { id: 7, name: 'Jane Smith', age: 25, email: 'jane@example.com' }
      ];
    
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
                            <th>ID</th>
                            <th>Name</th>
                            <th>Age</th>
                            <th>Email</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map(item => (
                            <tr key={item.id}>
                                <td>{item.id}</td>
                                <td>{item.name}</td>
                                <td>{item.age}</td>
                                <td>{item.email}</td>
                                <td>
                                    <a href="#" onClick={() => handleSettingsClick(item.id)}>
                                        <FontAwesomeIcon icon={faCog} className="settings-icon" />
                                    </a>
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