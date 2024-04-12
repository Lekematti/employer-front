import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import workAreaHooks from "../hooks/workAreaHooks"; // assuming you export the necessary hooks here

const NotificationsScreen = () => {
    const [requests, setRequests] = useState([]);
    const { getAllWorkAreaJoinRequests } = workAreaHooks();

    useEffect(() => {
        const fetchRequests = async () => {
            const data = await getAllWorkAreaJoinRequests();
            setRequests(data);
        };
        fetchRequests();
    }, []);

    const handleApprove = (workerId, workAreaId) => {
        // Call API to approve request
        console.log(`Approve: ${workerId} for ${workAreaId}`);
        // Remove from list or update status
    };

    const handleDeny = (workerId, workAreaId) => {
        // Call API to deny request
        console.log(`Deny: ${workerId} for ${workAreaId}`);
        // Remove from list or update status
    };

    return (
        <div style={{ padding: '20px' }}>
            {requests.length > 0 ? requests.map((request, index) => (
                <div key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '10px', padding: '10px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
                    <img src={request.profileImage} alt={request.worker_name} style={{ width: '50px', height: '50px', borderRadius: '50%', marginRight: '15px' }} />
                    <div style={{ flexGrow: 1 }}>
                        <strong>{request.worker_name}</strong>
                        <div>{new Date(request.joined_at).toLocaleString()}</div>
                    </div>
                    <FontAwesomeIcon icon={faCheckCircle} style={{ color: 'green', fontSize: '24px', cursor: 'pointer', marginRight: '10px' }} onClick={() => handleApprove(request.worker_id, request.workArea_id)} />
                    <FontAwesomeIcon icon={faTimesCircle} style={{ color: 'red', fontSize: '24px', cursor: 'pointer' }} onClick={() => handleDeny(request.worker_id, request.workArea_id)} />
                </div>
            )) : <div>No requests to show.</div>}
        </div>
    );
};

export default NotificationsScreen;