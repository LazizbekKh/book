import React, { useContext } from "react";
import { Link } from "react-router-dom";
import language from "../constants/language";
import { Context } from "../context/MainContext";
import { Star } from "./Star";

export const CollectionBook = ({ book }) => {
  const { currentLang } = useContext(Context);

  return (
    <Link to={`/collection/${book.id}`} className="big-book">
      <div className="big-book__wrapper">
        <div className="big-book__insider">
          <div className="big-book__left book-image">
            <img
              src={book.books[0].image}
              alt={book.books[0].name}
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
            <div className="big-book__author">{book.author_id}</div>
            <div className="big-book__rating">
              <Star rating={book.rating} />
            </div>
            <div className="big-book__descript big-book__visible">
              {book.description}
            </div>
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
          </div>
        </div>
      </div>
      <div className="big-book__blur book__blur" />
    </Link>
  );
};
