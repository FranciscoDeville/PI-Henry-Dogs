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
import style from "../styles/Home.module.css";
import NavBar from "./NavBar";
import { ButtonInicio } from "../styles/FormsStyles";

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

  // FILTRADO CREADOS-API
  function handleFilterCreated(e) {
    e.preventDefault(e);
    dispatch(filter_Created(e.target.value));
    setCurrentPage(1);
    setOrder(e.target.value);
  }

  // ORDENAMIENTO POR NOMBRE
  function handleOrderByName(e) {
    e.preventDefault();
    dispatch(orderByName(e.target.value));
    setCurrentPage(1);
    setOrder(e.target.value);
  }

  // ORDENAMIENTO POR PESO
  function handleOrderByWeight(e) {
    e.preventDefault();
    dispatch(orderByWeight(e.target.value));
    setCurrentPage(1);
    setOrder(e.target.value);
  }

  // ORDENAMIENTO POR TEMPERAMENTO
  function handleFilterByTemperament(e) {
    e.preventDefault(e);
    dispatch(filterByTemperaments(e.target.value));
    setCurrentPage(1);
    setOrder(e.target.value);
  }

  return (
    <div className={style.conteiner}>
      {/*---------- RENDERIZADO DE NAVBAR ----------*/}
      <NavBar />

      <div className={style.title}>
        {<h1>Dogs Breeds</h1>}
        <ButtonInicio
          onClick={(e) => {
            handleClick(e);
          }}
        >
          Volver a cargar todos los personajes
        </ButtonInicio>

        {/*---------- RENDERIZADO DE FILTROS ----------*/}
      </div>
      <div className={style.order}>
        <select className={style.select} onChange={(e) => handleOrderByName(e)}>
          <option disabled selected>
            Alphabetical order
          </option>
          <option value="name_asc">A - Z</option>
          <option value="name_desc">Z - A</option>
        </select>
        <select
          className={style.select}
          onChange={(e) => handleOrderByWeight(e)}
        >
          <option disabled selected>
            Order by weight
          </option>
          <option value="weight_asc">Heavier</option>
          <option value="weight_desc">Lighter</option>
        </select>
      </div>
      <div className={style.filter}>
        <select
          className={style.select}
          onChange={(e) => handleFilterCreated(e)}
        >
          <option disabled selected>
            Filter by create
          </option>
          <option value="all">All</option>
          <option value="created">Created</option>
          <option value="api">Api</option>
        </select>
        <select
          className={style.select}
          onChange={(e) => handleFilterByTemperament(e)}
        >
          <option disabled selected>
            Filter by temperament
          </option>
          <option value="all">All</option>
          {allTemperaments.map((temp) => (
            <option key={temp.id} value={temp.name}>
              {temp.name}
            </option>
          ))}
        </select>
      </div>

      {/*---------- RENDERIZADO DE PAGINADO ----------*/}
      <div className={style.paginated}>
        <Paginado
          dogsPerPage={dogsPerPage}
          allDogs={allDogs.length}
          paginado={paginado}
        />
      </div>

      {/*---------- RENDERIZADO DE CARDS ----------*/}
      <div className={style.grid}>
        {currentDogs?.map((el) => {
          return (
            <div key={el.id} className={style.card}>
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
