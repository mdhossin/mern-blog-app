import axios from "axios";

// query string use for parse the url query data like
// queryString.parse('foo=true', {parseBooleans: true});
//=> {foo: true}

// const queryString = require('query-string');

// queryString.stringify({foo: [1, 2, 3]}, {arrayFormat: 'bracket'});
//=> 'foo[]=1&foo[]=2&foo[]=3'
import queryString from "query-string";

const baseURL = "http://localhost:5000/api";
// const baseURL = "https://mern-kanban-app.herokuapp.com/api";

const getToken = () => localStorage.getItem("token");

const axiosClient = axios.create({
  baseURL,
  // parmas gulake seralize kore jonno paramsSerializer then segulake string e convert kortesi
  paramsSerializer: (params) => queryString.stringify({ params }),
});
// You can intercept requests or responses before they are handled by then or catch.
// Add a request interceptor
axiosClient.interceptors.request.use(async (config) => {
  // Do something before request is sent every request korar age eta set hobe automatic
  return {
    ...config,
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${getToken()}`,
    },
  };
});

// Any status code that lie within the range of 2xx cause this function to trigger
// Do something with response data
axiosClient.interceptors.response.use(
  (response) => {
    if (response && response.data) return response.data;
    return response;
  },
  (err) => {
    if (!err.response) {
      return alert(err);
    }

    throw err.response;
  }
);

export default axiosClient;
