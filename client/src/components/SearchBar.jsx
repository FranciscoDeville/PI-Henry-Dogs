import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getNameDogs } from "../actions";
import style from "../styles/SearchBar.css";

export default function SearchBar() {
  const dispatch = useDispatch();
  const [name, setName] = useState("");

  function handleInputChange(e) {
    e.preventDefault();
    setName(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(getNameDogs(name));
    setName("");
  }

  return (
    <div className={style.nav}>
      <form className={style.form} onSubmit={handleSubmit}>
        <input
          className={style.input}
          type="text"
          placeholder="Search dog..."
          value={name}
          onChange={handleInputChange}
        ></input>
        <input className={style.btn} type="submit" value="Search"></input>
      </form>
    </div>
  );
}
