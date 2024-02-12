import http from "./index";

const PATH = {
  QUERY_INTEGRAL: "haiyang/integral",
  ADD_INTEGRAL: "haiyang/integral/add",
};
const API = {
  queryIntegral(params) {
    return http
      .get(PATH.QUERY_INTEGRAL, params)
      .then(res => {
        if (res.code === 200) {
          return res.result;
        }
      })
      .catch(err => {
        console.log(err);
      });
  },
  addIntegral(params) {
    return http
      .post(PATH.ADD_INTEGRAL, params)
      .then(res => {
        if (res.code === 200) {
          return res.success;
        }
      })
      .catch(err => {
        console.log(err);
      });
  },
};
export default API;
