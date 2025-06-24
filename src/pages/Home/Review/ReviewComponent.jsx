import React, { useEffect, useState } from "react";
import reviewData from "../../../data/reviews.json";
import ReviewCard from "./ReviewCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, EffectCoverflow } from "swiper/modules";
import { MdArrowForward } from "react-icons/md";
import { MdArrowBack } from "react-icons/md";
import logoReview from "../../../assets/customer-top.png"
import SwiperCore from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";

const ReviewComponent = () => {
    const [swiperInstance, setSwiperInstance] = useState(null);

    useEffect(() => {
        if (swiperInstance) {
            // Reinitialize navigation and pagination
            swiperInstance.params.navigation.prevEl = ".custom-prev";
            swiperInstance.params.navigation.nextEl = ".custom-next";
            swiperInstance.params.pagination.el = ".custom-pagination";
            swiperInstance.navigation.destroy();
            swiperInstance.navigation.init();
            swiperInstance.navigation.update();
            swiperInstance.pagination.destroy();
            swiperInstance.pagination.init();
            swiperInstance.pagination.update();
        }
    }, [swiperInstance]);

    return (
        <div className="bg-[#f5f7f8] py-12">

            <div className="w-full text-center flex flex-col items-center gap-4">
                <div><img src={logoReview} alt="" /></div>
                <div>
                    <h1 className="mb-4 text-2xl font-bold text-[#03373d]">What Our Customer Says</h1>
                    <p className="text-gray-600 font-medium w-2/3 mx-auto">Enhance posture, mobility, and well-being effortlessly with Posture Pro. Achieve proper alignment, reduce pain, and strengthen your body with ease!</p>
                </div>
            </div>


            <div className="max-w-6xl mx-auto px-4">


                <Swiper
                    modules={[Navigation, Pagination, EffectCoverflow]}
                    effect="coverflow"
                    grabCursor={true}
                    centeredSlides={true}
                    loop={true}
                    slidesPerView={0}
                    spaceBetween={60}
                    navigation={{
                        prevEl: ".custom-prev",
                        nextEl: ".custom-next",
                    }}
                    pagination={{
                        el: ".custom-pagination",
                        clickable: true,
                    }}
                    coverflowEffect={{
                        rotate: 0,
                        stretch: 0,
                        depth: 100,
                        modifier: 2.5,
                        slideShadows: false,
                    }}
                    breakpoints={{
                        768: {
                            slidesPerView: 3,
                        },
                    }}
                    onSwiper={setSwiperInstance}
                >
                    {reviewData.map((review, index) => (
                        <SwiperSlide key={index}>
                            <div className="transition-all scale-100 hover:scale-105 duration-300">
                                <ReviewCard review={review} />
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>


                {/* Custom nav + pagination BELOW swiper */}

                <div className="w-full flex items-center justify-center">
                    <div className="flex w-1/4 items-center justify-between gap-6 mt-6">
                        <div className="bg-white hover:bg-[#caeb66] text-black hover:text-[#03373d] p-2 flex items-center rounded-full shadow duration-300">
                            <button className="custom-next    text-2xl  ">
                                <MdArrowBack />
                            </button>
                        </div>

                        <div className="custom-pagination flex gap-2 w-1/2"></div>

                        <div className="bg-white text-black text-2xl hover:text-[#03373d hover:bg-[#caeb66] p-2 shadow flex items-center rounded-full duration-300">
                            <button className="custom-next  ]">
                                <MdArrowForward />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReviewComponent;