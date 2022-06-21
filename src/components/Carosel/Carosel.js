import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import CaroselItem from "./CaroselItem";
import { Pagination, Autoplay } from "swiper";
import "swiper/css/pagination";
import Banner from "../../Db/Banner.json";

const Carosel = () => {
    const pagination = {
        clickable: true,
        renderBullet: function (index, className) {
            return `<div class="${className}"></div>`;
        },
    };

    return (
        <div className='p-4 text-white rounded-lg w-full'>
            <Swiper
                modules={[Pagination, Autoplay]}
                pagination={pagination}
                spaceBetween={50}
                slidesPerView={1}
                loop={true}
                autoplay={true}
            >
                {Banner.map((banner) => (
                    <SwiperSlide key={banner.id}>
                        <CaroselItem data={banner} />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default Carosel;
