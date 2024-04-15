import {MapContainer, TileLayer, } from "react-leaflet";
import "../CSS/WorkPlaces.css";
import LocationMarker from "../components/LocationMarker.jsx";
import {useState} from "react";
import WorkAreaForm from "./WorkAreaForm.jsx";


function WorkAreaMap() {
    const [marker, setMarker] = useState(null);

    const addMarker = (newMarker) => {
        setMarker(newMarker);
    };

    return (
        <div className="map-container">
            <MapContainer center={[60.1674881, 24.9427473]} zoom={15} scrollWheelZoom={true}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <LocationMarker onMarkerAdded={addMarker}/>
            </MapContainer>
            <WorkAreaForm marker={marker}/>
        </div>
    );
}

export default WorkAreaMap;