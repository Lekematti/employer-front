import axios from "axios";
const API_URL = "http://localhost:3000/";

const worklogHooks = () => {
  // get token from session storage
  const tokenStr = sessionStorage.getItem("token");
  const token = JSON.parse(tokenStr);

  // get all worklogs for companyId
  const getWorkLogsByCompanyId = async (companyId) => {
    try {
      const options = {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      };
      const res = await axios.get(
        API_URL + "worklogs/company/" + companyId,
        options
      );
      return res.data;
    } catch (err) {
      console.error(err);
    }
  };

  // get all worklogs
  const getWorkLogs = async () => {
    try {
      const options = {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      };
      const res = await axios.get(API_URL + "worklogs/", options);
      return res.data;
    } catch (err) {
      console.error(err);
    }
  };

  // get worklog by userId
  const getWorkLogByUserId = async (userId) => {
    try {
      const options = {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      };
      const res = await axios.get(API_URL + "worklogs/" + userId, options);
      return res.data;
    } catch (err) {
      console.error(err);
    }
  };
  // get worklog by userId for workAreaId
  const getWorkLogByUserIdAndWorkAreaId = async (userId, workAreaId) => {
    try {
      const options = {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      };
      const res = await axios.get(
        API_URL + "worklogs/" + userId + "/" + workAreaId,
        options
      );
      return res.data;
    } catch (err) {
      console.error(err);
    }
  };

  // get todays worklog by userId for workAreaId
  const getTodaysWorkLogByUserIdAndWorkAreaId = async (userId, workAreaId) => {
    try {
      const options = {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      };
      const res = await axios.get(
        API_URL + "worklogs/" + userId + "/" + workAreaId + "/today",
        options
      );
      return res.data;
    } catch (err) {
      console.error(err);
    }
  };

  return {
    getWorkLogsByCompanyId,
    getWorkLogs,
    getWorkLogByUserId,
    getWorkLogByUserIdAndWorkAreaId,
    getTodaysWorkLogByUserIdAndWorkAreaId,
  };
};

export default worklogHooks;
