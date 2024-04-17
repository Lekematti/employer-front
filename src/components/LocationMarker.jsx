// LocationMarker.jsx
import { useState } from "react";
import {useMapEvents} from "react-leaflet";
import CustomMarker from "./CustomMarker.jsx";
import PropTypes from "prop-types";

function LocationMarker({ onMarkerAdded }) {
    const [position, setPosition] = useState(null);
    const map = useMapEvents({
        click(e) {
            const { lat, lng } = e.latlng;
            setPosition(e.latlng);
            map.flyTo(e.latlng, map.getZoom());
            onMarkerAdded({ lat, lng }); // Pass latitude and longitude to the parent component
            console.log("Marker added:", { lat, lng }); // Log marker data
        },
    });

    return position ? (
        <CustomMarker position={position} onDelete={() => {}} />
    ) : null;
}

LocationMarker.propTypes = {
    onMarkerAdded: PropTypes.func.isRequired,
    onDelete: PropTypes.func,
};

export default LocationMarker;