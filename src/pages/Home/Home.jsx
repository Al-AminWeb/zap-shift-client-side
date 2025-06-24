import React from 'react';
import Banner from "./banner/Banner.jsx";
import Services from "./services/Services.jsx";
import ClientLogoSlider from "./clientLogosMarquee/ClientLogoSlider.jsx";
import Benefits from "./benefits/Benefits.jsx";

const Home = () => {
    return (
        <div className=''>
           <Banner/>
            <Services/>
            <ClientLogoSlider/>
            <Benefits/>
        </div>
    );
};

export default Home;
