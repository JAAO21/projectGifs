import React from "react";
import { useLocation } from "wouter";

import { Button } from "antd";

import useForm from "./hook";

import "./form.css";

const Rating = ["g", "pg", "pg-13", "r"];
const Language = ["en", "es", "pt", "fr", "it", "ko"];

const Form = ({ initialKeyword = "", initialRating = "g" }) => {
  const [, setLocation] = useLocation();

  const {
    keyword,
    rating,
    lenguage,
    updateKeyword,
    updateRating,
    updateLenguage,
    resetKeywor,
  } = useForm({ initialKeyword, initialRating });

  const HandleSubmit = (evet) => {
    evet.preventDefault();
    //navegacion
    setLocation(`/search/${keyword}/${rating}`);
  };
  const HandleInput = (evet) => {
    updateKeyword(evet.target.value);
  };

  const handleChangeRating = (evet) => {
    updateRating(evet.target.value);
  };

  const handleChangeLanguage = (evet) => {
    updateLenguage(evet.target.value);
  };

  const handleChangeReset = () => resetKeywor();

  return (
    <div className="containerFormSearch">
      <h2 className="searchGifh2">Encuentra tu GIF perfecto</h2>
      <form onSubmit={HandleSubmit}>
        <div className="containerFormSearchGif">
          <input
            onChange={HandleInput}
            type="text"
            placeholder="Search gifs"
            value={keyword}
          />
          <div className="containerSelectLanguageRating">
            <select onChange={handleChangeRating} value={rating} id="rating">
              <option disabled value={0}>
                Ratings chose
              </option>
              {Rating.map((r) => (
                <option key={r}>{r}</option>
              ))}
            </select>
            <select
              onChange={handleChangeLanguage}
              value={lenguage}
              id="lenguage"
            >
              <option>Language chose</option> hacer mas lindo este form y que
              muestre language y rating en los select como primero
              {Language.map((l) => (
                <option key={l}>{l}</option>
              ))}
            </select>
          </div>
          <div className="containerBtnsForm">
            <div className="containerBtnSendFormSearch">
              <Button className="btnHomeSend" htmlType="submit">
                Buscar{" "}
              </Button>
            </div>
            <div className="containerBtnResetFormSeacher">
              <Button
                className="btnresetForm"
                htmlType="submit"
                onClick={handleChangeReset}
              >
                Reset{" "}
              </Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default React.memo(Form);
