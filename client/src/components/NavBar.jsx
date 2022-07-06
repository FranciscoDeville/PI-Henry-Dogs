import React from "react";
import { NavLink } from "react-router-dom";
import style from "../styles/NavBar.module.css";
import SearchBar from "./SearchBar";
//import home from "../img/home.png";

export default function NavBar() {
  return (
    <header>
      <div className={style.navbar}>
        <NavLink to="/">
          {/* <img className={s.img}
            src={home}
            id="landingpage"
            width="50"
            height="50"
            alt="img not found"
          /> */}
        </NavLink>
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