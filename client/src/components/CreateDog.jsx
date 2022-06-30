import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { postDog, getTemperaments } from "../actions/index";
import { useDispatch, useSelector } from "react-redux";

export default function CreateDog() {
  const dispatch = useDispatch();
  const history = useHistory();
  const temperaments = useSelector((state) => state.temperaments);

  const [input, setInput] = useState({
    name: "",
    height_min: "",
    height_max: "",
    weight_min: "",
    weight_max: "",
    life_span_min: "",
    life_span_max: "",
    image: "",
    temperament: [],
  });

  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  }

  function handleSelect(e) {
    setInput({
      ...input,
      temperament: [...input.temperament, e.target.value],
    });
  }

  function handleDelete(el) {
    setInput({
      ...input,
      temperament: input.temperament.filter((e) => e !== el),
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(postDog(input));
    alert("Dog successfully created");
    history.push("/home"); //Redirecciono a /home
  }

  useEffect(() => {
    dispatch(getTemperaments());
  }, [dispatch]);

  return (
    <div>
      <Link to="/home">
        <button>Volver</button>
      </Link>
      <h1>Crear Perri</h1>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div>
          <label>Nombre: </label>
          <input
            type="text"
            value={input.name}
            name="name"
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div>
          <label>height_min: </label>
          <input
            type="number"
            value={input.height_min}
            name="height_min"
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div>
          <label>height_max: </label>
          <input
            type="number"
            value={input.height_max}
            name="height_max"
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div>
          <label>weight_min: </label>
          <input
            type="number"
            value={input.weight_min}
            name="weight_min"
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div>
          <label>weight_max: </label>
          <input
            type="number"
            value={input.weight_max}
            name="weight_max"
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div>
          <label>life_span_min: </label>
          <input
            type="number"
            value={input.life_span_min}
            name="life_span_min"
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div>
          <label>life_span_max: </label>
          <input
            type="number"
            value={input.life_span_max}
            name="life_span_max"
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div>
          <label>image: </label>
          <input
            type="text"
            value={input.image}
            name="image"
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div>
          <label>Temperaments:</label>
          <ul>
            <li key={"key"}>
              {input.temperament.map((el) => (
                <button
                  type="button"
                  key={el.id}
                  onClick={() => handleDelete(el)}
                >
                  {el}
                </button>
              ))}
            </li>
          </ul>
          <select onChange={(e) => handleSelect(e)}>
            {temperaments.map((temp) => (
              <option key={temp.id} value={temp.name}>
                {temp.name}
              </option>
            ))}
          </select>
        </div>
        <button type="submit">Create Dog</button>
      </form>
    </div>
  );
}
