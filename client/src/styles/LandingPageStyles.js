import styled from "styled-components";
import Fondo from "./images/LandingPage.jpg";

const Body = styled.body`
  background-image: url(${Fondo});
  background-position: center center;
  background-attachment: fixed;
  height: 100vh;
  width: 100%;
  overflow: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const H1 = styled.h1`
  font-size: 55px;
  background-color: #b1a7a6;
  border-radius: 5px;
  color: black;
  padding: 0px 15px;
  `

export { Body, H1 };
