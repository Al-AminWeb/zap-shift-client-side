import React from 'react';
import Banner from "../banner/Banner.jsx";
import Services from "../services/Services.jsx";
import ClientLogoSlider from "../clientLogosMarquee/ClientLogoSlider.jsx";
import Benefits from "../benefits/Benefits.jsx";
import BeMerchant from "../beMerchant/BeMerchant.jsx";
import HowItWorks from "../HowItWorks/HowItWorks.jsx";
import ReviewComponent from "../Review/ReviewComponent.jsx";


const Home = () => {
    return (
        <div className=''>
           <Banner/>
            <HowItWorks/>
            <Services/>
            <ClientLogoSlider/>
            <Benefits/>
            <BeMerchant/>
           <ReviewComponent/>
        </div>
    );
};

export default Home;
