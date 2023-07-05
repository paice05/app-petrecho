import axios from 'axios';

const myIp = '192.168.1.18';

const tokenFake =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIzZjk3YWZiNi00OTZkLTRlNjItOWYwMS1lYmM2MDM2ZGIzNmYiLCJhY2NvdW50SWQiOiJhYTNlZjk4Zi05OTA0LTQ1YmEtYjE3OS0yZjQ4Zjk4YWExMTUiLCJpc1N1cGVyQWRtaW4iOm51bGwsImlhdCI6MTY4ODQ5MjI4NX0.DJhIwj_4xbi7okpOMM5SL842pZvQ7JDE2TOXE89UJQk';

export const api = axios.create({
  baseURL: `http://${myIp}:3333/api/v1`,
  headers: {
    Authorization: `Bearer ${tokenFake}`,
  },
});
