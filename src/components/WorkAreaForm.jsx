import {useContext, useEffect, useState} from "react";
import PropTypes from "prop-types";
import WorkAreaHooks from "../hooks/workAreaHooks.js";
import {MainContext} from "../Context/MainContext.jsx";

function WorkAreaForm({ marker }) {
    const [company_id, setCompany_id] = useState('');
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [radius, setRadius] = useState('');
    const [latitude, setLatitude] = useState('60.0000');
    const [longitude, setLongitude] = useState('24.0000');
    const {createWorkArea} = WorkAreaHooks()
    const {user} = useContext(MainContext);

    useEffect(() => {
        if (marker && marker.latitude && marker.longitude) {
            setLatitude(marker.latitude);
            setLongitude(marker.longitude);
            //console.log("Updated Latitude:", latitude);
            //console.log("Updated Longitude:", longitude);
        }
    }, [latitude, longitude, marker]);


    useEffect(() => {
        if (user.account.businessId) {
            setCompany_id(user.account.businessId);
        }
    }
    , [user.account.businessId]);

    //console.log('user:', user);
    const handleSubmit = async (event) => {
        event.preventDefault();

        const workArea = {
            company_id: company_id.toString(),
            name,
            description,
            latitude,
            longitude,
            radius,
        };
        //console.log(workArea);
        try {
            const response = await createWorkArea(workArea);
            console.log(response);
        } catch (error) {
            console.error('There was an error!', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type={"hidden"} value={company_id}/>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" required/>
            <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" required/>

            <input type="text" value={latitude} readOnly placeholder="Latitude" required/>
            <input type="text" value={longitude} readOnly placeholder="Longitude" required/>

            <input type="text" value={radius} onChange={(e) => setRadius(e.target.value)} placeholder="Radius" required/>
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