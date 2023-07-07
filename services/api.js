import axios from 'axios';
import qs from 'qs';

const myIp = {
  ale: '192.168.10.156',
  paice: '192.168.1.18',
};

const tokenFake = {
  ale: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIzZjk3YWZiNi00OTZkLTRlNjItOWYwMS1lYmM2MDM2ZGIzNmYiLCJhY2NvdW50SWQiOiJhYTNlZjk4Zi05OTA0LTQ1YmEtYjE3OS0yZjQ4Zjk4YWExMTUiLCJpc1N1cGVyQWRtaW4iOm51bGwsImlhdCI6MTY4ODU3NTU3Nn0.6if8NeMMS_7s05rpMRyftFsbvUjsvllebab3mCN0Vhc',
  paice:
    '.eyJ1c2VySWQiOiJkZmY0Y2JjNy05MjFkLTQyOWItYTgxZC00ZDcyYjVhMWE4YWIiLCJhY2NvdW50SWQiOiIwOGM2MWFkOC1lMWRhLTQyMmItYjZiMS1lMWE5YjUyZDBlN2MiLCJpc1N1cGVyQWRtaW4iOm51bGwsImlhdCI6MTY4ODY2MTkzMH0.5lH0WVrKefq_UAXr3CKS9z_b1O9Tn5RypLVuiWDbieQ',
};

export const api = axios.create({
  baseURL: `http://${myIp.ale}:3333/api/v1`,
  paramsSerializer: (params) => qs.stringify(params),
  headers: {
    Authorization: `Bearer ${tokenFake.ale}`,
  },
});
