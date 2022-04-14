import React, { createContext, useEffect, useMemo, useState } from "react";
import ApiService from "./api/ApiService";
import { Loading } from "../components/Loading";

export const Context = createContext();
const apiService = new ApiService();

const MainContext = ({ children }) => {
  const [token, setToken] = useState(null);
  const [phone, setPhone] = useState(null);
  const [registered, setRegistered] = useState(false);
  const [loading, setLoading] = useState(true);
  const [currentLang, setCurrentLang] = useState(0);
  const [usd, setUsd] = useState(0);
  const [relatedId, setRelatedUuid] = useState(null);
  const [currency, setCurrencyValue] = useState(0); /// 0 - uzs , 1 - USD
  const currencies = useMemo(
    () => [
      { currency: "UZS", id: 0 },
      { currency: "USD", id: 1 },
    ],
    []
  );
  const getStorageData = (name, method) => {
    const data = JSON.parse(localStorage.getItem(name));
    if (data) method(data);
  };
  const removeStorageData = (name) => {
    localStorage.removeItem(name);
  };
  const logout = () => {
    removeStorageData("token");
    window.location.replace("/");
  };
  const saveStorageData = (name, value, method) => {
    method(value);
    localStorage.setItem(name, JSON.stringify(value));
  };
  const setRelatedId = (value) => {
    saveStorageData("related", value, setRelatedUuid);
  };
  const setCurrency = (value) => {
    saveStorageData("currency", value, setCurrencyValue);
  };
  const saveToken = (value) => {
    saveStorageData("token", value, setToken);
  };
  const saveRegister = (value) => {
    saveStorageData("registered", value, setRegistered);
  };
  const savePhone = (value) => {
    saveStorageData("phone", value, setPhone);
  };
  const changeLanguage = (value) => {
    setCurrentLang(value);
    saveStorageData("lang", value, setCurrentLang);
  };
  const getCurrency = () => {
    return currencies.find((item) => item.id === parseInt(currency)).currency;
  };

  useEffect(() => {
    if (
      window.location.protocol === "http:" &&
      process.env.NODE_ENV === "production"
    ) {
      window.location.replace("/");
      return;
    }
    getStorageData("token", setToken);
    getStorageData("registered", setRegistered);
    getStorageData("lang", setCurrentLang);
    getStorageData("phone", setPhone);
    getStorageData("currency", setCurrencyValue);
    let params = new URL(document.location).searchParams;
    let getUUID = params.get("referal");
    if (getUUID) setRelatedId(getUUID);
    else getStorageData("related", setRelatedUuid);
    apiService.getResources("/currency").then((value) => {
      setUsd(parseFloat(value.data.value));
      setLoading(false);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  if (loading) return <Loading />;
  return (
    <Context.Provider
      value={{
        apiService,
        phone,
        savePhone,
        token,
        setToken,
        saveToken,
        registered,
        saveRegister,
        currentLang,
        changeLanguage,
        currency,
        setCurrency,
        currencies,
        usd,
        getCurrency,
        relatedId,
        logout,
      }}
    >
      {children}
    </Context.Provider>
  );
};
export default MainContext;
