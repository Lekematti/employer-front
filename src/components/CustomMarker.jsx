// CustomMarker.jsx
import PropTypes from 'prop-types';
import { Marker } from "react-leaflet";
import L from "leaflet";
import MarkerUrl from "../assets/map-marker.svg";

function CustomMarker({ position, onDelete }) {
    const customIcon = L.icon({
        iconUrl: MarkerUrl,
        iconSize: [50, 50],
        iconAnchor: [25, 50],
    });

    return (
        <Marker position={position} icon={customIcon} eventHandlers={{ click: onDelete }} />
    );
}

CustomMarker.propTypes = {
    position: PropTypes.shape({
        lat: PropTypes.number,
        lng: PropTypes.number,
    }).isRequired,
    onDelete: PropTypes.func.isRequired,
};

export default CustomMarker;