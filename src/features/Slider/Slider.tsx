import { Navigation, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import './Slider.scss';

type Props = {
  images: string[],
};

export const Slider: React.FC<Props> = ({ images }) => {
  return (
    <Swiper
      className="Slider"
      modules={[Navigation, Pagination]}
      effect="fade"
      spaceBetween={0}
      loop
      navigation={{
        nextEl: '.Slider__next',
        prevEl: '.Slider__prev',
      }}
      pagination={{
        clickable: true,
        type: 'bullets',
      }}
    >
      {images.map(image => (
        <SwiperSlide
          key={image}
          className="Slider__slide"
        >
          <img
            src={image}
            alt={image}
            className="Slider__image"
          />
        </SwiperSlide>
      ))}

      <div className="Slider__prev swiper-button-prev" />
      <div className="Slider__next swiper-button-next" />

    </Swiper>
  );
};
