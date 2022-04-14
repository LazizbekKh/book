import React, { useContext, useState } from "react";
import { Loading } from "../components/Loading";
import language from "../constants/language";
import InputMask from "react-input-mask";
import { Context } from "../context/MainContext";

export default function CashBackData({ history }) {
  const { apiService, currentLang, token } = useContext(Context);
  const [card, setCard] = useState("");
  const [loading, setLoading] = useState(false);

  const confirm = (e) => {
    setLoading(true);
    e.preventDefault();
    const body = {
      ...(card.trim().length > 0 && { card: card.replace(/\s/g, "") }),
    };
    apiService.postData("/cashback", token, body).then((value) => {
      setLoading(false);
      if (value.statusCode === 200) {
        setLoading(false);
        history.push("/user");
      } else {
        setLoading(false);
        // history.push("/user");
      }
    });
  };
  if (loading) {
    return <Loading />;
  }
  return (
    <div className="register">
      <div className="register-wrap">
        <div className="register__title">
          {language[currentLang].credentials}
        </div>
        <form onSubmit={(e) => confirm(e)} className="register-form">
          <div className="register-form__info">
            {language[currentLang].enterCard}
          </div>
          <InputMask
            mask="8600 9999 9999 9999"
            placeholder="---- ---- ---- ----"
            className="register-form__input register-form__block"
            onChange={(e) => setCard(e.target.value)}
            required
          />
          <button className="register-form__button register-form__block">
            {language[currentLang].submit}
          </button>
        </form>
      </div>
    </div>
  );
}
