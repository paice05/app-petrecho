import axios from 'axios';
import qs from 'qs';

const myIp = {
  ale: '192.168.10.151',
  paice: '192.168.1.18',
};

class API {
  token = '';

  constructor() {}

  request() {
    return axios.create({
      baseURL: `http://${myIp.ale}:3333/api/v1`,
      paramsSerializer: (params) => qs.stringify(params),
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
    });
  }

  setToken(token) {
    this.token = token;
  }
}

export const api = new API();
