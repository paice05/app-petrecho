import axios from "axios";
import qs from "qs";

const host = {
  ale: "http://192.168.10.155:3333",
  paice: "http://192.168.1.18:3333",
  production: "https://api.meupetrecho.com.br",
};

class API {
  token = "";

  constructor() {}

  request() {
    return axios.create({
      baseURL: `${host.production}/api/v1`,
      paramsSerializer: (params) => qs.stringify(params),
      headers: {
        Authorization: `Bearer ${this.token}`,
        "Content-Type": "application/json",
      },
    });
  }

  setToken(token) {
    this.token = token;
  }
}

export const api = new API();
