import axios from "axios";
import toast from "react-hot-toast";

export const Logout = async () => {
  try {
    const response = await axios.get(
      "http://localhost:4000/api/v1/user/logout",
      {
        withCredentials: true,
      }
    );
    toast.success(response.data.message);
  } catch (error) {
    toast.error(error.response.data.message), setIsAuthorized(true);
  }
};
export const handleReqJob = async (category) => {
    try {
    const response = await axios.get(
      "http://localhost:4000/api/v1/job/getall",
      { category }, // Pass the category in the body
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
