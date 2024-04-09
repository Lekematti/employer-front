import {useState} from 'react';
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
        <form onSubmit={handleSubmit}>
            <h1>Register</h1>
            <div className="spacer"></div>
            <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Full Name" required/>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" required/>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password"
                   required/>
            <input type="text" value={address} onChange={e => setAddress(e.target.value)} placeholder="Address"
                   required/>
            <input type="text" value={phone} onChange={e => setPhone(e.target.value)} placeholder="Phone Number"
                   required/>
            <input type="text" value={businessId} onChange={e => setBusinessId(e.target.value)}
                   placeholder="Business ID" required/>
            <input type="file" onChange={handlePictureChange}
                   required/>
            <div className="spacer"></div>
            <button type="submit">Register</button>
            <div className="spacer"></div>
            <div>
                <button onClick={toggleView}>
                    Go to Login
                </button>
            </div>
        </form>
    );
}

export default Register;
