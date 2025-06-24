import React from 'react';
import Marquee from 'react-fast-marquee';

import logo1 from '../../../assets/brands/casio.png';
import logo2 from '../../../assets/brands/amazon.png';
import logo3 from '../../../assets/brands/amazon_vector.png';
import logo4 from '../../../assets/brands/moonstar.png';
import logo5 from '../../../assets/brands/start.png';
import logo6 from '../../../assets/brands/randstad.png';
import logo7 from '../../../assets/brands/start-people 1.png';

const logos = [logo1, logo2, logo3, logo4, logo5, logo6, logo7];

const ClientLogoSlider = () => {
    return (
        <section className=" py-12">
            <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-[#03373D]">We've helped thousands of sales teams</h2>
            </div>

            <Marquee speed={40} pauseOnHover={true} gradient={false}>
                {logos.map((logo, index) => (
                    <img
                        key={index}
                        src={logo}
                        alt={`Client ${index + 1}`}
                        className="h-6 mx-7"
                    />
                ))}
            </Marquee>
        </section>
    );
};

export default ClientLogoSlider;
