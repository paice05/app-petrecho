import axios from 'axios';

const myIp = '192.168.10.156';

const tokenFake =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIzZjk3YWZiNi00OTZkLTRlNjItOWYwMS1lYmM2MDM2ZGIzNmYiLCJhY2NvdW50SWQiOiJhYTNlZjk4Zi05OTA0LTQ1YmEtYjE3OS0yZjQ4Zjk4YWExMTUiLCJpc1N1cGVyQWRtaW4iOm51bGwsImlhdCI6MTY4ODU3NTU3Nn0.6if8NeMMS_7s05rpMRyftFsbvUjsvllebab3mCN0Vhc';

export const api = axios.create({
  baseURL: `http://${myIp}:3333/api/v1`,
  headers: {
    Authorization: `Bearer ${tokenFake}`,
  },
});
