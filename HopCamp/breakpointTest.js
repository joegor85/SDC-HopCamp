import http from "k6/http";
import { check, sleep } from "k6";

export const options = {
  // Key configurations for breakpoint in this section
  executor: "ramping-arrival-rate", //Assure load increase if the system slows
  stages: [
    // { duration: '2h', target: 20000 }, // just slowly ramp-up to a HUGE load
    { duration: "2m", target: 10000 }, // just slowly ramp-up to a HUGE load
  ],
};

export default () => {
  // const urlRes = http.req('https://test-api.k6.io');
  // sleep(1);

  let res1 = http.get("http://159.223.122.220:5001/api/campsites");
  let res2 = http.get("http://159.223.122.220:5001/api/ratings");
  let res3 = http.get("http://159.223.122.220:5001/api/camping-spots");
  let res4 = http.get("http://159.223.122.220:5001/api/campers-also");
  let res5 = http.get("http://159.223.122.220:5001/api/photogallery");
  let res6 = http.get("http://159.223.122.220:5001/api/things-nearby");
  check(res1, { "status was 200": (r) => r.status == 200 });
  check(res2, { "status was 200": (r) => r.status == 200 });
  check(res3, { "status was 200": (r) => r.status == 200 });
  check(res4, { "status was 200": (r) => r.status == 200 });
  check(res5, { "status was 200": (r) => r.status == 200 });
  check(res6, { "status was 200": (r) => r.status == 200 });
  sleep(1);

  // const urlRes = http.req('https://test-api.k6.io');
  // sleep(1);
  // MORE STEPS
  // Here you can have more steps or complex script
  // Step1
  // Step2
  // etc.
};
