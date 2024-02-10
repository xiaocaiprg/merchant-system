import http from "../api/index";
const PATH = {
  GET_MERCHANT_INFO: "haiyang/merchant/token",
};
export const mixins = {
  mounted() {},
  methods: {
    getLocalStorage() {
      const authorization = window.localStorage.getItem("authorization");
      return authorization;
    },
    setLocalStorage(value) {
      window.localStorage.setItem("authorization", value);
    },
    getMerchantInfo() {
      const authorization = this.getLocalStorage() || "";
      if (authorization) {
        return http
          .get(`${PATH.GET_MERCHANT_INFO}`)
          .then(res => {
            if (res.code === 200) {
              return res.result;
            }
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        return Promise.resolve("");
      }
    },
  },
};
