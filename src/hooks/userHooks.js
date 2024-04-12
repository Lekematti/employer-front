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
    return { getUserById };
};
export default userHooks;