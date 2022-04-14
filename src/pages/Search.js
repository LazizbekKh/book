/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useContext } from "react";
import { useState } from "react";
import { BookCard } from "../components/BookCard";
import { Filter } from "../components/Filter";
// import { Pagination } from "../components/Pagination";
import { Context } from "../context/MainContext";
import Pagination from "rc-pagination";
import { SearchLoading } from "../components/SearchLoading";
import language from "../constants/language";

export function useCustonInput() {
  const [value, setValue] = useState("");
  const onChange = (event) => {
    setValue(event.target.value);
  };
  return {
    value,
    onChange,
  };
}

export const Search = () => {
  const { apiService, currentLang } = useContext(Context);

  const [loading, setLoading] = useState(true);
  const [startDate, setStartDate] = useState(new Date());
  const [dateChosen, setDateChosen] = useState(false);
  const input = useCustonInput();

  const [currentPage, setCurrentPage] = useState(1);
  const [books, setBooks] = useState([]);
  const [lastPage, setLastPage] = useState(0);
  const [total, setTotal] = useState(0);
  const [categories, setCategories] = useState([]);
  const [categoryId, setCategoryId] = useState(0);
  const [typeId, setTypeId] = useState(0);
  const [sort, setSort] = useState(0);

  const sortArray = [
    {
      id: 1,
      name_en: "The Newest",
      name_ru: "Новейший",
      name_uz: "Eng yangisi",
    },
    {
      id: 2,
      name_en: "The Oldest",
      name_ru: "Старейший",
      name_uz: "Eng eski",
    },
    {
      id: 3,
      name_en: "The Cheapest",
      name_ru: "Самый дешевый",
      name_uz: "Eng Arzon",
    },
    {
      id: 4,
      name_en: "The Expensive",
      name_ru: "Дорогой",
      name_uz: "Eng Qimmat",
    },
  ];

  const typeArray = [
    {
      id: 1,
      name_en: "Text",
      name_ru: "Техт",
      name_uz: "Tekst",
    },
    {
      id: 2,
      name_en: "Audio",
      name_ru: "Аудио",
      name_uz: "Audio",
    },
  ];

  const getCategoryValue = () => {
    if (categoryId > 0) {
      const getter = categories.find((cat) => cat.id === categoryId);
      return currentLang === 0
        ? getter.name_ru
        : currentLang === 1
        ? getter.name_uz
        : getter.name_en;
    }
    return language[currentLang].all;
  };
  const getSortValue = () => {
    if (sort > 0) {
      const getter = sortArray.find((cat) => cat.id === sort);
      return currentLang === 0
        ? getter.name_ru
        : currentLang === 1
        ? getter.name_uz
        : getter.name_en;
    }
    return language[currentLang].all;
  };
  const getTypeValue = () => {
    if (typeId > 0) {
      const getter = typeArray.find((cat) => cat.id === typeId);
      return currentLang === 0
        ? getter.name_ru
        : currentLang === 1
        ? getter.name_uz
        : getter.name_en;
    }
    return language[currentLang].all;
  };

  const searchItems = (e) => {
    if (e) e.preventDefault();
    const body = {
      ...(categoryId > 0 && { category_id: categoryId }),
      ...(dateChosen > 0 && {
        publish_date: "01-01-" + startDate.getFullYear(),
      }),
      ...(sort !== 0 && {
        order_by: sort === 1 || sort === 2 ? "created_at" : "price",
      }),
      ...(sort !== 0 && {
        sort_by: sort === 1 || sort === 4 ? "ASC" : "DESC",
      }),
      // order_by : created_at || price
      // sort_by : ASC || DESC
      page:
        sort !== 0 || dateChosen > 0 || categoryId > 0 || typeId > 0
          ? "1"
          : currentPage,
      ...(typeId > 0 && { type: typeId }),
      ...(input.value.length > 0 && { keyword: input.value }),
    };
    console.log(body);
    if (!loading) setLoading(true);
    apiService
      .getResources("/search?" + new URLSearchParams(body))
      .then((value) => {
        if (value) {
          setBooks(value.data);
          setLastPage(value.last_page);
          if (total !== value.total) setTotal(value.total);
        } else {
          // alert error
          setBooks([]);
        }
        setLoading(false);
      })
      .catch((e) => setLoading(false));
  };

  useEffect(() => {
    apiService.getResources("/categories").then((value) => {
      if (value.statusCode === 200) {
        setCategories(value.data);
      }
    });
    searchItems();
  }, [currentPage]);

  return (
    <div className="search">
      <div className="container">
        <div className="search-top">
          <div className="search__text">
            {language[currentLang].search_title}
          </div>
          <img src="/img/1.gif" alt="sova" className="search-top__img" />
        </div>
        <div className="navigation blur">
          <form onSubmit={(e) => searchItems(e)} className="navigation-typing">
            <div className="col-lg-9 col-xs-12 navigation-typing__wrap">
              <input
                type="text"
                className="navigation-typing__input blur"
                placeholder={language[currentLang].search_placeHolder}
                {...input}
              />
              <button className="navigation-typing__absolute">
                <img src="/img/search-icon.svg" alt="" />
              </button>
            </div>
            <div className="col-3 navigation-typing__col">
              <button
                // onClick={searchItems}
                className="navigation-typing__button"
              >
                <img
                  src="/img/search-icon.svg"
                  className="navigation-typing__icon"
                  alt=""
                />
                {language[currentLang].search_button}
              </button>
            </div>
          </form>
          <div className="navigation-filter filter">
            <Filter
              title={language[currentLang].genre}
              value={getCategoryValue()}
              data={categories}
              method={setCategoryId}
              currentLang={currentLang}
            />
            <Filter
              title={language[currentLang].datePublish}
              startDate={startDate}
              setStartDate={setStartDate}
              setDateChosen={setDateChosen}
              date={true}
              dateChosen={dateChosen}
            />
            <Filter
              title={language[currentLang].search_type}
              value={getTypeValue()}
              data={typeArray}
              method={setTypeId}
            />
            <Filter
              title={language[currentLang].sorting}
              value={getSortValue()}
              data={sortArray}
              method={setSort}
            />
          </div>
        </div>
        {loading ? (
          <SearchLoading />
        ) : (
          <>
            <div className="search-books">
              {books &&
                books.map((book, i) => (
                  <BookCard book={book} key={`${book.id} ${i}`} />
                ))}
            </div>
            {lastPage > 1 && (
              <div>
                <Pagination
                  defaultCurrent={1}
                  pageSize={20}
                  total={total}
                  onChange={(e) => {
                    setCurrentPage(e);
                  }}
                  className="pager"
                  current={currentPage}
                  nextIcon={<img src="/img/next_arrow.svg" alt="next" />}
                  prevIcon={<img src="/img/prev_arrow.svg" alt="prev" />}
                />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};
