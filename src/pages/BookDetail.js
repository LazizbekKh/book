/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useContext, useRef } from "react";
import { Star } from "../components/Star";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper.scss";
import { BookCard } from "../components/BookCard";
import { SaleButton } from "../components/SaleButton";
import { Download } from "../components/Download";
import { Context } from "../context/MainContext";
import language from "../constants/language";
import { Loading } from "../components/Loading";
import { DownLoading } from "../components/DownLoading";
import axios from "axios";

export const BookDetail = ({ match, history }) => {
  const { apiService, currentLang, token, getCurrency, currency, usd } =
    useContext(Context);
  const book_id = parseInt(match.params.id);
  const [book, setBook] = useState(null);
  const [format, setFormat] = useState([]);
  const [formatValue, setFormatValue] = useState("");
  const [loading, setLoading] = useState(true);
  const [downloading, setDownloading] = useState(false);
  const [progress, setProgress] = useState(0);

  const link = useRef();
  const download = () => {
    setDownloading(true);
    const body = {
      extension: formatValue,
    };
    let anchor = document.createElement("a");
    document.body.appendChild(anchor);
    axios
      .get(
        `http://128.199.140.84/api/get/book/${book_id}?` +
          new URLSearchParams(body),
        {
          responseType: "blob",
          headers: { Authorization: `Bearer ${token}` },
          onDownloadProgress: (p) => {
            setProgress(p);
          },
        }
      )
      .then((blob) => {
        let objectUrl = window.URL.createObjectURL(new Blob([blob.data]));
        anchor.href = objectUrl;
        anchor.download = `${book.name}.${formatValue}`;
        anchor.click();
        window.URL.revokeObjectURL(objectUrl);
        setDownloading(false);
      })
      .catch((e) => {
        alert(language[currentLang].error);
        setDownloading(false);
      });
    // apiService
    //   .getBlob(`/get/book/${book_id}?` + new URLSearchParams(body), token)
    //   .then((blob) => {

    //   });
  };
  const postOrder = () => {
    if (!token) {
      history.push("/auth");
      return;
    }
    const body = {
      item_id: book_id,
    };
    apiService.postData("/checkout", token, body).then((value) => {
      if (value.statusCode === 200) {
        window.location.reload();
      }
    });
  };

  useEffect(() => {
    setLoading(true);
    apiService
      .getResources("/book/" + book_id, token)
      .then((value) => {
        if (value.statusCode === 200) {
          setBook(value.data);
          setLoading(false);
          if (value.data.is_bought) {
            apiService
              .getResources("/extension/book/" + book_id, token)
              .then((value) => {
                if (value.statusCode === 200) {
                  setFormat(value.data);
                  value.data.length > 0 && setFormatValue(value.data[0]);
                }
              });
          }
        }
        // postOrder();
      })
      .catch((e) => {
        setLoading(false);
      });
  }, []);
  if (loading) return <Loading />;
  // if (downloading) return <DownLoading />;
  return (
    <div className="info">
      {downloading && (
        <DownLoading
          progress={progress}
          lang={language[currentLang].downloading}
        />
      )}
      <div className="container">
        <div className="info-book__hidden">
          <div className="info-book__name">{book.name}</div>
        </div>
        <div className="info-book">
          <div className="col-lg-4 col-md-6 col-sm-12 info-book__block">
            <div className="info-book__img">
              <img
                src={book.image[0]}
                className="info-book__img-photo"
                alt="book"
              />
            </div>
          </div>
          <div className="col-lg-8 col-md-6 col-sm-12 info-book__block">
            <div className="info-book__visible">
              <div className="info-book__name">{book.name}</div>
            </div>
            <div className="detail">
              <div className="book-type detail-book_type">
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
              <div className="detail-item">
                <div className="detail-item__left">
                  {language[currentLang].author}:
                </div>
                <div className="detail-item__right">{book.author.name}</div>
              </div>
              <div className="detail-item">
                <div className="detail-item__left">
                  {language[currentLang].rating}:
                </div>
                <div className="detail-item__right">
                  <div className="detail-item__rating">
                    <Star rating={book.rating} size={13} />
                    <span className="detail-item__rating-span">
                      {book.rating}
                    </span>
                  </div>
                </div>
              </div>
              <div className="detail-item">
                <div className="detail-item__left">
                  {language[currentLang].datePublish}:
                </div>
                <div className="detail-item__right">{book.publish_date}</div>
              </div>
              <div className="detail-item">
                <div className="detail-item__left">
                  {language[currentLang].volume}:
                </div>
                <div className="detail-item__right">
                  {book.size} {language[currentLang].pages}.
                </div>
              </div>
              <div className="detail-item">
                <div className="detail-item__left">
                  {language[currentLang].genre}:
                </div>
                <div className="detail-item__right detail-item__right--purple">
                  {book.categories.map(
                    (item, key) =>
                      `${
                        currentLang === 0
                          ? item.name_ru
                          : currentLang === 1
                          ? item.name_uz
                          : item.name_en
                      }${key === book.categories.length - 1 ? "." : ", "}`
                  )}
                </div>
              </div>
              {book.is_bought && (
                <div className="detail-item detail-download">
                  <div className="detail-item__left">
                    {language[currentLang].download_format}:
                  </div>
                  <div className="detail-item__right">
                    <div className="detail-item__type">
                      {format &&
                        format.map((f, i) => (
                          <React.Fragment key={`${i} ${f.id}`}>
                            {f}{" "}
                          </React.Fragment>
                        ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="d-flex info-buttons">
          <div className="button-tag button-tag_purple col-lg-4 col-md-6 col-sm-12">
            <img className="button-tag__img" src="/img/price.svg" alt="price" />
            {currency === 1 ? book.price : parseFloat(book.price) * usd}{" "}
            {getCurrency()}
          </div>
          {book.is_bought ? (
            <Download
              saled={true}
              link={link}
              format={format}
              download={download}
              formatValue={formatValue}
              setFormatValue={setFormatValue}
              textButton={language[currentLang].download}
            />
          ) : (
            <SaleButton
              textButton={language[currentLang].purchasing}
              purchasing={postOrder}
            />
          )}
        </div>
        <div className="title">{language[currentLang].book_descript}</div>
        <div className="info-block blur">{book.description}</div>
        {book.recommmend && (
          <div className="title">{language[currentLang].recommmend}</div>
        )}
        <div className="hidden visible">
          <div className="hidden__overlay" />
          <Swiper
            className="book-slider"
            slidesPerView="auto"
            loop={true}
            loopedSlides={4}
            spaceBetween={15}
          >
            {book.recommmend &&
              book.recommmend.map((book, i) => (
                <SwiperSlide key={`${i} ${book.id}`}>
                  <BookCard book={book} />
                </SwiperSlide>
              ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
};
