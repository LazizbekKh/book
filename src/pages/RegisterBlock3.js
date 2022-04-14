import React, { useContext, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Context } from "../context/MainContext";
import { Loading } from "../components/Loading";
import language from "../constants/language";

export const RegisterBlock3 = ({ history }) => {
  const { apiService, token, currentLang } = useContext(Context);
  const name = useRef(null);
  const [loading, setLoading] = useState(false);
  const postName = (e) => {
    e.preventDefault();
    setLoading(true);
    const body = {
      name: name.current.value,
    };
    apiService
      .updateForm("/account", token, body)
      .then((value) => {
        if (value.statusCode === 200) {
          history.push("/");
        } else {
          setLoading(false);
        }
      })
      .catch((e) => setLoading(false));
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
        {/* <div className="register__title">
          {language[currentLang].register_title}
        </div> */}
        <form onSubmit={(e) => postName(e)} className="register-form">
          <div className="register-form__info">
            {language[currentLang].enter_name}
          </div>
          <input
            type="text"
            className="register-form__input register-form__block"
            placeholder="name"
            ref={(input) => (name.current = input)}
          />
          <button className="register-form__button register-form__block">
            {language[currentLang].save}
          </button>
        </form>
      </div>
    </div>
  );
};
