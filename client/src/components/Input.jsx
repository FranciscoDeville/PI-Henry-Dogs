import React from "react";
import { Input, Label, GroupInput, ReadingError } from "../styles/FormsStyles";

export default function ComponentInput({
  state,
  setState,
  type,
  label,
  placeholder,
  name,
  errormessage,
  regularPhrase,
}) {
  
  function handleOnChange(e) {
    setState({ ...state, field: e.target.value });
  }

  function handleValidation() {
    if (regularPhrase) {
      if (regularPhrase.test(state.field)) {
        setState({ ...state, valid: "true" });
      } else {
        setState({ ...state, valid: "false" });
      }
    }
  }

  return (
    <div>
      <Label htmlFor={name} valid={state.valid}>
        {label}
      </Label>
      <GroupInput>
        <Input
          type={type}
          placeholder={placeholder}
          id={name}
          value={state.field}
          onChange={handleOnChange}
          onKeyUp={handleValidation} //Ejecuta la funcion al soltar la tecla
          onBlur={handleValidation} //Ejecuta la funcion al hacer clic por fuera del input
          valid={state.valid} //Accedo al estado para saber si es true o false (estilos)
        />
      </GroupInput>
      <ReadingError valid={state.valid}>{errormessage}</ReadingError>
    </div>
  );
}

