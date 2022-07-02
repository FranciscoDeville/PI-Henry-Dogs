import styled, { css } from "styled-components";

const colors = {
  border: "#0075FF",
  error: "#bb2929",
  success: "#1ed12d",
};

const Form = styled.form`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  @media (max-width: 800px) {
    grid-template-columns: 1fr;
  }
`;

const Label = styled.label`
  display: block;
  font-weight: 700;
  padding: 10px;
  min-height: 40px;
  cursor: pointer;
  ${(props) =>
    props.valid === "false" &&
    css`
      color: ${colors.error};
    `}
`;

const GroupInput = styled.div`
  position: relative;
  z-index: 90;
`;

const Input = styled.input`
  width: 100%;
  background: #fff;
  border-radius: 3px;
  height: 45px;
  line-height: 45px;
  padding: 0 10px;
  transition: 0.3s ease all;
  border: 3px solid transparent;
  &:focus {
    border: 3px solid ${colors.border};
    outline: none;
    box-shadow: 3px 0px 30px rgba(163, 163, 163, 0.4);
  }
  ${(props) =>
    props.valid === "true" &&
    css`
      border: 3px solid transparent;
    `}
  ${(props) =>
    props.valid === "false" &&
    css`
      border: 3px solid ${colors.error} !important;
    `}
`;

const ReadingError = styled.p`
  font-size: 12px;
  margin-bottom: 0;
  color: ${colors.error};
  display: none;
  ${(props) =>
    props.valid === "true" &&
    css`
      display: none;
    `}
  ${(props) =>
    props.valid === "false" &&
    css`
      display: block;
    `}
`;

const CenteredButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  grid-column: span 2;
  @media (max-width: 800px) {
    grid-column: span 1;
  }
`;

const Button = styled.button`
  height: 45px;
  line-height: 45px;
  width: 40%;
  background: #000;
  color: #fff;
  font-weight: bold;
  border: none;
  border-radius: 3px;
  cursor: pointer;
  transition: 0.1s ease all;
  &:hover {
    box-shadow: 3px 0px 30px rgba(40, 140, 140, 1);
  }
`;

const SuccessMessage = styled.p`
  font-size: 14px;
  color: ${colors.success};
`;

const ErrorMessage = styled.div`
  height: 45px;
  line-height: 45px;
  background: #f66060;
  padding: 0px 15px;
  border-radius: 3px;
  
  p {
    margin: 0;
  }
  b {
    margin-left: 10px;
  }

  @media (min-width: 800px) {
    grid-column: span 2;
  }
`;

export {
  Form,
  Label,
  GroupInput,
  Input,
  ReadingError,
  CenteredButtonContainer,
  Button,
  SuccessMessage,
  ErrorMessage,
};
