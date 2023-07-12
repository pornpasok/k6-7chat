import http from 'k6/http';
import { check } from 'k6';


// load testing
// export let options = {
//     stages: [
//       { duration: '5m', target: 100 },
//       { duration: '10m', target: 100 },
//       { duration: '5m', target: 0 },
//     ],
// };

// stress testing
// export let options = {
//     stages: [
//       { duration: '1m', target: 100 },
//       { duration: '5m', target: 100 },
//       { duration: '1m', target: 200 },
//       { duration: '5m', target: 200 },
//       { duration: '1m', target: 300 },
//       { duration: '5m', target: 300 },
//       { duration: '1m', target: 400 },
//       { duration: '5m', target: 400 },
//       { duration: '5m', target: 0 },
//     ],
// };

// spike testing
// export let options = {
//     stages: [
//       { duration: '10s', target: 100 },
//       { duration: '2m', target: 100 },
//       { duration: '10s', target: 1000 },
//       { duration: '2m', target: 1000 },
//       { duration: '10s', target: 100 },
//       { duration: '2m', target: 100 },
//       { duration: '10s', target: 0 },
//     ],
// };

export let options = {
    stages: [
      { duration: '10s', target: 10 },
      { duration: '2m', target: 10 },
      { duration: '10s', target: 500 },
      { duration: '2m', target: 500 },
      { duration: '10s', target: 10 },
      { duration: '2m', target: 500 },
      { duration: '10s', target: 0 },
    ],
};

export default function () {
  const url = `https://${__ENV.ENDPOINT_7CHAT}/member/v1/signin/line`;
  const payload = JSON.stringify({
    'line_user_id': 'U061242c3c36141e696adc51a302dd3ed',
  });

  const params = {
    headers: {
      'Content-Type': 'application/json',
      'x-web-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjbGllbnRfaWQiOiI2N2U0M2M2ZC00ZTJiLTQwNzQtOTZhYi00NDY0NmQ5MDMyNDEiLCJjb21wYW55X3V1aWQiOiIwMzFlYTQ2NC04NWIxLTQ1YWQtYjA5Ni02ZmE3OWRkY2QwMWYiLCJjcmVkZW50aWFsX3R5cGUiOiJ3ZWIiLCJpYXQiOjE2ODc0MjkzMDQsImV4cCI6NDg0MTAyOTMwNH0.uLJ-IAVXvGfcOR4BWU9WWI0iQHEeUmGvVYYCsQ4DIks',
      'token': `${__ENV.TOKEN_7CHAT}`,
    },
  };

  let res = http.post(url, payload, params);
  // let res = http.get(url, params);

  // console.log(`${__ENV.TOKEN_7VERSE}`);

  console.log(res.status);

  check(res, {
    'is status 200': (r) => r.status === 200,
  });
}