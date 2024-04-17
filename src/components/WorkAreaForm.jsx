import {useContext, useEffect, useState} from "react";
import PropTypes from "prop-types";
import WorkAreaHooks from "../hooks/workAreaHooks.js";
import {MainContext} from "../Context/MainContext.jsx";

function WorkAreaForm({ marker }) {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [radius, setRadius] = useState('');
    const [accessCode, setAccessCode] = useState('');
    const [latitude, setLatitude] = useState('60.0000');
    const [longitude, setLongitude] = useState('24.0000');
    const {createWorkArea} = WorkAreaHooks()
    const {user} = useContext(MainContext);

    useEffect(() => {
        if (marker && marker.latitude && marker.longitude) {
            setLatitude(marker.latitude);
            setLongitude(marker.longitude);
            console.log("Updated Latitude:", latitude);
            console.log("Updated Longitude:", longitude);
        }
    }, [marker]);

    console.log(user)
    console.log(user.businessId);
    console.log(user.account.businessId);
    const handleSubmit = async (event) => {
        event.preventDefault();

        const workArea = {
            company_id: user.account.businessId,
            name,
            description,
            latitude,
            longitude,
            radius,
            access_code: accessCode,
        };

        try {
            const response = await createWorkArea(workArea);
            console.log(response.data);
        } catch (error) {
            console.error('There was an error!', error);
        }
    };
    return (
        <form onSubmit={handleSubmit}>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" required/>
            <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" required/>

            <input type="text" value={latitude} readOnly placeholder="Latitude" required/>
            <input type="text" value={longitude} readOnly placeholder="Longitude" required/>

            <input type="text" value={radius} onChange={(e) => setRadius(e.target.value)} placeholder="Radius" required/>
            <input type="text" value={accessCode} onChange={(e) => setAccessCode(e.target.value)} placeholder="Access Code" required/>
            <button type="submit">Create Work Area</button>
        </form>
    );
}


WorkAreaForm.propTypes = {
    marker: PropTypes.shape({
        lat: PropTypes.string,
        lng: PropTypes.string,
        latitude: PropTypes.string,
        longitude: PropTypes.string
    })
};
export default WorkAreaForm;