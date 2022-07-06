import React from "react";
import { Link } from "react-router-dom";
import { ButtonInicio } from "../styles/FormsStyles";
import '../styles/LandingPageStyles'
import { Body, H1, Hr } from "../styles/LandingPageStyles";

export default function LandingPage() {
  return (
    <Body>
      <H1><b>Welcome to the encyclopedia of dog breeds.</b></H1>
      <Link to="/home">
        
        <ButtonInicio>Ingresar</ButtonInicio>
      </Link>
    </Body>
  );
}
