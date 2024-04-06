import Sidebar from './Sidebar';
import '../CSS/Home.css';


function Home() {
    return (
        <div className="home">
            <Sidebar/>
            <div className="main-content">
                <h1>Welcome to the home screen!</h1>
                {/* ... other code ... */}
            </div>
        </div>
    );
}

export default Home;