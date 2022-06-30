import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getDogs,
  getTemperaments,
  filter_Created,
  orderByName,
  orderByWeight,
  filterByTemperaments,
} from "../actions";
import Card from "./Card";
import { Link } from "react-router-dom";
import Paginado from "./Paginado";
import SearchBar from "./SearchBar";

export default function Home() {
  const dispatch = useDispatch();
  const allDogs = useSelector((state) => state.dogs);
  const allTemperaments = useSelector((state) => state.temperaments);

  const [currentPage, setCurrentPage] = useState(1); // Numero de pagina actual
  const [dogsPerPage, setDogsPerPage] = useState(8); // Numero de perros por pagina
  const indexOfLastDog = currentPage * dogsPerPage; // Index del ultimo dog (Inicia en 8)
  const indexOfFirstDog = indexOfLastDog - dogsPerPage; // 0
  const currentDogs = allDogs.slice(indexOfFirstDog, indexOfLastDog); // Divido el array en 8 perros

  const [order, setOrder] = useState("");

  const paginado = (pageNumber) => {
    //Seteo la pagina en el numero que quiero ir
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    dispatch(getDogs());
    dispatch(getTemperaments());
  }, [dispatch]);

  function handleClick(e) {
    e.preventDefault();
    dispatch(getDogs());
  }

  function handleFilterCreated(e) {
    e.preventDefault(e);
    dispatch(filter_Created(e.target.value));
    setCurrentPage(1);
    setOrder(e.target.value);
  }

  function handleOrderByName(e) {
    e.preventDefault();
    dispatch(orderByName(e.target.value));
    setCurrentPage(1);
    setOrder(e.target.value);
  }

  function handleOrderByWeight(e) {
    e.preventDefault();
    dispatch(orderByWeight(e.target.value));
    setCurrentPage(1);
    setOrder(e.target.value);
  }

  function handleFilterByTemperament(e) {
    e.preventDefault(e);
    dispatch(filterByTemperaments(e.target.value));
    setCurrentPage(1);
    setOrder(e.target.value);
  }

  return (
    <div>
      <Link to="/create_dog">Create dog</Link>
      <h1>Aguante los perritos</h1>
      <SearchBar />
      <button
        onClick={(e) => {
          handleClick(e);
        }}
      >
        Volver a cargar todos los personajes
      </button>
      <div>
        <select onChange={(e) => handleOrderByName(e)}>
          <option selected disabled hidden>
            Alphabetical order
          </option>
          <option value="name_asc">A - Z</option>
          <option value="name_desc">Z - A</option>
        </select>
        <select onChange={(e) => handleOrderByWeight(e)}>
          <option selected disabled hidden>
            Order by weight
          </option>
          <option value="weight_asc">Heavier</option>
          <option value="weight_desc">Lighter</option>
        </select>
        <select onChange={(e) => handleFilterCreated(e)}>
          <option selected disabled hidden>
            Filter by create
          </option>
          <option value="all">All</option>
          <option value="created">Created</option>
          <option value="api">Api</option>
        </select>
        <select onChange={(e) => handleFilterByTemperament(e)}>
          <option selected disabled hidden>
              Filter by temperament
            </option>
            <option value="all">All</option>
            {allTemperaments.map((temp) => (
              <option key={temp.id} value={temp.name}>
                {temp.name}
              </option>
            ))}
          </select>

        <Paginado //Paso las props al paginado
          dogsPerPage={dogsPerPage}
          allDogs={allDogs.length}
          paginado={paginado}
        />

        {currentDogs?.map((el) => {
          return (
            <div>
              <Link to={"/home/" + el.id}>
                <Card
                  name={el.name}
                  temperament={el.temperament}
                  weight_min={el.weight_min}
                  weight_max={el.weight_max}
                  image={el.image}
                  key={el.id}
                />
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}
