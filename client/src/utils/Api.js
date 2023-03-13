import Axios from "axios";
import config from "./config";
import Cookies from "js-cookie";

class Api {
//   private _token,
//   private static instance: any;
//   private axiosInstance: any;
  set token(token) {
    this._token = token;
  }
   constructor() {
    this.axiosInstance = Axios.create({
      baseURL: process.env.REACT_APP_LOCAL_BASE_API,
      headers: config.headers,
    });
  }

  static getInstance = () => {
    if (!Api.instance && !(Api.instance instanceof Api)) {
      Api.instance = new Api();
    }
    return Api.instance;
  };

  buildHeaders = (options) => {
    const headers = {
      Authorization: `${config.tokenType} ${
        this._token || Cookies.get("Token") || ""
      }`,
      ...options?.headers,
    };
    return headers;
  };

  axios = (
    method,
    url,
    data,
    options
  ) => {
    return this.axiosInstance({
      method,
      url,
      headers: this.buildHeaders(options),
      ...(method === "GET" || method === "DELETE"
        ? { params: data }
        : { data }),
    });
  };

  get = async (
    path,
    params,
    options = {}
  ) => {
    return await this.axios("GET", path, params, options);
  };
  post = async (
    path,
    body,
    options = {}
  ) => {
    return await this.axios("POST", path, body, options);
  };
  put = async (
    path,
    body,
    options = {}
  ) => {
    return await this.axios("PUT", path, body, options);
  };
  delete = async (
    path,
    params,
    options = {}
  )=> {
    return await this.axios("DELETE", path, params, options);
  };
}

export default Api.getInstance();

// export const USERINFORMATIONSURLS = [
//   process.env.REACT_APP_DEVELOP_BASE_API + "/user/info",
//   process.env.REACT_APP_DEVELOP_BASE_API + "/user/kyc/levels",
//   process.env.REACT_APP_DEVELOP_BASE_API + "/user/kyc/info",
//   process.env.REACT_APP_DEVELOP_BASE_API + "/user/status-list",
//   process.env.REACT_APP_DEVELOP_BASE_API + "/user/wallet/list",
//   process.env.REACT_APP_DEVELOP_BASE_API + "/currencies?type=CRYPTO",
// ];
