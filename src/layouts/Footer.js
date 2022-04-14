import React, { useContext } from "react";
import { Link } from "react-router-dom";
import language from "../constants/language";
import { Context } from "../context/MainContext";

const Footer = () => {
  const { currentLang } = useContext(Context);
  return (
    <div className="footer">
      <div className="container">
        <div className="footer-top">
          <Link to="/" className="footer-top__logo">
            <img
              className="nav__img nav__logo"
              src="/img/logo-back.svg"
              alt="logo"
            />
          </Link>
          <div className="footer-top__block">
            <div className="footer-top__navs navs">
              <div className="navs__title">LazizBook</div>
              <ul className="navs __ul">
                <li className="navs__li">
                  <Link to="/policy" className="navs__link">
                    {language[currentLang].offerta}
                  </Link>
                </li>
              </ul>
            </div>
            <div className="footer-top__navs navs">
              <div className="navs__title">{language[currentLang].contact}</div>
              <ul className="navs __ul">
                <li className="navs__li navs__link">+99890 111-11-11</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="footer-hidden">
          <div className="footer-bottom__socials">
            <a
              href="https://www.instagram.com"
              className="footer-bottom__link"
              target={`blank`}
            >
              <img
                src="/img/Instagram.svg"
                className="footer-bottom__img"
                alt="instagram"
              />
            </a>
          </div>
        </div>
        <div className="footer-bottom">
          <div className="visible footer-bottom__socials">
            <a
              href="https://www.instagram.com/"
              className="footer-bottom__link"
              rel="noopener noreferrer"
              target="_blank"
            >
              <img
                src="/img/Instagram.svg"
                className="footer-bottom__img"
                alt="instagram"
              />
            </a>
          </div>
          <div className="footer-bottom__developers"></div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
