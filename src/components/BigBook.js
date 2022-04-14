import React, { useContext } from "react";
import { Link } from "react-router-dom";
import language from "../constants/language";
import { Context } from "../context/MainContext";
import { Star } from "./Star";

export const BigBook = ({ collection, book }) => {
  const { currentLang, getCurrency, currency, usd } = useContext(Context);

  return (
    <Link
      to={`${collection ? `/collection/${book.id}` : `/book/${book.id}`}`}
      className="big-book"
    >
      <div className="big-book__wrapper">
        <div className="big-book__insider">
          <div className="big-book__left book-image">
            <img
              src={book.image && book.image[0]}
              alt={book.image && book.image[0]}
              className="big-book__photo block-image__photo"
            />
            <div className="book-type big-book__button big-book__button-visible">
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
          <div className="big-book__right">
            <div className="big-book__name">{book.name}</div>
            <div className="big-book__author">
              {book.author && book.author.name}
            </div>
            <div className="big-book__rating">
              <Star rating={book.rating} />
            </div>
            <div className="big-book__descript big-book__visible">
              {book.description}
            </div>
            <div className="book-type big-book__button big-book__button-hidden">
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
            {collection ? (
              <div className="cost">
                <div className="cost__money">
                  {language[currentLang].goToCollection}
                </div>
                <div className="cost__link">
                  <img
                    src="/img/arrow.svg"
                    className="cost__img"
                    alt="price-arrow"
                  />
                </div>
              </div>
            ) : (
              <div className="cost">
                <div className="cost__money">
                  {currency === 1 ? book.price : parseFloat(book.price) * usd}{" "}
                  {getCurrency()}
                </div>
                <div className="cost__link">
                  <img
                    src="/img/arrow.svg"
                    className="cost__img"
                    alt="price-arrow"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="big-book__blur book__blur" />
    </Link>
  );
};
