import React, { useState, useRef, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { Loading } from "../components/Loading";
import language from "../constants/language";
import { Context } from "../context/MainContext";

export const RegisterBlock4 = ({ history }) => {
  const { apiService, token, currentLang } = useContext(Context);

  const [loading, setLoading] = useState(true);
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
    apiService.getResources("/user", token).then((value) => {
      if (value) {
        setUser(value);
      }
    });
    setLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  if (loading) {
    return <Loading />;
  }
  return (
    <div className="register">
      <div className="register-navs">
        <button
          onClick={() => history.goBack()}
          className="register-navs__item"
        >
          <img className="nav__img" src="/img/back.svg" alt="" />
        </button>
        <Link to={"/"} className="register-navs__item">
          <img className="nav__img" src="/img/close.svg" alt="" />
        </Link>
      </div>
      <div className="register-wrap">
        <img src="/img/1.gif" className="register__img" alt="sova" />
        <div className="register__title">
          {language[currentLang].welcome}
          <div className="register__title-span">{user.name}</div>
        </div>
        <div className="register-form">
          <div className="register-form__info">
            {language[currentLang].link_title}
            <span className="register-form__green">SPARK!</span>
          </div>
          <div className="register-form__orange">
            {language[currentLang].more}
          </div>
          <button
            ref={(link) => (textArea.current = link)}
            onClick={copyToClipboard}
            type="text"
            className="register-form__input register-form__block"
          >
            {/* {user && "https://www.128.199.140.84.uz?referal=" + user.uuid} */}
          </button>
          <button
            ref={button}
            onClick={copyToClipboard}
            className="register-form__button register-form__block"
          >
            {copySuccess}
          </button>
          <button
            onClick={() => history.push("/")}
            className="register-form__info register-form__repeat"
          >
            {language[currentLang].notNow}
          </button>
        </div>
      </div>
    </div>
  );
};
