import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getNameDogs } from "../actions";
import { ButtonNavBar } from "../styles/FormsStyles";

export default function SearchBar() {
  const dispatch = useDispatch();
  const [name, setName] = useState("");

  function handleInputChange(e) {
    e.preventDefault();
    setName(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(getNameDogs(name));
    setName("");
  }

  return (
    <div>
      <input type="text" placeholder="Search..." onChange={handleInputChange} />
      <button type="submit" onClick={handleSubmit}>
        Search
      </button>
    </div>
  );
}
