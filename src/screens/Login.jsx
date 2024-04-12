// Login.jsx
import {useContext, useState} from 'react';
import axios from 'axios';
import {useNavigate} from "react-router-dom";
import {MainContext} from "../Context/MainContext.jsx";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const {setIsLogged, setUser} = useContext(MainContext);

    const toggleView = () => {
        navigate('/register');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:3000/auth/employee/login', { email, password });
            if (res.data) {
               sessionStorage.setItem('token', JSON.stringify(res.data.token));
                setIsLogged(true);
                setUser(res.data);
                navigate('/home');
            }
        } catch (err) {
            setError("Invalid credentials");
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h1>Login</h1>
            <div className="spacer"></div>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" required/>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password"
                   required/>
            {error && <p>{error}</p>}
            <button type="submit">Login</button>
            <div>
                <button onClick={toggleView}>
                    Go to Register
                </button>
            </div>
        </form>
    );
}

export default Login;