// Login.jsx
import {useState} from 'react';
import axios from 'axios';
import {useNavigate} from "react-router-dom";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:3000/auth/employee/login', { email, password });
            if (res.data) {
                sessionStorage.setItem('user', JSON.stringify(res.data));
                navigate('/home');
            }
        } catch (err) {
            setError("Invalid credentials");
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" required/>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" required/>
            {error && <p>{error}</p>}
            <button type="submit">Login</button>
        </form>
    );
}

export default Login;
