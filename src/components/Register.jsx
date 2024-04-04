import { useState } from 'react';
import axios from 'axios';

function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [address, setAddress] = useState("");
    const [phone, setPhone] = useState("");
    const [businessId, setBusinessId] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('/api/register', { name, email, password, address, phone, businessId });
            console.log(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Full Name" required />
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" required />
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" required />
            <input type="text" value={address} onChange={e => setAddress(e.target.value)} placeholder="Address" required />
            <input type="text" value={phone} onChange={e => setPhone(e.target.value)} placeholder="Phone Number" required />
            <input type="text" value={businessId} onChange={e => setBusinessId(e.target.value)} placeholder="Business ID" required />
            <button type="submit">Register</button>
        </form>
    );
}

export default Register;
