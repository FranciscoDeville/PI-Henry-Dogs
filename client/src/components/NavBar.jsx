import React from "react";
import { NavLink } from "react-router-dom";
import style from "../styles/NavBar.module.css";
import SearchBar from "./SearchBar";

export default function NavBar() {
  return (
    <header>
      <div className={style.navbar}>
        <NavLink to="/"></NavLink>
        <NavLink to="/">
          <p className={style.text}>Home</p>
        </NavLink>
        <NavLink to="/create_dog">
          <p className={style.text}>Create your dog</p>
        </NavLink>
        <NavLink to="/about">
          <p className={style.text}>About</p>
        </NavLink>
        <SearchBar></SearchBar>
      </div>
    </header>
  );
}
