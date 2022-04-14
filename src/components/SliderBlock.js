import React, { useContext } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import language from "../constants/language";
import { Context } from "../context/MainContext";
import { BigBook } from "./BigBook";
import SwiperCore, { Autoplay } from "swiper";
import { CollectionBook } from "./CollectionBook";

SwiperCore.use([Autoplay]);

export const SliderBlock = ({ books, collection }) => {
  const { currentLang } = useContext(Context);

  return (
    <>
      <div className="container">
        <div className="title">
          {collection
            ? language[currentLang].collection
            : language[currentLang].hot}
        </div>
      </div>
      <div className="slider__wrapper">
        <div className="slider__overlay" />
        {books && (
          <Swiper
            className="book-slider"
            slidesPerView="auto"
            loop={true}
            loopedSlides={5}
            autoplay={{ delay: 2000 }}
            speed={400}

            // autoplayDisableOnHover={true}
          >
            {books.map((book, i) => (
              <SwiperSlide key={`${i} ${book.id}`}>
                {collection ? (
                  !!book.books.length && <CollectionBook book={book} />
                ) : (
                  <BigBook book={book} />
                )}
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
      {/* <div className="slider__wrapper">
                <Slider >
                    {arr.map((b, i) => <BigBook key={i} collection={collection}/>)}
                </Slider>
            </div> */}
    </>
  );
};
