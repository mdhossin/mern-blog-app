import axios from "axios";
// export const BASE_URL = "http://localhost:5000";
export const BASE_URL = "https://mern-blog-app-website.herokuapp.com";

export const postAPI = async (url, post, token) => {
  const res = await axios.post(`${BASE_URL}/api/${url}`, post, {
    headers: { Authorization: token },
  });

  return res;
};
