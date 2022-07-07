import styled from "styled-components";

export const CardConteiner = styled.div`
  background-color: #efc074;
  overflow: hidden;
  padding: 0 0 32px;
  margin: 48px auto 0;
  width: 300px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.05), 0 0px 40px rgba(0, 0, 0, 0.08);
  border-radius: 5px;
`;

export const CardHeader = styled.header`
  padding-top: 32px;
  padding-bottom: 32px;
`;

export const CardHeading = styled.h1`
  color: #4f772d;
  font-size: 22px;
  font-weight: bold;
  text-align: center;
`;

export const CardBody = styled.div`
  display: flex
  justify-content: center
`;

export const CardFieldset = styled.fieldset`
  position: relative;
  padding: 0;
  margin: 0;
  border: 0;
`;

export const CardNote = styled.small`
  color: #4f772d;
  padding-top: 8px;
  display: block;
  width: 100%;
  font-size: 12px;
  text-align: center;
  text-transform: uppercase;
`;

export const CardImage = styled.img`
  heigth: 250px;
  width: 250px;
`;
