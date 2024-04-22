
import { useContext, useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { MainContext } from "../Context/MainContext.jsx";
import '../CSS/Login.css';

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { setIsLogged, setUser } = useContext(MainContext);

  const toggleView = () => {
    navigate('/register');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        'http://localhost:3000/auth/employee/login',
        { email, password }
      );
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
    <>
    <div className="otsikko">
    <img src="../src/assets/logo.png" className="logo"></img>
      <h1>WORKPLACE TRACKER</h1>
    </div>
    
    <div className="otsikko2">
            <h1>Welcome ‎ ‎‎ ‎‎‎ ‎back!</h1>
            </div>
            <div className="otsikko3">
            <h1>Log ‎ ‎‎ ‎‎ ‎‎ ‎‎ ‎‎ ‎‎ ‎‎ ‎‎ ‎‎‎ ‎‎ ‎‎ ‎‎ ‎‎‎ ‎‎ ‎‎‎in</h1>
            </div>
            <div className="otsikko4">
            <h1>Sign ‎ ‎‎ ‎‎ ‎‎ ‎‎ ‎‎ ‎‎ ‎‎ ‎‎ ‎‎ ‎‎‎‎‎‎‎ ‎‎‎ ‎‎‎ ‎‎‎ ‎ ‎‎‎ ‎ up</h1>
            </div>
       
    <div className="tausta">
        <img src="../src/assets/kuva.png" className="kuva" />
            </div>
      <div className="login-container">
        <form onSubmit={handleSubmit}>
          <h1 className="centered">Login</h1>
          <p>Please enter your credentials.</p>
          <div className="spacer"></div>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />
          {error && <p>{error}</p>}
          <button type="submit" style={{ marginBottom: '20px' }}>Login</button>
        </form>
          <div className="account-text">
            <p>Don't have an account?</p>
            <button onClick={toggleView} className="register-button">Register</button>
          </div>
        </div>
  </>
  );
}

export default Login;