import {MapContainer, TileLayer} from 'react-leaflet';

function WorkAreaMap() {
    const tileLayerBounds = [[59.9222, 20.6459], [70.0923, 31.5860]]; // Bounds for Finland

    return (
        <MapContainer center={[65.0121, 25.4651]} zoom={13} style={{ height: "100vh", width: "100%" }}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                bounds={tileLayerBounds}
            />
        </MapContainer>
    );
}
/*
function LocationMarker() {
    const [positions, setPositions] = useState([]);
    useMapEvents({
        click: (e) => {
            setPositions([...positions, e.latlng]);
        },
    });

    return positions.length === 0 ? null : positions.map((position, idx) => (
        <Marker key={idx} position={position}>
            <Popup>You selected this work area</Popup>
        </Marker>
    ));
}*/

export default WorkAreaMap;