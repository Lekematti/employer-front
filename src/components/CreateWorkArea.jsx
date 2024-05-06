import {MapContainer, TileLayer, useMapEvents} from "react-leaflet";
import "../CSS/WorkPlaces.css";
import CustomMarker from "./CustomMarker.jsx";
import {useState, useContext, useEffect} from "react";
import PropTypes from "prop-types";
import WorkAreaHooks from "../hooks/workAreaHooks.js";
import {MainContext} from "../Context/MainContext.jsx";

function CreateWorkArea() {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [radius, setRadius] = useState('');
    const [latitude, setLatitude] = useState(null);
    const [longitude, setLongitude] = useState(null);
    const [marker, setMarker] = useState(null);
    const [position, setPosition] = useState(null);
    const {createWorkArea} = WorkAreaHooks()
    const {user} = useContext(MainContext);

    const LocationMarker = () => {
        const map = useMapEvents({
            click(e) {
                const { lat, lng } = e.latlng;
                setPosition(e.latlng);
                map.flyTo(e.latlng, map.getZoom());
                setMarker({ lat, lng }); // Pass latitude and longitude to the parent component
                console.log("Marker added:", { lat, lng }); // Log marker data
            },
        });
        return position ? <CustomMarker position={position} onDelete={() => {}} /> : null;
    };

    useEffect(() => {
        if (marker) {
            setLatitude(marker.lat);
            setLongitude(marker.lng);
        }
    }, [marker]);

    
    console.log("Updated Marker:", marker);
    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log("position", latitude, longitude);
        const workArea = {
            company_id: user.account.businessId.toString(),
            name,
            description,
            latitude,
            longitude,
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
        <div className="map-container">
            <MapContainer center={[60.1674881, 24.9427473]} zoom={15} scrollWheelZoom={true}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
                <LocationMarker />
            </MapContainer>
            <form className="map-form" onSubmit={handleSubmit}>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" required/>
                <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" required/>
                <input type="hidden" defaultValue={latitude} required/>
                <input type="hidden" defaultValue={longitude} required/>
                <input type="text" value={radius} onChange={(e) => setRadius(e.target.value)} placeholder="Radius" required/>
                <button type="submit">Create WorkArea</button>
            </form>
        </div>
    );
}

CreateWorkArea.propTypes = {
    marker: PropTypes.object
};

export default CreateWorkArea;