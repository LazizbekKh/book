import React from "react";
import { NavLink } from "react-router-dom";
import { Context } from "../context/MainContext";

const languages = [
  { lang: "RU", id: 0 },
  { lang: "UZ", id: 1 },
  { lang: "EN", id: 2 },
];

export class Navbar extends React.Component {
  static contextType = Context;

  constructor() {
    super();
    this.myRef = React.createRef();
  }

  state = {
    auth: false,
    slide: true,
    lastScrollY: 0,
    opened: false,
    currencyOpened: false,
  };
  handleClickOutside = (e) => {
    if (!this.myRef.current.contains(e.target)) {
      this.setState({
        opened: false,
        currencyOpened: false,
      });
    }
  };
  setValue = (language) => {
    this.context.changeLanguage(language.id);
    this.setState({
      opened: false,
    });
  };
  setCurrency = (value) => {
    this.context.setCurrency(value);
    this.setState({
      currencyOpened: false,
    });
  };

  componentDidMount() {
    window.addEventListener("scroll", this.handleScroll);
    document.addEventListener("click", (e) => this.handleClickOutside(e));
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
    window.removeEventListener("click", (e) => this.handleClickOutside(e));
  }

  handleScroll = () => {
    const { lastScrollY } = this.state;
    const currentScrollY = window.scrollY;

    if (currentScrollY > lastScrollY) {
      this.setState({ slide: false });
    } else {
      this.setState({ slide: true });
    }
    this.setState({ lastScrollY: currentScrollY });
  };

  render() {
    const { token, currentLang, currencies, getCurrency } = this.context;
    return (
      <nav
        className={`nav ${this.state.slide ? "nav-show" : ""}`}
        ref={this.myRef}
      >
        <NavLink to="/search">
          <img className="nav__img" src="/img/search-icon.svg" alt="" />
        </NavLink>
        <button
          onClick={() =>
            this.setState({ currencyOpened: !this.state.currencyOpened })
          }
          className="nav__link nav__secondary"
        >
          {getCurrency()}
        </button>
        <NavLink className="nav__link nav__middle" to="/">
          <img
            className="nav__img nav__logo"
            src="/img/logo-back.svg"
            alt="logo"
          />
        </NavLink>
        <button
          onClick={() => this.setState({ opened: !this.state.opened })}
          className="nav__link nav__secondary"
        >
          {languages[currentLang].lang}
        </button>
        <NavLink to={token ? "/user" : "/auth"} className="nav__link">
          <img className="nav__img" src="/img/user.svg" alt="" />
        </NavLink>
        {this.state.currencyOpened && (
          <div className="nav-drop nav-currency">
            {currencies.map((language) => (
              <div
                onClick={() => this.setCurrency(language.id)}
                className="nav-drop__item"
                key={language.id}
              >
                {language.currency}
              </div>
            ))}
          </div>
        )}
        {this.state.opened && (
          <div className="nav-drop nav-language">
            {languages.map((language) => (
              <div
                onClick={() => this.setValue(language)}
                className="nav-drop__item"
                key={language.id}
              >
                {language.lang}
              </div>
            ))}
          </div>
        )}
      </nav>
    );
  }
}
