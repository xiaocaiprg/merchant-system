import axios from "axios";
// const baseURL = "http://www.enjoyclub.shop/";
// const timeout = 5000;
// const headers = {
//   "X-Requested-With": "XMLHttpRequest",
//   "Content-Type": "application/json",
// };
// const authorization = window.localStorage.getItem("authorization");

// const instance = axios.create({
//   baseURL,
//   timeout,
//   withCredentials: true,
//   headers: {
//     ...headers,
//     authorization: authorization,
//   },
// });

// const loginIns = axios.create({
//   baseURL,
//   timeout,
//   withCredentials: true,
//   headers,
// });
// const get = (url, params = {}) => {
//   return new Promise((resolve, reject) => {
//     instance
//       .get(url, {
//         params: params,
//       })
//       .then(res => {
//         resolve(res.data);
//       })
//       .catch(err => {
//         reject(err);
//       });
//   });
// };
// const post = (url, params = {}) => {
//   return new Promise((resolve, reject) => {
//     instance
//       .post(url, params)
//       .then(res => {
//         resolve(res.data);
//       })
//       .catch(err => {
//         reject(err);
//       });
//   });
// };
// const loginPost = (url, params = {}) => {
//   return new Promise((resolve, reject) => {
//     loginIns
//       .post(url, params)
//       .then(res => {
//         const auth = res.headers.authorization;
//         auth && window.localStorage.setItem("authorization", auth);
//         resolve(res.data);
//       })
//       .catch(err => {
//         reject(err);
//       });
//   });
// };
// export { get, post, loginPost };
class API {
  constructor() {
    this.baseURL = "http://www.enjoyclub.shop/";
    this.timeout = 5000;
    this.headers = {
      "X-Requested-With": "XMLHttpRequest",
      "Content-Type": "application/json",
    };
    this.instance = axios.create({
      baseURL: this.baseURL,
      timeout: this.timeout,
      withCredentials: true,
      headers: this.headers,
    });
    this.instance.interceptors.request.use(
      config => {
        const authorization = window.localStorage.getItem("authorization");
        if (authorization && config.url !== "haiyang/merchant/login") {
          config.headers.Authorization = authorization;
        }
        return config;
      },
      err => {
        return Promise.reject(err);
      }
    );
  }
  get(url, params = {}) {
    return new Promise((resolve, reject) => {
      this.instance
        .get(url, {
          params: params,
        })
        .then(res => {
          resolve(res.data);
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  post(url, params = {}) {
    return new Promise((resolve, reject) => {
      this.instance
        .post(url, params)
        .then(res => {
          resolve(res.data);
        })
        .catch(err => {
          reject(err);
        });
    });
  }
  put(url, params = {}) {
    return new Promise((resolve, reject) => {
      this.instance
        .put(url, params)
        .then(res => {
          resolve(res.data);
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  loginPost(url, params = {}) {
    return new Promise((resolve, reject) => {
      this.instance
        .post(url, params)
        .then(res => {
          const auth = res.headers.authorization;
          auth && window.localStorage.setItem("authorization", auth);
          resolve(res.data);
        })
        .catch(err => {
          reject(err);
        });
    });
  }
}
const api = new API();
export default api;
