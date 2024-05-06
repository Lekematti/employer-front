import {useState} from 'react';
import '../CSS/Register.css';
import axios from 'axios';
import {useNavigate} from "react-router-dom";

function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [address, setAddress] = useState("");
    const [phone, setPhone] = useState("");
    const [businessId, setBusinessId] = useState("");
    const [picture, setPicture] = useState(null);

    const navigate = useNavigate();
    const toggleView = () => {
        navigate('/login');
    };

const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('address', address);
    formData.append('phone', phone);
    formData.append('businessId', businessId);
    formData.append('picture', picture);

    try {
        const res = await axios.post('http://localhost:3000/auth/employee/register', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        console.log(res.data);
    } catch (err) {
        console.error(err);
        }
    };

const handlePictureChange = (e) => {
    setPicture(e.target.files[0]);
};

    return (
        <>
         <div className="background-container">
        <div className="otsikko">
        <img src="../src/assets/logo.png" className="logo"></img>
          <h1>WORKPLACE TRACKER</h1>
        </div>
        <div className="otsikko2">
        <h1>Welcome ‎ ‎‎ ‎‎‎ ‎back!</h1>
            </div>
            <div className="otsikko5">
            <h1>Log ‎ ‎‎ ‎‎ ‎‎ ‎‎ ‎‎ ‎‎ ‎‎ ‎‎ ‎‎‎ ‎‎ ‎‎ ‎‎ ‎‎‎ ‎‎ ‎‎‎in</h1>
            </div>
            <div className="otsikko6">
            <h1>Sign ‎ ‎‎ ‎‎ ‎‎ ‎‎ ‎‎ ‎‎ ‎‎ ‎‎ ‎‎ ‎‎‎‎‎‎‎ ‎‎‎ ‎‎‎ ‎‎‎ ‎ ‎‎‎ ‎ up</h1>
            </div>
       
        <div className="tausta">
        <img src="../src/assets/kuva.png" className="kuva" />
            </div>
        <div className="register-container">
        <form onSubmit={handleSubmit}>
            <h1 className="centered">Register</h1>
       
            <div className="spacer"></div>
            <input type="file" onChange={handlePictureChange}
                   required/>
                   <div className="spacer"></div>
            <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Full name" required/>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" required/>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password"
                   required/>
            <input type="text" value={address} onChange={e => setAddress(e.target.value)} placeholder="Address"
                   required/>
            <input type="number" value={phone} onChange={e => setPhone(e.target.value)} placeholder="Phone number"
                   required/>
            <input type="text" value={businessId} onChange={e => setBusinessId(e.target.value)}
                   placeholder="Business ID" required/>
            <button type="submit">Register</button>
            <div className="account-text">
            <p>Already have an account?</p>
                <button onClick={toggleView} className="login-button">
                    Login
                </button>
                </div>
        </form>
        </div>
        </div>
        </>
    );
}

export default Register;
