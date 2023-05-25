import http from 'k6/http';
import { sleep } from 'k6';

// testing the wrong thing-the webpage
// export default function () {
//   http.get('http://localhost:5173');
//   sleep(1);
// }

export default function () {
  http.get('http://localhost:5001/api/campsites');
  sleep(1);
}