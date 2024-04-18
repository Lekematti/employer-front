import React from 'react';
import useCreateWorkArea from '../hooks/FormHook.js';

const WorkAreaForm = ({ marker }) => {
    const {
        name, setName,
        description, setDescription,
        radius, setRadius,
        latitude, longitude,
        handleMarkerChange,
        handleSubmit
    } = useCreateWorkArea(marker);

    React.useEffect(() => {
        handleMarkerChange(marker);
    }, [marker, handleMarkerChange]);

    // Your form JSX here
    // Use name, setName, description, setDescription, radius, setRadius, latitude, longitude, and handleSubmit
};

export default WorkAreaForm;