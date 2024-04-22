import Sidebar from '../components/Sidebar';
import '../CSS/Home.css';
import { useState, useEffect } from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUser} from "@fortawesome/free-solid-svg-icons";
import IconsComponent from "../components/IconsComponent.jsx";

function Home() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const storedUser = sessionStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    return (
        <div className="home" >
            <Sidebar />
            <IconsComponent />
            <div className="main-content">
                <div className="header-container">
                    <h1>Welcome to the home screen!</h1>
                    {user && (
                        <div className="user-info">
                            <p>Welcome, {user.name}!</p>
                            <p>Business ID: {user.businessId}</p>
                            <p>Address: {user.address}</p>
                            <p>Phone: {user.phone}</p>
                        </div>
                    )}
                </div>
                <div className="large-box">
                    <div className="inner-box-container">
                        <div className="box">
                        <a href="/path-to-workplace-page">
                            <img src="/src/assets/building.jpg" alt="Building" />
                            <div className="box-header">Workplace 1</div>
                            <div className="box-text"><FontAwesomeIcon icon={faUser}style={{ color: 'green', fontSize: '10px' }}/> Users 5/5</div>
                            </a>
                        </div>
                        <div className="box">
                        <a href="/path-to-workplace-page">
                            <img src="/src/assets/building.jpg" alt="Building" />
                            <div className="box-header">Workplace 2</div>
                            <div className="box-text"><FontAwesomeIcon icon={faUser} style={{ color: 'green', fontSize: '10px' }}/> Users 11/13</div>
                            </a>
                        </div>
                        <div className="box">
                        <a href="/path-to-workplace-page">
                            <img src="/src/assets/building.jpg" alt="Building" />
                            <div className="box-header">Workplace 3</div>
                            <div className="box-text"><FontAwesomeIcon icon={faUser} style={{ color: 'green', fontSize: '10px' }}/> Users 10/24</div>
                            </a>
                        </div>
                        <div className="box">
                        <a href="/path-to-workplace-page">
                            <img src="/src/assets/building.jpg" alt="Building" />
                            <div className="box-header">Workplace 4</div>
                            <div className="box-text"><FontAwesomeIcon icon={faUser} style={{ color: 'green', fontSize: '10px' }}/> Users 12/13</div>
                            </a>
                        </div>
                        <div className="box">
                        <a href="/path-to-workplace-page">
                            <img src="/src/assets/building.jpg" alt="Building" />
                            <div className="box-header">Workplace 5</div>
                            <div className="box-text"><FontAwesomeIcon icon={faUser} style={{ color: 'green', fontSize: '10px' }}/> Users 2/24</div>
                            </a>
                        </div>
                        <div className="box">
                        <a href="/path-to-workplace-page">
                            <img src="/src/assets/building.jpg" alt="Building" />
                            <div className="box-header">Workplace 6</div>
                            <div className="box-text"><FontAwesomeIcon icon={faUser} style={{ color: 'gray', fontSize: '10px' }}/> Users 0/6</div>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;