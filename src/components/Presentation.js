import React, { useContext } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from "swiper";
import "swiper/swiper.scss";
import "swiper/components/navigation/navigation.scss";
import "swiper/components/pagination/pagination.scss";
import "swiper/components/scrollbar/scrollbar.scss";
import language from "../constants/language";
import { Context } from "../context/MainContext";

SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);

export const Presentation = () => {
  const { currentLang } = useContext(Context);
  return (
    <div className="present blur">
      <Swiper
        // loop={true}
        loopedSlides={5}
        // autoplay={{ delay: 2000 }}
        speed={400}
        navigation
        pagination={{ clickable: true }}
        // navigation={{
        //   nextEl: `${(
        //     <img src="/img/slider_prev" className="swiper-button-prev" />
        //   )}`,
        //   prevEl: `${(
        //     <img src="/img/slider_next" className="swiper-button-next" />
        //   )}`,
        // }}
      >
        <SwiperSlide>
          <div className="present-wrap">
            <div className="present-block">
              <div className="present-block__title">
                <span>{language[currentLang].present_register_1}</span>{" "}
                {language[currentLang].present_title_1}
              </div>
              <div className="present-block__text">
                {language[currentLang].present_text_1}
              </div>
            </div>
            <img src="/img/man_1.svg" alt="man_1" className="present-img" />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="present-wrap">
            <div className="present-block">
              <div className="present-block__title">
                {language[currentLang].present_register_2} {""}
                <span>{language[currentLang].present_title_2}</span>
              </div>
              <div className="present-block__text">
                {language[currentLang].present_text_2}
              </div>
            </div>
            <img src="/img/present_2.svg" alt="man_1" className="present-img" />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="present-wrap">
            <div className="present-block">
              <div className="present-block__title">
                <span>{language[currentLang].present_register_3}</span>{" "}
                {language[currentLang].present_title_3}
              </div>
              <div className="present-block__text">
                {language[currentLang].present_text_3}
              </div>
            </div>
            <img
              src="/img/present_3.svg"
              alt="present_3"
              className="present-img"
            />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="present-wrap">
            <div className="present-block">
              <div className="present-block__title">
                <span>{language[currentLang].cashback}</span>{" "}
                {language[currentLang].present_title_4}
              </div>
              <div className="present-block__text">
                {language[currentLang].present_text_4}
              </div>
            </div>
            <img
              src="/img/present_5.svg"
              alt="present_5"
              className="present-img"
            />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="present-wrap">
            <div className="present-block">
              <div className="present-block__title">
                {language[currentLang].present_title_5} <span>Spark</span>
              </div>
              <div className="present-block__text">
                {language[currentLang].present_text_5}
              </div>
            </div>
            <img src="/img/present_4.svg" alt="man_1" className="present-img" />
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};
