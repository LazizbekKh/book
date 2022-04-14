import React, { useContext, useState, useRef } from "react";
import { Link } from "react-router-dom";
import InputMask from "react-input-mask";
import { Context } from "../context/MainContext";
import { Loading } from "../components/Loading";
import language from "../constants/language";

export const RegisterBlock1 = ({ history }) => {
  const { apiService, savePhone, currentLang } = useContext(Context);
  const phone = useRef(null);
  const [loading, setLoading] = useState(false);
  const sendPhone = (e) => {
    e.preventDefault();
    setLoading(true);
    const getPhone = phone.current.value
      .replace(/\s/g, "")
      .replace(/-/g, "")
      .replace(/[{()}]/g, "")
      .slice(4);
    const body = {
      phone: getPhone,
    };
    apiService.postData("/verification", null, body).then((value) => {
      setLoading(false);

      if (value.statusCode === 200) {
        savePhone(getPhone);
        history.push("confirm");
      }
    });
  };
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
        <div className="register__title">
          {language[currentLang].auth_title}
        </div>
        <form onSubmit={(e) => sendPhone(e)} className="register-form">
          <div className="register-form__info">
            {language[currentLang].enter_phone}
          </div>
          <InputMask
            ref={(input) => (phone.current = input)}
            mask="+\9\9\8 (99)999-99-99"
            placeholder="+998 "
            className="register-form__input register-form__block"
            required
          />
          <button className="register-form__button register-form__block">
            {language[currentLang].getCode}
          </button>
        </form>
      </div>
    </div>
  );
};
