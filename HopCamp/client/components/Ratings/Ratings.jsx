import { useState, useEffect } from "react";
import "./Ratings.css";

const Ratings = () => {
    const defaultReviewsAmount = 6;
    const [ratingsData, setRatingsData] = useState([]);
    const [visibleReviews, setVisibleReviews] = useState(defaultReviewsAmount);
    console.log(ratingsData);
    
    useEffect(() => {
        const fetchRatings = async () => {
            try {
                const response = await fetch("http://localhost:5001/api/ratings");
                // const response = await fetch("http://159.223.122.220:5001/api/ratings");
                if (response.ok) {
                    const data = await response.json();
                    setRatingsData(data);
                } else {
                    throw new Error('Request failed');
                }
            } catch (err) {
                console.error(err);
            }
        };
        fetchRatings();
    }, []);
    
    const allReviewsAmount = ratingsData.length;

    const handleShowMore = () => {
        if (visibleReviews === defaultReviewsAmount) {
            setVisibleReviews(allReviewsAmount);
        } else {
            setVisibleReviews(defaultReviewsAmount);
        }
    };

    return (
        <>
            <div className="rating-root-container">
                <div className="rating-container-centered">
                    <div className="rating-summary-container">
                        <div className="d-flex align-items-baseline">
                            <svg className="rating-summary-thumb" stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" color="brand2.500" height="12px" width="12px" xmlns="http://www.w3.org/2000/svg"><path d="M104 224H24c-13.255 0-24 10.745-24 24v240c0 13.255 10.745 24 24 24h80c13.255 0 24-10.745 24-24V248c0-13.255-10.745-24-24-24zM64 472c-13.255 0-24-10.745-24-24s10.745-24 24-24 24 10.745 24 24-10.745 24-24 24zM384 81.452c0 42.416-25.97 66.208-33.277 94.548h101.723c33.397 0 59.397 27.746 59.553 58.098.084 17.938-7.546 37.249-19.439 49.197l-.11.11c9.836 23.337 8.237 56.037-9.308 79.469 8.681 25.895-.069 57.704-16.382 74.757 4.298 17.598 2.244 32.575-6.148 44.632C440.202 511.587 389.616 512 346.839 512l-2.845-.001c-48.287-.017-87.806-17.598-119.56-31.725-15.957-7.099-36.821-15.887-52.651-16.178-6.54-.12-11.783-5.457-11.783-11.998v-213.77c0-3.2 1.282-6.271 3.558-8.521 39.614-39.144 56.648-80.587 89.117-113.111 14.804-14.832 20.188-37.236 25.393-58.902C282.515 39.293 291.817 0 312 0c24 0 72 8 72 81.452z"/></svg>
                            <span className="rating-summary-text ps-1">98%</span>
                        </div>
                        <span className="rating-summary-text mt-2">1762 ratings · 1092 reviews</span>
                    </div>
                    <div className="rating-container">
                        {ratingsData.slice(0, visibleReviews).map((ratingData) => (
                            <RatingCard
                                key={ratingData.id}
                                username={ratingData.username}
                                pic_url={ratingData.pic_url}
                                date={ratingData.date}
                                campsite={ratingData.campsite}
                                recommend={ratingData.recommend}
                                top_line={ratingData.top_line}
                                narrative={ratingData.narrative}
                            />
                        ))}
                    </div>
                    <div className="d-flex pb-4">
                        <button className="show-more-btn" onClick={handleShowMore}>{visibleReviews === defaultReviewsAmount ? 'Show More' : 'Show Less'}</button>
                        {visibleReviews !== defaultReviewsAmount && (<button className="show-more-btn ms-2">
                            <a href="https://www.hipcamp.com/en-US/land/california-salmon-creek-ranch-4kk9hl90/reviews?shareid=7cjfmw8j3&adults=1&children=0&arrive=2023-05-17&depart=2023-05-20" target="_blank" rel="noopener noreferrer" className="no-underline">Show all 1092 reviews</a>
                        </button>)}
                    </div>               
                </div>
            </div>
            
        </>
    );
};

const RatingCard = (props) => {
    const recommendText = props.recommend ? "recommends" : "doesn't recommend" ;
    
    const originalDateString = props.date;
    const originalDate = new Date(originalDateString);

    const month = originalDate.getMonth() + 1; // Adding 1 because months are zero-based
    console.log(month)
    const monthStr =
        month === 1 ? "January" :
        month === 2 ? "February" :
        month === 3 ? "March" :
        month === 4 ? "April" :
        month === 5 ? "May" :
        month === 6 ? "June" :
        month === 7 ? "July" :
        month === 8 ? "August" :
        month === 9 ? "September" :
        month === 10 ? "October" :
        month === 11 ? "November" :
        month === 12 ? "December" :
        null;

    const day = originalDate.getDate();
    const year = originalDate.getFullYear();

    const reformattedString = `${monthStr.toString().padStart(2, '0')}, ${day.toString().padStart(2, '0')} ${year}`;

    return (
        <>
            <div className="rating-card">
                <div className="rating-card-header">
                    <div className="user-pic-thumb">
                        <img className="user-pic" src={props.pic_url}></img>
                        {props.recommend ? (
                            <div className="review-thumb-wrapper-p">
                                <svg className="review-thumb" stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" height="12px" width="12px" xmlns="http://www.w3.org/2000/svg"><path d="M104 224H24c-13.255 0-24 10.745-24 24v240c0 13.255 10.745 24 24 24h80c13.255 0 24-10.745 24-24V248c0-13.255-10.745-24-24-24zM64 472c-13.255 0-24-10.745-24-24s10.745-24 24-24 24 10.745 24 24-10.745 24-24 24zM384 81.452c0 42.416-25.97 66.208-33.277 94.548h101.723c33.397 0 59.397 27.746 59.553 58.098.084 17.938-7.546 37.249-19.439 49.197l-.11.11c9.836 23.337 8.237 56.037-9.308 79.469 8.681 25.895-.069 57.704-16.382 74.757 4.298 17.598 2.244 32.575-6.148 44.632C440.202 511.587 389.616 512 346.839 512l-2.845-.001c-48.287-.017-87.806-17.598-119.56-31.725-15.957-7.099-36.821-15.887-52.651-16.178-6.54-.12-11.783-5.457-11.783-11.998v-213.77c0-3.2 1.282-6.271 3.558-8.521 39.614-39.144 56.648-80.587 89.117-113.111 14.804-14.832 20.188-37.236 25.393-58.902C282.515 39.293 291.817 0 312 0c24 0 72 8 72 81.452z"/></svg>
                            </div>    
                                ) : (
                            <div className="review-thumb-wrapper-n">
                                <svg className="review-thumb" stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" height="12px" width="12px" xmlns="http://www.w3.org/2000/svg"><path d="M0 56v240c0 13.255 10.745 24 24 24h80c13.255 0 24-10.745 24-24V56c0-13.255-10.745-24-24-24H24C10.745 32 0 42.745 0 56zm40 200c0-13.255 10.745-24 24-24s24 10.745 24 24-10.745 24-24 24-24-10.745-24-24zm272 256c-20.183 0-29.485-39.293-33.931-57.795-5.206-21.666-10.589-44.07-25.393-58.902-32.469-32.524-49.503-73.967-89.117-113.111a11.98 11.98 0 0 1-3.558-8.521V59.901c0-6.541 5.243-11.878 11.783-11.998 15.831-.29 36.694-9.079 52.651-16.178C256.189 17.598 295.709.017 343.995 0h2.844c42.777 0 93.363.413 113.774 29.737 8.392 12.057 10.446 27.034 6.148 44.632 16.312 17.053 25.063 48.863 16.382 74.757 17.544 23.432 19.143 56.132 9.308 79.469l.11.11c11.893 11.949 19.523 31.259 19.439 49.197-.156 30.352-26.157 58.098-59.553 58.098H350.723C358.03 364.34 384 388.132 384 430.548 384 504 336 512 312 512z"/></svg>
                            </div>
                        )}
                    </div>
                    <div className="ps-3">
                        <div>
                            <span className="rating-card-user-name">{props.username}</span>
                            <span className="ms-1">{recommendText}</span>
                        </div>
                        <span>{reformattedString}</span>
                    </div>
                </div>
                <div>
                    <div>
                        <span>{props.campsite}</span>
                    </div>
                    <div className="mt-2 mb-2">
                        <span className="rating-card-top-line">{props.top_line}</span>
                    </div>
                    <span className="rating-card-narrative">{props.narrative}</span>
                </div>
            </div>
        </>
    );
};

export default Ratings;
