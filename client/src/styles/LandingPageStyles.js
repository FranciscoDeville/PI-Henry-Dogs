import styled, { css } from "styled-components";
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

export { Body };
