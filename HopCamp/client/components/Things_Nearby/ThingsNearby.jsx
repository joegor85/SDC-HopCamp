import { useState, useEffect } from "react";
import Carousel from "react-bootstrap/Carousel";
import "./ThingsNearby.css";

const ThingsNearby = () => {
  return (
    <>
      <div className="camp-spots-root-container">
        <div className="camp-spots-container-centered">
          <div className="d-flex w-100">
            <span className="camp-spots-title">Things To Do Nearby</span>
          </div>
          <CapmpingSportsCarousel />
        </div>
      </div>
    </>
  );
};

const CapmpingSportsCarousel = () => {
  const [index, setIndex] = useState(0);
  const [thingsNearbyData, setThingsNearbyData] = useState([]);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  useEffect(() => {
    const fetchNearbyPlaces = async () => {
      try {
        const response = await fetch("http://159.223.122.220:5001/api/things-nearby");
        if (response.ok) {
          const data = await response.json();
          setThingsNearbyData(data);
        } else {
          throw new Error("Request failed");
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchNearbyPlaces();
  }, []);

  const groupedPlaces = thingsNearbyData.reduce(
    (accumulator, current, index) => {
      if (index % 4 === 0) {
        accumulator.push(thingsNearbyData.slice(index, index + 4));
      }
      return accumulator;
    },
    []
  );

  return (
    <>
      <Carousel
        activeIndex={index}
        onSelect={handleSelect}
        interval={null}
        indicators={false}
        prevIcon={<span className="carousel-custom-prev-icon">&lt;</span>}
        nextIcon={<span className="carousel-custom-next-icon">&gt;</span>}
      >
        {groupedPlaces.map((placesGroup, groupIndex) => (
          <Carousel.Item key={groupIndex}>
            <div className="d-flex">
              {placesGroup.map((thingsNearbyData) => (
                <CampingSpotCard
                  key={thingsNearbyData.id}
                  pic_url={thingsNearbyData.img}
                  description={thingsNearbyData.title}
                  location={thingsNearbyData.distance}
                />
              ))}
            </div>
          </Carousel.Item>
        ))}
      </Carousel>
    </>
  );
};

const CampingSpotCard = (props) => {
  return (
    <div className="camp-spot-card">
      <div className="camp-spot-img-wrapper">
        <img className="camp-spot-img" src={props.pic_url}></img>
      </div>
      <div className="camp-spot-rating-container">
        <div className="d-flex align-items-baseline">
          <span className="camp-spot-rating-txt ps-1 pt-2"></span>
        </div>
        <span className="camp-spot-title-txt mt-2">{props.description}</span>
        <span className="camp-spot-txt pt-1">{props.location}</span>
        <div className="pt-1"></div>
      </div>
    </div>
  );
};

export default ThingsNearby;

// Recommiting
