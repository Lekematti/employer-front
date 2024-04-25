import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import '../CSS/Home.css';
import workAreaHooks from '../hooks/workAreaHooks'; 
import { MainContext } from '../Context/MainContext';
import { useNavigate } from 'react-router-dom';

function Home() {
    const [workAreas, setWorkAreas] = useState([]);
    const { getWorkAreasByCompanyId } = workAreaHooks();
    const { user } = React.useContext(MainContext);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchWorkAreas = async () => {
            const companyId = user.account.id; // Use the relevant company ID from context
            const fetchedWorkAreas = await getWorkAreasByCompanyId(companyId);
            if (fetchedWorkAreas) {
                // Sort the work areas by active users, descending
                const sortedWorkAreas = fetchedWorkAreas.sort((a, b) => b.active_users - a.active_users);
                setWorkAreas(sortedWorkAreas);
            }
        };
        
        fetchWorkAreas();
    }, [user.account.id]);

    const handleCreateWorkArea = () => {
        // Navigate to the Create Work Area page
        // Replace this with your actual navigation logic
        navigate('/manage-work-places');
    };

    return (
        <div className="home">
            <div className="main-content">
                <div className="header-container">
                    <h1>Welcome to the home screen!</h1>
                </div>
                <div className="large-box">
                    <div className="inner-box-container">
                        {workAreas.length > 0 ? (
                            workAreas.map((workArea) => (
                                <div key={workArea.id} className="box">
                                    <a href={`/workplace/${workArea.id}`}>
                                        <img src="/src/assets/building.jpg" alt={workArea.name} />
                                        <div className="box-header">{workArea.name}</div>
                                        <div className="box-text">{workArea.description}</div>
                                        <div className="box-footer">
                                            <FontAwesomeIcon icon={faUser} style={{ color: (workArea.active_users > 0) ? 'green' : 'grey', fontSize: '10px' }}/> 
                                            {(workArea.active_users == null || workArea.total_users == null) ?
                                                "No users in workplace yet" :
                                                `Users: ${workArea.active_users}/${workArea.total_users}`
                                            }
                                        </div>
                                    </a>
                                </div>
                            ))
                        ) : (
                            <div className="no-work-areas">
                                <p>No work areas created yet.</p>
                                <button onClick={handleCreateWorkArea} className="create-work-area-btn">
                                    Create Work Area
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
