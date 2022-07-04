import React from "react";
import { NavLink } from "react-router-dom";
import { ButtonInicio, ButtonNavBar } from "../styles/FormsStyles";
import styles from "../styles/NavBar.module.css";
import SearchBar from "./SearchBar";

export default function NavBar() {
  return (
    <header>
      <div className={styles.navbar}>
        <NavLink to="/">
          <ButtonNavBar>Inicio</ButtonNavBar>
        </NavLink>
        <NavLink to="/home">
          <ButtonNavBar>Home</ButtonNavBar>
        </NavLink>
        <NavLink to="/create_dog">
          <ButtonNavBar>Create your dog</ButtonNavBar>
        </NavLink>

        <NavLink to="/about">
          <ButtonNavBar>About</ButtonNavBar>
        </NavLink>

        <SearchBar></SearchBar>
      </div>
    </header>
  );
}
