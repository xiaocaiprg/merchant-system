import http from "./index";

const PATH = {
  PRODUCT_LIST: "haiyang/product",
  CATEGORY_LIST: "haiyang/category/tree",
  ADD_PRODUCT: "/haiyang/product/add",
  REMOVE_PRODUCT: "/haiyang/product/updateStatus",
};
const API = {
  getProductsList(params) {
    return http
      .get(PATH.PRODUCT_LIST, params)
      .then(res => {
        if (res.code === 200) {
          return res.result;
        }
      })
      .catch(err => {
        console.log(err);
      });
  },
  getCategoryList(params) {
    return http
      .get(PATH.CATEGORY_LIST, params)
      .then(res => {
        if (res.code === 200) {
          return res.result;
        }
      })
      .catch(err => {
        console.log(err);
      });
  },
  addProduct(params) {
    return http
      .post(PATH.ADD_PRODUCT, params)
      .then(res => {
        if (res.code === 200) {
          return res.success;
        }
      })
      .catch(err => {
        console.log(err);
      });
  },
  updateProductStatus(params) {
    return http
      .put(PATH.REMOVE_PRODUCT, params)
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
