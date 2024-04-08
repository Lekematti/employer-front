// Home.jsx
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
        <div>
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
    );
}

export default Home;
