import {MapContainer, TileLayer, } from "react-leaflet";
import "../CSS/WorkPlaces.css";
import LocationMarker from "../components/LocationMarker.jsx";
import {useState} from "react";
import CreateWorkArea from "./CreateWorkArea.jsx";


function WorkAreaMap() {
    const [marker, setMarker] = useState(null);

    const addMarker = (newMarker) => {
        console.log("New Marker:", newMarker);
        //setMarker(newMarker);
        setMarker({lat: 70.0000, lng: 40.0000});
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
            <CreateWorkArea marker={marker}/>
        </div>
    );
}

export default WorkAreaMap;