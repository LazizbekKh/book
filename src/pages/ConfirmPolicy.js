import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Context } from "../context/MainContext";
import language from "../constants/language";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

export const ConfirmPolicy = ({ history }) => {
  const { currentLang } = useContext(Context);

  const handleChange = (event) => {
    setAgreement(!agreement);
  };
  const [agreement, setAgreement] = useState(false);
  const confirm = (e) => {
    if (!!agreement) {
      history.push("/register");
    } else {
      history.push("/user");
    }
  };
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
      <div className="register-wrap register-confirm">
        <form
          onSubmit={(e) => confirm(e)}
          className="register-form confirm-form"
        >
          <div className="confirm-wrap">
            <FormControlLabel
              control={
                <Checkbox
                  color="primary"
                  //   checked={setAgreement(!agreement)}
                  onChange={handleChange}
                  name="gilad"
                />
              }
              label={`${language[currentLang].agreement}`}
              style={{ color: "#fff" }}
            />
            {/* <div className="title">soglashayus s usloviyami lichnoy oferti</div> */}
          </div>
          <button
            className="register-form__button register-form__block"
            disabled={!agreement}
          >
            {language[currentLang].submit}
          </button>
        </form>
      </div>
    </div>
  );
};
