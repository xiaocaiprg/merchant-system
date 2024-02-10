import http from "./index";

const PATH = {
  LOGIN: "haiyang/merchant/login",
  LOGIN_OUT: "haiyang/merchant/loginout",
};
const API = {
  merchantLogin(params) {
    return http
      .loginPost(PATH.LOGIN, params)
      .then(res => {
        if (res.code === 200) {
          return res.success;
        }
      })
      .catch(err => {
        console.log(err);
      });
  },
  merchantLoginOut() {
    return http
      .post(PATH.LOGIN_OUT)
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
