import React, { useEffect, useContext, useState } from "react";
import { Header } from "../layouts/Header";
import { BookBlock } from "../components/BookBlock";
import { SliderBlock } from "../components/SliderBlock";
import { Context } from "../context/MainContext";
import { Loading } from "../components/Loading";
import language from "../constants/language";
import { Presentation } from "../components/Presentation";

export const Home = () => {
  const { apiService, currentLang } = useContext(Context);

  const [loading, setLoading] = useState(true);

  const [slider, setSlider] = useState([]);

  const [recommend, setRecommend] = useState([]);
  const [hot, setHot] = useState([]);
  const [collection, setCollection] = useState([]);
  const [newest, setNewest] = useState([]);

  useEffect(() => {
    apiService.getResources("/main").then((value) => {
      // setLoading(false);
      if (value.statusCode === 200) {
        setRecommend(value.recommend);
        setHot(value.hot);
        setCollection(value.collection);
        setNewest(value.newest);
      }
    });
    apiService.getResources("/slider").then((value) => {
      if (value.statusCode === 200) {
        setSlider(value.data);
        setLoading(false);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="home">
      <Header slider={slider} />
      <div className="container">
        <BookBlock books={recommend} title={language[currentLang].recommmend} />
      </div>
      <div className="slider">
        <SliderBlock books={hot} />
        <SliderBlock books={collection} collection={true} />
      </div>
      <div className="container">
        <BookBlock books={newest} title={language[currentLang].newest} />
      </div>
    </div>
  );
};
