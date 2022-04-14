import React, { useContext } from "react";
import { Link } from "react-router-dom";
import language from "../constants/language";
import { Context } from "../context/MainContext";
import { Star } from "./Star";

export const BookCard = ({ book }) => {
  const { currentLang, getCurrency, currency, usd } = useContext(Context);

  return (
    <Link to={`/book/${book.id}`} className="block__book book">
      <div className="book-wrapper">
        <div className="book__author">{book.author && book.author.name}</div>
        <div className="book-image">
          <img
            src={book.image && book.image[0]}
            alt={book.name}
            className="book-image__photo"
          />
          <div className="book-type">
            {book.types &&
              book.types.map((type) => (
                <div
                  key={type.id}
                  className={`book-type__item ${
                    type.id === 1
                      ? "book-type__item--blue"
                      : "book-type__item--orange"
                  }`}
                >
                  {type.id === 1
                    ? language[currentLang].text
                    : language[currentLang].audio}
                </div>
              ))}
          </div>
        </div>
        <div className="book__name">{book.name}</div>
        <Star rating={book.rating} />
        <div className="cost">
          <div className="cost__money">
            {currency === 1 ? book.price : parseFloat(book.price) * usd}{" "}
            {getCurrency()}
          </div>
          <div className="cost__link">
            <img src="/img/arrow.svg" className="cost__img" alt="price-arrow" />
          </div>
        </div>
      </div>
      <div className="book__blur"></div>
    </Link>
  );
};
