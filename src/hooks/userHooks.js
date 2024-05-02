import axios from "axios";
const API_URL = "http://localhost:3000/";

const userHooks = () => {
    const tokenStr = sessionStorage.getItem("token");
    const token = JSON.parse(tokenStr);

    const getUserById = async (userId) => {
        try {
            const options = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization:
                        "Bearer " + token,
                },
            };
            const res = await axios.get(API_URL + "user/" + userId, options);
            return res.data;
        } catch (err) {
            console.error(err);
        }
    };

    // get users by workarea Id
    const getUsersByWorkAreaId = async (workAreaId) => {
        try {
            const options = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization:
                        "Bearer " + token,
                },
            };
            const res = await axios.get(API_URL + "user/" + "workarea/" + workAreaId , options);
            return res.data;
        } catch (err) {
            console.error(err);
        }
    };
    // get users and logs by workarea Id
    const getUsersAndLogsByWorkAreaId = async (workAreaId) => {
        const options = {
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + token,
            },
        };
    
        try {
            // Fetch users associated with the work area
            const usersRes = await axios.get(API_URL + "user/workarea/" + workAreaId, options);
            const users = usersRes.data;
    
            // Fetch today's work logs for each user in the work area
            const usersWithLogs = await Promise.all(users.map(async user => {
                try {
                    const logRes = await axios.get(API_URL + `worklogs/${user.id}/${workAreaId}/today`, options);
                    const workLog = logRes.data.length ? logRes.data[0] : null;  // assuming the API returns an array
                    return { ...user, workLog };  // Spread the user and add workLog information
                } catch (error) {
                    // Handle 404 error when no work log is found for today
                    if (error.response && error.response.status === 404) {
                        console.log('No work log found for today.');
                        return { ...user, workLog: null }; // Return user without work log
                    } else {
                        throw error; // Rethrow other errors
                    }
                }
            }));
    
            return usersWithLogs;
        } catch (err) {
            console.error('Error fetching users and their logs:', err);
            return [];  // Returning an empty array in case of error
        }
    };

    const getUserDetailsByWorkAreaId = async (workAreaId) => {
        const options = {
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + token,  // Ensure token is defined and valid
            },
        };
    
        try {
            const response = await axios.get(`${API_URL}user/workArea/${workAreaId}/users`, options);
            return response.data;  // Return user details
        } catch (error) {
            console.error('Error fetching user details:', error);
            return [];  // Return empty array on error
        }
    };
    
    return { getUserById, getUsersByWorkAreaId, getUsersAndLogsByWorkAreaId, getUserDetailsByWorkAreaId};
};
export default userHooks;