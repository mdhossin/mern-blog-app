import axios from "axios";
const baseUrl = "http://localhost:5000";

export const postAPI = async (url, post, token) => {
  const res = await axios.post(`${baseUrl}/api/${url}`, post, {
    headers: { Authorization: token },
  });

  return res;
};
