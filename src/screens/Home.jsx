import Sidebar from '../components/Sidebar';
import '../CSS/Home.css';
import {useState, useEffect} from 'react';

function Home() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const storedUser = sessionStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    return (
        <div className="home">
          <Sidebar/>
          <div className="main-content">
            <h1>Welcome to the home screen!</h1>
            {user && (
                <div>
                    <p>Welcome, {user.name}!</p>
                    <p>Business ID: {user.businessId}</p>
                    <p>Address: {user.address}</p>
                    <p>Phone: {user.phone}</p>
                </div>
            )}
            {/* ... other code ... */}
          </div>
        </div>
    );
}

export default Home;
