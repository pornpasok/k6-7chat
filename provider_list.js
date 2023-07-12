import http from 'k6/http';
import { check, sleep } from 'k6';


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
  thresholds: {
    // Assert that 99% of requests finish within 3000ms.
    http_req_duration: ["p(95) < 3000"],
  },
  // Ramp the number of virtual users up and down
  stages: [
    { duration: '10s', target: 10 },
    { duration: '1m', target: 10 },
    { duration: '10s', target: 200 },
    { duration: '1m', target: 200 },
    { duration: '10s', target: 10 },
    { duration: '1m', target: 200 },
    { duration: '10s', target: 0 },
  ],
};

export default function () {
  const url = `https://${__ENV.ENDPOINT_7CHAT}/member/v1/provider/list`;
//   const payload = JSON.stringify({
//     'x-api-key': 'F352S5H3es9LMJK9cZcy',
//     'token': 'eyJhbGciOiJSUzI1NiIsImtpZCI6IjhkMDNhZTdmNDczZjJjNmIyNTI3NmMwNjM2MGViOTk4ODdlMjNhYTkiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vYnJhbmR2ZXJzZS1zdGciLCJhdWQiOiJicmFuZHZlcnNlLXN0ZyIsImF1dGhfdGltZSI6MTY4NzMxNzg1MSwidXNlcl9pZCI6IklZNmdSejJaUFJmQkx3VkNEZUpUTFVPVjV3cDIiLCJzdWIiOiJJWTZnUnoyWlBSZkJMd1ZDRGVKVExVT1Y1d3AyIiwiaWF0IjoxNjg3MzE3ODUxLCJleHAiOjE2ODczMjE0NTEsImVtYWlsIjoiY3RfdGVzdDAxQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7ImVtYWlsIjpbImN0X3Rlc3QwMUBnbWFpbC5jb20iXX0sInNpZ25faW5fcHJvdmlkZXIiOiJwYXNzd29yZCJ9fQ.2Fh4T-jkTjJg3pHsRHjx0FGakH-oU1d772snmxvncqfBITvS7JLiheZhY_PfQWaJzbplpts2xZJMslSL2qGvSKF4oYASltB_CMyWyH7LzVgJY3nRmjfzNaTL8MtCdU51g1UeG4AyaUmzy-prK72NjIKsr6jRSBx1xqzXQ39nHKMJ5NnCF2ztTG9ZHpQ9EARmlzEgqsLTMTWcYgHYbIPuvMHPiqQ_CAGcIDEbtVO_W349QeByGMdAP6w1crGD4UZlnktT8RCdFMNfhcbZJc1u8e-ZnyKH3bbZb3PlyOiFQsvkorlD00x2xw_4hG2jp_WHobaMIQT-i2VBs9X6nzG1iA',
//   });

  const params = {
    headers: {
      'Content-Type': 'application/json',
      'x-web-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjbGllbnRfaWQiOiI2N2U0M2M2ZC00ZTJiLTQwNzQtOTZhYi00NDY0NmQ5MDMyNDEiLCJjb21wYW55X3V1aWQiOiIwMzFlYTQ2NC04NWIxLTQ1YWQtYjA5Ni02ZmE3OWRkY2QwMWYiLCJjcmVkZW50aWFsX3R5cGUiOiJ3ZWIiLCJpYXQiOjE2ODc0MjkzMDQsImV4cCI6NDg0MTAyOTMwNH0.uLJ-IAVXvGfcOR4BWU9WWI0iQHEeUmGvVYYCsQ4DIks',
      'Authorization': `Bearer ${__ENV.TOKEN_7CHAT}`,
    },
  };

  // http.post(url, payload, params);
  let res = http.get(url, params);

  // console.log(`${__ENV.TOKEN_7VERSE}`);

  console.log(res.status);
  // console.log(params);
  // console.log(res);

  check(res, {
    'is status 200': (r) => r.status === 200,
  });
  sleep(1);
}