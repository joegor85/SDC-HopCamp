import http from 'k6/http';
import {check, sleep} from 'k6';

export const options = {
  // Key configurations for breakpoint in this section
  executor: 'ramping-arrival-rate', //Assure load increase if the system slows
  stages: [
    // { duration: '2h', target: 20000 }, // just slowly ramp-up to a HUGE load
    { duration: '5m', target: 5000 }, // just slowly ramp-up to a HUGE load
  ],
};

export default () => {
  // const urlRes = http.req('https://test-api.k6.io');
  // sleep(1);

 // Send a GET request to fetch data from the campsites endpoint
 const campsitesResponse = http.get("http://159.223.122.220:5001/api/campsites");
 validateResponse("Campsites", campsitesResponse);

 // Send a GET request to fetch data from the ratings endpoint
 const ratingsResponse = http.get("http://159.223.122.220:5001/api/ratings");
 validateResponse("Ratings", ratingsResponse);

 // Send a GET request to fetch data from the camping-spots endpoint
 const campingSpotsResponse = http.get(
   "http://159.223.122.220:5001/api/camping-spots"
 );
 validateResponse("Camping Spots", campingSpotsResponse);

 // Send a GET request to fetch data from the campers-also endpoint
 const campersAlsoResponse = http.get(
   "http://159.223.122.220:5001/api/campers-also"
 );
 validateResponse("Campers Also", campersAlsoResponse);

 // Send a GET request to fetch data from the photogallery endpoint
 const photogalleryResponse = http.get(
   "http://159.223.122.220:5001/api/photogallery"
 );
 validateResponse("Photogallery", photogalleryResponse);

 // Send a GET request to fetch data from the things-nearby endpoint
 const thingsNearbyResponse = http.get(
   "http://159.223.122.220:5001/api/things-nearby"
 );
 validateResponse("Things Nearby", thingsNearbyResponse);

 // Pause for a certain duration between requests to simulate realistic load
 sleep(1); // Adjust the sleep duration as per your requirements

  // let res1 = http.get('http://159.223.122.220:5001/api/campsites');
  // let res2 = http.get('http://159.223.122.220:5001/api/ratings');
  // let res3 = http.get('http://159.223.122.220:5001/api/camping-spots');
  // let res4 = http.get('http://159.223.122.220:5001/api/campers-also');
  // let res5 = http.get('http://159.223.122.220:5001/api/photogallery');
  // let res6 = http.get('http://159.223.122.220:5001/api/things-nearby');
  // check(res1, { 'status was 200': r => r.status == 200 });
  // check(res2, { 'status was 200': r => r.status == 200 });
  // check(res3, { 'status was 200': r => r.status == 200 });
  // check(res4, { 'status was 200': r => r.status == 200 });
  // check(res5, { 'status was 200': r => r.status == 200 });
  // check(res6, { 'status was 200': r => r.status == 200 });
  // sleep(1);
  
  // const urlRes = http.req('https://test-api.k6.io');
  // sleep(1);
  // MORE STEPS
  // Here you can have more steps or complex script
  // Step1
  // Step2
  // etc.
};

function validateResponse(endpointName, response) {
  // Validate the response and check for any errors or expected data
  if (response.status !== 200) {
    console.error(
      `${endpointName} Request failed with status ${response.status}`
    );
  } else {
    const data = JSON.parse(response.body);
    if (data.length === 0) {
      console.error(`${endpointName} No data found in the response`);
    }
  }
}