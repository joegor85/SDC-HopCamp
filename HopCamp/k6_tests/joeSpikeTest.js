import http from 'k6/http';
import {sleep} from 'k6';

export const options = {
  // Key configurations for spike in this section
  stages: [
    { duration: '2m', target: 2000 }, // fast ramp-up to a high point
    // No plateau
    { duration: '1m', target: 0 }, // quick ramp-down to 0 users
  ],
};

export default function () {
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
  }
  
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