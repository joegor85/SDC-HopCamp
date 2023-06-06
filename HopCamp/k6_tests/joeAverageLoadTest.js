// To run any of these following tests, you would have to host the application somewhere (these endpoints were hosted on DigitalOcean droplets, but are no longer there), and point it at the correct IP address you've set up.
// I actually imported these tests into another repository on my computer that has grafana initialized for realtime visualizations and ran them from there.

import http from "k6/http";
import { sleep } from "k6";

export const options = {
  // Key configurations for avg load test in this section
  stages: [
    { duration: "2m", target: 100 }, // traffic ramp-up from 1 to 100 users over 2 minutes.
    { duration: "5m", target: 100 }, // stay at 100 users for 5 minutes
    { duration: "2m", target: 0 }, // ramp-down to 0 users
  ],
};

export default function () {
  // Send a GET request to fetch data from the campsites endpoint
  const campsitesResponse = http.get(
    "http://159.223.122.220:5001/api/campsites"
  );
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
  // sleep(1);
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
