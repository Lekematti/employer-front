import axios from "axios";
const API_URL = "http://localhost:3000/";

const workAreaHooks = () => {
    // get token from session storage
    const tokenStr = sessionStorage.getItem("token");
    const token = JSON.parse(tokenStr);

  // get all workareas
  const getWorkAreas = async () => {
    try {
      const options = {
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "Bearer " + token,
        },
      };
      const res = await axios.get(API_URL + "workAreas", options);
      return res.data;
    } catch (err) {
      console.error(err);
    }
  };
  // get workarea by work area id
  const getWorkAreaByWorkAreaId = async (workAreaId) => {
    try {
        const options = {
            headers: {
              "Content-Type": "application/json",
              Authorization:
                "Bearer " + token,
            },
        };
      const res = await axios.get(API_URL + "workAreas/" + workAreaId, options);
      return res.data;
    } catch (err) {
      console.error(err);
    }
  };
  // get workarea by userId
  const getWorkAreaByUserId = async (userId) => {
    try {
        const options = {
            headers: {
              "Content-Type": "application/json",
              Authorization:
                "Bearer " + token,
            },
        };
      const res = await axios.get(
        API_URL + "workAreas/userWorkAreas/" + userId, options
      );
      return res.data;
    } catch (err) {
      console.error(err);
    }
  };
  // create work area
  const createWorkArea = async ( workArea ) => {
    if (!workArea || Object.keys(workArea).length === 0) {
      console.error("createWorkArea was called with invalid workArea data");
      return {error: "Invalid workArea data provided."};
    }

    const options = {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,  // Ensure 'token' is defined
      },
    };

    try {
      const res = await axios.post(API_URL + "workAreas/createWorkArea", workArea, options);
      return res.data;
    } catch (err) {
      console.error("Error in createWorkArea:", err);
      if (err.response) {
        // Handle HTTP errors from Axios
        console.error("HTTP status:", err.response.status);
        console.error("HTTP data:", err.response.data);
      }
      throw err; // Rethrow or return an error indicator
    }
  };
  // get all work area join requests
  const getAllWorkAreaJoinRequests = async () => {
    try {
      const options = {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      };
      const res = await axios.get(API_URL + "workAreas/pending", options);
      return res.data;
    } catch (err) {
      console.error(err);
    }
  };

  // approve work area join request
  const approveWorkAreaJoinRequest = async (workerId, workAreaId) => {

    console.log("Token fetched:", token);  // Check if the token is correctly retrieved
    
    if (!token) {
      console.error("No token found");
      return { message: "Unauthorized" };
    }
  
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
  
    const data = JSON.stringify({ workerId, workAreaId });
    console.log("Data to send:", data);  // Check if the data is correctly formatted
  
    try {
      const response = await axios.post(API_URL + "workAreas/approveJoinRequest", data, { headers });
      return response.data;
    } catch (err) {
      console.error("Error in approveWorkAreaJoinRequest:", err);
      return { message: "Request failed", error: err };
    }
  };
  // delete workArea join request
  const deleteWorkAreaJoinRequest = async (workerId, workAreaId) => {
    try {
      const options = {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      };
      const res = await axios.delete(
        API_URL + "workAreas/deleteRequest/" + workerId + "/" + workAreaId,
        options
      );
      return res.data;
    } catch (err) {
      console.error(err);
    }
  };
  // get workareas by company id
  const getWorkAreasByCompanyId = async (companyId) => {
    try {
      const options = {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      };
      const res = await axios.get(
        API_URL + "workAreas/company/" + companyId,
        options
      );
      return res.data;
    } catch (err) {
      console.error(err);
    }
  };
  
  return {
    getWorkAreas,
    getWorkAreaByWorkAreaId,
    getWorkAreaByUserId,
    createWorkArea,
    getAllWorkAreaJoinRequests,
    approveWorkAreaJoinRequest,
    deleteWorkAreaJoinRequest,
    getWorkAreasByCompanyId,
  };
};

export default workAreaHooks;
