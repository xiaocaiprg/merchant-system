import http from "./index";

const PATH = {
  ORDER_LIST: "haiyang/order",
  TO_CONFIRM: "haiyang/order/merchantconfirm",
  TO_PAYCONFIRM: "haiyang/order/merchantpayconfirm",
  ORDER_DETAIL: "/haiyang/order",
};
const API = {
  getOrderList(params) {
    return http
      .get(PATH.ORDER_LIST, params)
      .then(res => {
        if (res.code === 200) {
          return res.result;
        }
      })
      .catch(err => {
        console.log(err);
      });
  },
  toConfirmOrder(params) {
    return http
      .post(PATH.TO_CONFIRM, params)
      .then(res => {
        if (res.code === 200) {
          return res.success;
        }
      })
      .catch(err => console.log(err));
  },
  toConfirmPayOrder(params) {
    return http
      .post(PATH.TO_PAYCONFIRM, params)
      .then(res => {
        if (res.code === 200) {
          return res.success;
        }
      })
      .catch(err => console.log(err));
  },
  getOrderDetail(id) {
    return http
      .get(`${PATH.ORDER_DETAIL}/${id}`)
      .then(res => {
        if (res.code === 200) {
          return res.result;
        }
      })
      .catch(err => console.log(err));
  },
};
export default API;
