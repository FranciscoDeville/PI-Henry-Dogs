import React from "react";
import { NavLink } from "react-router-dom";
import github from "../styles/images/github.png";
import linkedin from "../styles/images/linkedin.png";
import style from "../styles/About.module.css";
import { ButtonInicio } from '../styles/FormsStyles'

export default function About() {
  return (
    <div className={style.container}>
       <div className={style.btnDiv}>
        <NavLink to="/home">
          <ButtonInicio>Home</ButtonInicio>
        </NavLink>
      </div>
      <div className={style.about}>
        <h1 className={style.text}>Hello!</h1>
        <h3 className={style.text}>
        My name is Francisco and I'm studying Full Stack developer!
        I made my website as an individual project for the Soy Henry bootcamp!{" "}
          <br />
        </h3>
        <h3 className={style.text}>Let's connect!</h3>

        <a href="https://www.linkedin.com/in/francisco-deville/">
          <img
            className={style.img}
            id="linkedin"
            src={linkedin}
            width="50"
            height="50"
            alt="img not found"
          />
        </a>

        <a href="https://github.com/FranciscoDeville">
          {" "}
          <img
            className={style.img}
            id="about"
            src={github}
            width="50"
            height="50"
            alt="img not found"
          />
        </a>
      </div>
     
    </div>
  );
}