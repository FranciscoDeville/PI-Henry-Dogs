import React from "react";
import { Link } from "react-router-dom";
import '../styles/LandingPageStyles'
import { Body } from "../styles/LandingPageStyles";

export default function LandingPage() {
  return (
    <Body>
      <h1>Bienvenidos a mi pagina</h1>
      <Link to="/home">
        <button>Ingresar</button>
      </Link>
    </Body>
  );
}
