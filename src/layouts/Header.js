import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { EffectFade, Autoplay } from "swiper";
import language from "../constants/language";
import { Context } from "../context/MainContext";
import "swiper/swiper.scss";
import "swiper/components/effect-fade/effect-fade.scss";

SwiperCore.use([Autoplay]);
SwiperCore.use([EffectFade]);
export const Header = ({ slider }) => {
  const { currentLang } = useContext(Context);

  return (
    <div className="header">
      <div className="container header-wrap">
        <div className="header-left">
          <div className="header-left__text">
            {language[currentLang].header_title}
          </div>
          <Link to="/search" className="header-left__button custom-button">
            {language[currentLang].button_text}
            <img
              src="/img/arrow.png"
              className="custom-button__img"
              alt="arrow"
            />
          </Link>
        </div>
        <div className="header-right">
          <Swiper
            slidesPerView="auto"
            loop={true}
            loopedSlides={5}
            autoplay={{ delay: 5000 }}
            speed={100}
          >
            {slider.map((slide, i) => (
              <SwiperSlide key={`${i} ${slide.id}`}>
                <img
                  src={slide.image}
                  className="header-right__img"
                  alt="big-book"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
};
