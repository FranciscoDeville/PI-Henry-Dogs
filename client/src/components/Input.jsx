import React from "react";
import {
  Input,
  Label,
  GroupInput,
  ReadingError,
} from "./../elements/Forms";



export default function ComponentInput({
  state,
  setState,
  type,
  label,
  placeholder,
  name,
  errormessage,
  regularPhrase,
  //func,
}) {
  const onChange = (e) => {
    setState({ ...state, field: e.target.value });
  };

  const validation = () => {
    if (regularPhrase) {
      if (regularPhrase.test(state.field)) {
        setState({ ...state, valid: "true" });
      } else {
        setState({ ...state, valid: "false" });
      }
    }

    /* if (func) {
      func();
    } */
  };

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
          onChange={onChange}
          onKeyUp={validation} //Ejecuta la funcion al soltar la tecla
          onBlur={validation} //Ejecuta la funcion al hacer clic por fuera del input
          valid={state.valid} //Accedo al estado para saber si es true o false (estilos)
        />
      </GroupInput>
      <ReadingError valid={state.valid}>{errormessage}</ReadingError>
    </div>
  );
}

/* export default ComponentInput; */
