import {useState} from 'react';
//import axios from 'axios';
import {useNavigate} from 'react-router-dom';

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();
    const toggleView = () => {
        navigate('/register');
    };

    const handleLogin = async (/*event*/) => {
        //event.preventDefault();

        // Mock successful login
        const mockSuccessfulLogin = true;

        // If login is successful, navigate to the home screen
        if (mockSuccessfulLogin) {
            navigate('/home');
        }

        // If login is successful, navigate to the main screen
        navigate('/home');
    };
    //ÄLÄ POISTA TÄTÄ
    /*const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('URL here', { email, password });
            console.log(res.data);
            // If login is successful, call handleLogin
            if (res.data.success) {
                await handleLogin(e);
            }
        } catch (err) {
            console.error(err);
        }
    };*/

    return (
        <>
            <form onSubmit={handleLogin}> {/* Use handleSubmit instead of handleLogin */}
                <h1>Login</h1>
                <div className="spacer"></div>
                <input type="email" value={email}
                       onChange={e=> setEmail(e.target.value)} placeholder="Email" required/>
                <input type="password" value={password}
                       onChange={e=> setPassword(e.target.value)} placeholder="Password" required/>
                <div className="spacer"></div>
                <button type="submit">Login</button>
                <div className="spacer"></div>
                <div>
                    <button onClick={toggleView}>
                        Go to Register
                    </button>
                </div>
            </form>
        </>
    );
}

export default Login;
