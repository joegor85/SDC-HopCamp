import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, useState, useRef } from "react";
import "./Tent_site.css";
import Individual_Tent_site from "./Individual_Tent_site";
import Individual_Lodging_site from "./Individual_Lodging_site";
import Tent_Site_Map from "./Tent_site_map";

// import site1_campground from '/HopCamp/HopCamp/client/assets/site1 campground.webp'
const Tent_site = () => {
    const defaultSiteAmnt = 3;
    const [defaultTentCount,setDefaultTentCount]=useState(defaultSiteAmnt);
    const [tentsiteData,setTentSiteData]=useState([]);
    const [lodgingData,setlodgingData] = useState([]);
    // const [visibleSiteData,setVisibleSiteData] = useState([]);
    // const [updatedSiteData,setUpdatedSiteData] = useState([]);
    // const tentSiteData = {
    //     id: 1,
    //     name: 'Site 1- Redwood Camp',
    //     availability: '5 available',
    //     demand: 'High demand',
    //     instantBook: 'Instant book',
    //     rating: '99%',
    //     reviews: '(361)',
    //     type: 'RV/tent site',
    //     capacity: '· Sleeps 8',
    //     description: 'NOTE REGARDING ACCESS: 4WD or AWD WITH GOOD GROUND CLEARANCE IS REQUIRED due to steep, rutted farm road with loose gravel in summer and mud in winter.  Tesla model Y and similar vehicles that may be called "SUVs" but are very low to the ground are not allowed.  If you need to be towed back up in your non-4WD/AWD vehicle, we will charge you $100 for our time and expertise.  AAA and other roadside assistant services will not be able to help you. Regular RVs not allowed, but 4WD camper vans are OK. Small pop-up and teardrop trailers with 4WD tow vehicles by negotiation. Check with us first. ',
    //     dealPrice: '96',
    //     regularPrice: '120'
    // }
    
    // const lodgingData = {
    //     id: 1,
    //     name: "Eagle's Nest Treehouse Farmstay",
    //     availability: "0 available",
    //     demand: "High demand",
    //     instantBook: "Instant book",
    //     rating: "99%",
    //     reviews: "(339)",
    //     type: "Treehouse ·",
    //     capacity: "Sleeps 2",
    //     description: "The Eagle's Nest Treehouse Farm Stay offers ..."
    // }
    const allSiteAmnt = tentsiteData.length;

    const handleShowMore = () => { 
        if(defaultTentCount === defaultSiteAmnt){
            //setVisibleSiteData(allSiteAmnt);
            setDefaultTentCount(allSiteAmnt -1);
        }else{
            setDefaultTentCount(defaultSiteAmnt);
            //setVisibleSiteData(defaultSiteAmnt);
            //console.log(tentsiteData.slice(tentsiteData.length));
        }
    };

    useEffect(()=>{
        fetch('http://localhost:5001/api/campsites').then(responses=>responses.json())
        // fetch('http://159.223.122.220:5001/api/campsites').then(responses=>responses.json())
        .then(result=>{
            let rvArr= [];
            let lodgingArr = [];
            for (let element of result)
            {
                if (element.type === 'Lodging')
                    lodgingArr.push(element);
                else
                    rvArr.push(element);
            }
            setTentSiteData(rvArr);
            setlodgingData(lodgingArr);
        })
    },[])
    useEffect(()=>{
        console.log(defaultTentCount);
    },[defaultTentCount])
  return (
    <div className="d-flex" style={{postion:'relative'}} id='currentCampSites'>
         <div>
            <div className='tent-sites' id='campSites'>
                <div className='tent-sites-title'> 
                    <div id="tentsite-title">Tent sites</div>
                    <div id="tentsite-availability"> {tentsiteData.length} available</div>
                </div>
                {tentsiteData.slice(0, defaultTentCount).map((element, index) => (
                    <Individual_Tent_site key={index} data={element}/>

                ))}
                <button className='show-more-btn' onClick={handleShowMore}>{defaultTentCount === defaultSiteAmnt ? 'Show More' : 'Show Less'}</button>

            </div>

    <div className='tent-sites' >
        <div className='tent-sites-title'> 
            <div id="tentsite-title">Lodging</div>
            <div id="tentsite-availability"> {lodgingData.length} available</div>
        </div>
        {lodgingData.map((element,index) => (
            <Individual_Tent_site key={index} data={element}/>

                ))}
            </div>
            </div>
            </div>
  )
}

export default Tent_site