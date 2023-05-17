import React from 'react';
import header1 from '../assets/headerImages/one.jpeg';
import header2 from '../assets/headerImages/Headertwo.jpeg';
import header3 from '../assets/headerImages/header3.jpeg';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css';

function Hero() {
  const SwiperSlideStyle = {
    width: '100%',
    height: '100%',
  };
  const SwiperStyle = {
    width: '100%',
    height: '800px',
  };
  return (
    <>
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        spaceBetween={2}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}
        // onSwiper={(swiper) => console.log(swiper)}
        // onSlideChange={() => console.log('slide change')}
        style={SwiperStyle}
      >
        <SwiperSlide style={SwiperSlideStyle}>
          <img src={header1} alt='' />
        </SwiperSlide>
        <SwiperSlide style={SwiperSlideStyle}>
          <img src={header2} alt='' />
        </SwiperSlide>
        <SwiperSlide style={SwiperSlideStyle}>
          <img src={header3} alt='' />
        </SwiperSlide>
      </Swiper>
    </>
  );
}

export default Hero;
