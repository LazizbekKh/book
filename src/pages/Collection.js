import React, { useContext, useEffect, useState } from "react";
import { Star } from "../components/Star";
import { BookCard } from "../components/BookCard";
import { Context } from "../context/MainContext";
import { Loading } from "../components/Loading";
import language from "../constants/language";

export const Collection = ({ match }) => {
  const { apiService, currentLang, token } = useContext(Context);
  const collection_id = parseInt(match.params.id);
  const [collection, setCollection] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiService
      .getResources("/collection/" + collection_id, token)
      .then((value) => {
        if (value.statusCode === 200) {
          setCollection(value.data[0]);
        }
        setLoading(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) return <Loading />;

  return (
    <div className="info">
      <div className="container">
        <div className="info-book__hidden">
          <div className="info-book__name">{collection.name}</div>
        </div>
        <div className="info-book">
          <div className="col-lg-4 col-md-6 col-sm-12 info-book__block">
            <div className="info-book__img info-book__col-img">
              <img
                src={collection.books && collection.books[0].image}
                className="info-book__img-photo"
                alt="book"
              />
            </div>
          </div>
          <div className="col-lg-8 col-md-6 col-sm-12 info-book__block collect">
            <div className="info-book__visible">
              <div className="info-book__name">{collection.name}</div>
            </div>
            <div className="detail collect-detail">
              <div className="book-type detail-book_type">
                <button className="book-type__item book-type__item--blue">
                  Текст
                </button>
                <button className="book-type__item book-type__item--orange">
                  Аудио
                </button>
              </div>
              <div className="detail-item">
                <div className="detail-item__left">
                  {language[currentLang].author}:
                </div>
                <div className="detail-item__right">Марк Мэнсон</div>
              </div>
              <div className="detail-item">
                <div className="detail-item__left">
                  {language[currentLang].rating}:
                </div>
                <div className="detail-item__right">
                  <div className="detail-item__rating">
                    <Star rating={collection.rating} size={13} />
                    <span className="detail-item__rating-span">
                      {collection.rating}
                    </span>
                  </div>
                </div>
              </div>
              <div className="detail-item">
                <div className="detail-item__left">
                  {language[currentLang].volume}:
                </div>
                <div className="detail-item__right">
                  {collection.books && collection.books.length}{" "}
                  {language[currentLang].booksCount}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="title">{language[currentLang].result}</div>
        <div className="search-books">
          {collection.books &&
            collection.books.map((book, i) => (
              <BookCard key={`${i}`} book={book} />
            ))}
        </div>
      </div>
    </div>
  );
};
