import React from "react";
import { BookCard } from "./BookCard";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper.scss";

export const BookBlock = ({ books, title }) => {
  return (
    <div className="home-block block">
      <div className="title">{title}</div>
      <div className="block-wrapper hidden">
        <div className="hidden__overlay"></div>
        {books && (
          <Swiper
            className="book-slider"
            slidesPerView="auto"
            loop={true}
            // loopFillGroupWithBlank={true}
            loopedSlides={3}
            autoplay={{ delay: 2000 }}
            speed={400}
            spaceBetween={15}
          >
            {books.map((book, i) => (
              <SwiperSlide key={`${i} ${book.id}`}>
                <BookCard book={book} />
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
      {/* <div className="d-flex justify-content-center">
                <button className="block__button custom-button">Найти больше книг
                    <img src="/img/arrow.png" className="custom-button__img" alt="arrow"/>
                </button>
            </div> */}
    </div>
  );
};
