/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useRef, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { BookCard } from "../components/BookCard";
import { Loading } from "../components/Loading";
// import { Filter } from "../components/Filter";
import { ProgressBar } from "../components/ProgressBar";
import language from "../constants/language";
import { Context } from "../context/MainContext";

export const UserData = ({ history }) => {
  const { apiService, token, currentLang, logout } = useContext(Context);

  const [loading, setLoading] = useState(true);
  const [books, setBooks] = useState([]);

  const arr = [1, 2, 3, 4, 5, 6];
  const [user, setUser] = useState({});
  const textArea = useRef();
  const button = useRef();
  const [copySuccess, setCopySuccess] = useState(language[currentLang].copy);

  const copyToClipboard = () => {
    const text = textArea.current.innerText;
    navigator.clipboard.writeText(text);
    button.current.style.background = "#FE8D00";
    setCopySuccess(language[currentLang].copied);
  };

  useEffect(() => {
    setLoading(true);
    apiService.getResources("/user", token).then((value) => {
      if (value) {
        setUser(value);
        setLoading(false);
      }
      if (value.status === 401) {
        setLoading(false);
        localStorage.removeItem("token");
        history.push("/auth");
      }
    });
    apiService.getResources("/orders", token).then((value) => {
      if (value.statusCode === 200) {
        setBooks(
          value.data.map((order) => {
            const book = order.book;
            book.price = order.price;
            return book;
          })
        );
      }
    });
  }, []);

  if (loading || !user) {
    return <Loading />;
  }

  return (
    <div className="user">
      <div className="container">
        <div className="user-info blur proccess">
          <div className="proccess__title">
            {language[currentLang].hello} <span>{user.name}</span> !
          </div>
          <div className="proccess_cashback cashback">
            <button
              className="cashback-button"
              style={{
                width: "auto",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <img
                src="/img/out.svg"
                alt="out"
                width={30}
                height={30}
                style={{ marginLeft: 10, marginRight: 10 }}
                onClick={() => logout()}
              />
            </button>
          </div>
        </div>
        <div className="user-stats stats">
          <div className="stats-block blur">
            <div className="stats-title">
              {language[currentLang].sumPurchase}
            </div>
            <div className="stats-number">
              {user.friends && user.friends.order_sum}$
            </div>
          </div>
        </div>
        <div className="title">{language[currentLang].library}</div>
        <div className="search-books">
          {books.length > 0 ? (
            books.map((book, i) => (
              <BookCard book={book} key={`${book.id} ${i}`} />
            ))
          ) : (
            <div className="title">{language[currentLang].user_empty}</div>
          )}
        </div>
      </div>
    </div>
  );
};
