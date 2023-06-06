# System Design Capstone - HopCamp

This project was initially created by another team as a "Front End Capstone".

My team inherited this project for the "System Design Capstone" project, in which the goal is to optimize it in one or more of the following three pathways: Database, Server, or Client-side.


## Explanation

- We chose to optimize the backend of this project which encompassed some database changes as well as some server changes.
- The project was deployed with minimal cost to Digital Ocean for testing purposes
- FakerJS was used to generate large amounts of test data for the database
- K6 was used for testing the API endpoints to simulate a page load
- Tests were analyzed and some vertical scaling tests were run
- Queries were optimized to simulate a more realistic data pull for the type of site this is
- Analysis on the data was performed and conclusions were drawn.
## Screenshot

![App Screenshot](/HopCamp/client/assets/App_screenshot.png)


## Tech Stack

**Client:** React, HTML, CSS

**Server:** Node, Express

**Database:** PostgreSQL, Docker

**Development:** Vite

**Deployment:** Digital Ocean

**Testing:** K6

**Data Generation:** FakerJS


## Future Opimization Possibilities

- Database needs to be reconfigured. My team drew up an updated ERD schema for a model of what that could look like
![Updated ERD](/HopCamp/client/assets/DB-Revision_ERD.png)
- API should be reconfigured to match the database once it is restructured
- load balancer or horizontal scaling to allow more traffic to the page
- a cacheing layer to reduce number of requests needed to the API
