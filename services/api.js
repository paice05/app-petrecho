import axios from 'axios';
import qs from 'qs';

const myIp = {
  ale: '192.168.10.151',
  paice: '192.168.1.18',
};

const tokenFake = {
  ale: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIzZjk3YWZiNi00OTZkLTRlNjItOWYwMS1lYmM2MDM2ZGIzNmYiLCJhY2NvdW50SWQiOiJhYTNlZjk4Zi05OTA0LTQ1YmEtYjE3OS0yZjQ4Zjk4YWExMTUiLCJpc1N1cGVyQWRtaW4iOm51bGwsImlhdCI6MTY4OTAzNTU1NX0.8kq3S4xRV5EJmbaHxCBvPOURsrUxncMn8vbabYErHOw',
  paice:
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI0OWI2MjNlNC02NzY0LTQ4MGYtODQwZC05NjExNWZiYzYxNjkiLCJhY2NvdW50SWQiOiIwOGM2MWFkOC1lMWRhLTQyMmItYjZiMS1lMWE5YjUyZDBlN2MiLCJpc1N1cGVyQWRtaW4iOm51bGwsImlhdCI6MTY4OTAwODExM30.5iyuyMAL9JXTqCQtGfRAUcPi4OlZdGfD1jt0c21hfX4',
};

export const api = axios.create({
  baseURL: `http://${myIp.ale}:3333/api/v1`,
  paramsSerializer: (params) => qs.stringify(params),
  headers: {
    Authorization: `Bearer ${tokenFake.ale}`,
  },
});
