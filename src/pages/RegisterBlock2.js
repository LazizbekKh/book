import React, { useContext, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Context } from "../context/MainContext";
import { Loading } from "../components/Loading";
import language from "../constants/language";

export const RegisterBlock2 = ({ history }) => {
  const { apiService, phone, saveToken, saveRegister, currentLang, relatedId } =
    useContext(Context);
  const code = useRef(null);
  const [loading, setLoading] = useState(false);
  const confirm = (e) => {
    setLoading(true);
    e.preventDefault();
    const body = {
      phone,
      verify_code: code.current.value,
      ...(relatedId && { linked: relatedId }),
    };
    apiService.postData("/auth", null, body).then((value) => {
      setLoading(false);
      if (value.statusCode === 200) {
        const checker = !!value.data.registered;
        saveToken(value.data.token);
        saveRegister(checker);

        if (!checker) {
          history.push("/confirm-policy");
        } else {
          history.push("/user");
        }
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
        <form onSubmit={(e) => confirm(e)} className="register-form">
          <div className="register-form__info">
            {language[currentLang].enter_code}
          </div>
          <input
            ref={(input) => (code.current = input)}
            type="text"
            className="register-form__input register-form__block register-form__centered"
            placeholder="123 123"
          />
          <button className="register-form__button register-form__block">
            {language[currentLang].submit}
          </button>
          <button className="register-form__info register-form__repeat">
            {language[currentLang].notTaked}
          </button>
        </form>
      </div>
    </div>
  );
};
