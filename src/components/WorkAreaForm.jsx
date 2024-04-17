import {useContext, useEffect, useState} from "react";
import PropTypes from "prop-types";
import WorkAreaHooks from "../hooks/workAreaHooks.js";
import {MainContext} from "../Context/MainContext.jsx";

function WorkAreaForm({marker}) {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [radius, setRadius] = useState('');
    /* const [latitude, setLatitude] = useState("60.0000");
     const [longitude, setLongitude] = useState("24.0000");*/
    const {createWorkArea} = WorkAreaHooks()
    const {user} = useContext(MainContext);

    /* useEffect(() => {
         if (marker) {
             setLatitude(marker.latitude);
             setLongitude(marker.longitude);
             //console.log("Updated Latitude:", latitude);
             //console.log("Updated Longitude:", longitude);
         }
     }, [marker]);*/

    if (marker) {
        console.log("marker", marker.lat.toString());
    }
    const handleSubmit = async (event) => {
            event.preventDefault();
            if (!marker) {
                console.error('No marker data available');
                return;
            }
            console.log("position", marker.lng, marker.lat);
            const workArea = {
                company_id: user.account.businessId.toString(),
                name,
                description,
                latitude: marker.lat.toString(),
                longitude: marker.lng.toString(),
                radius,
            };
            try {
                const response = await createWorkArea(workArea);
                console.log(response);
            } catch (error) {
                console.error('There was an error!', error);
            }
        };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" required/>
            <input type="text" value={description} onChange={(e) => setDescription(e.target.value)}
                   placeholder="Description" required/>

            {/*<input type="text" value={latitude} onChange={(e) => setLatitude(e.target.value)} placeholder="Latitude" required/>
            <input type="text" value={longitude} onChange={(e) => setLongitude(e.target.value)} placeholder="Longitude" required/>*/}

            <input type="text" value={radius} onChange={(e) => setRadius(e.target.value)} placeholder="Radius"
                   required/>
            <button type="submit">Create Work Area</button>
        </form>
    );
}

WorkAreaForm.propTypes = {
    marker: PropTypes.object
};


export default WorkAreaForm;