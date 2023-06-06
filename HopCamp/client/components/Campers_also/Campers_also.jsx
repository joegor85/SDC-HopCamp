import { useState, useEffect } from "react";
import Carousel from "react-bootstrap/Carousel";
import "./Campers_also.css";

const Campers_also = () => {
    
  return (
    <>
      <div className="campers-also-root-container">
        <div className="camp-also-container-centered">
          <div className="d-flex w-100">
            <span className="camp-also-title">
                Campers also viewed...
            </span>
          </div>
          <CampersAlsoCarousel />
        </div>
      </div>
    </>
  );
};

const CampersAlsoCarousel = () => {
  const [index, setIndex] = useState(0);
  const [campersAlsoData, setCampersAlsoData] = useState([]);
  
  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  useEffect(() => {
      const fetchCampersAlso = async () => {
          try {
            const response = await fetch("http://localhost:5001/api/campers-also");
              // const response = await fetch("http://159.223.122.220:5001/api/campers-also");
              if (response.ok) {
                  const data = await response.json();
                  setCampersAlsoData(data);
              } else {
                  throw new Error("Request failed");
              }
          } catch (err) {
              console.error(err);
          }
      };
      fetchCampersAlso();
  }, []);

  const groupedCampersAlso = campersAlsoData.reduce((accumulator, current, index) => {
    if (index % 4 === 0) {
      accumulator.push(campersAlsoData.slice(index, index + 4));
    }
    return accumulator;
  }, []);

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
      {groupedCampersAlso.map((camperAlsoGroup, groupIndex) => (
        <Carousel.Item key={groupIndex}>
          <div className="d-flex">
            {camperAlsoGroup.map((camperAlsoData) => 
              <CamperAlsoCard 
                key={camperAlsoData.id}
                descr={camperAlsoData.description}
                pic_url={camperAlsoData.pic_url}
                description={camperAlsoData.description}
                rating={camperAlsoData.rating}
                numOfRating={camperAlsoData.num_of_ratings}
                acres={camperAlsoData.acres}
                location={camperAlsoData.location}
                price={camperAlsoData.price}
              />            
            )}
          </div>
        </Carousel.Item>
      ))}
    </Carousel>
    </>
  );
};

const CamperAlsoCard = (props) => {

  return (
    <div className="camp-spot-card">
      <div className="camp-spot-img-wrapper">
        <img className="camp-spot-img" src={props.pic_url}></img>
      </div>
      <div className="camp-spot-rating-container">
        <div className="d-flex align-items-baseline">
          <svg
            className="camp-spot-rating-thumb"
            stroke="currentColor"
            fill="currentColor"
            strokeWidth="0"
            viewBox="0 0 512 512"
            color="brand2.500"
            height="12px"
            width="12px"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M104 224H24c-13.255 0-24 10.745-24 24v240c0 13.255 10.745 24 24 24h80c13.255 0 24-10.745 24-24V248c0-13.255-10.745-24-24-24zM64 472c-13.255 0-24-10.745-24-24s10.745-24 24-24 24 10.745 24 24-10.745 24-24 24zM384 81.452c0 42.416-25.97 66.208-33.277 94.548h101.723c33.397 0 59.397 27.746 59.553 58.098.084 17.938-7.546 37.249-19.439 49.197l-.11.11c9.836 23.337 8.237 56.037-9.308 79.469 8.681 25.895-.069 57.704-16.382 74.757 4.298 17.598 2.244 32.575-6.148 44.632C440.202 511.587 389.616 512 346.839 512l-2.845-.001c-48.287-.017-87.806-17.598-119.56-31.725-15.957-7.099-36.821-15.887-52.651-16.178-6.54-.12-11.783-5.457-11.783-11.998v-213.77c0-3.2 1.282-6.271 3.558-8.521 39.614-39.144 56.648-80.587 89.117-113.111 14.804-14.832 20.188-37.236 25.393-58.902C282.515 39.293 291.817 0 312 0c24 0 72 8 72 81.452z" />
          </svg>
          <span className="camp-spot-rating-txt ps-1 pt-2">
            {props.rating}% ({props.numOfRating})
          </span>
        </div>
        <span className="camp-spot-title-txt mt-2">
          {props.description}
        </span>
        <span className="camp-spot-txt pt-1">
          {props.acres} acres · {props.location}
        </span>
        <div className="pt-1">
          <span className="camp-spot-txt">from </span>
          <span className="camp-spot-money-txt">
            ${props.price}
          </span>
          <span className="camp-spot-txt"> / night</span>
        </div>
      </div>
    </div>
  );
}

export default Campers_also;