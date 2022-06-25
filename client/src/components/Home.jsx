import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDogs, filter_Created, orderByName, orderByWeight } from "../actions";
import Card from "./Card";
import { Link } from "react-router-dom";
import Paginado from "./Paginado";

export default function Home() {
  const dispatch = useDispatch();
  const allDogs = useSelector((state) => state.dogs);
  const [currentPage, setCurrentPage] = useState(1); // Numero de pagina actual
  const [dogsPerPage, setDogsPerPage] = useState(8); // Numero de perros por pagina
  const indexOfLastDog = currentPage * dogsPerPage; // Index del ultimo dog (Inicia en 8)
  const indexOfFirstDog = indexOfLastDog - dogsPerPage; // 0
  const currentDogs = allDogs.slice(indexOfFirstDog, indexOfLastDog); // Divido el array en 8 perros

  const [orden, setOrden] = useState("");

  const paginado = (pageNumber) => {
    //Seteo la pagina en el numero que quiero ir
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    dispatch(getDogs());
  }, [dispatch]);

  function handleClick(e) {
    e.preventDefault();
    dispatch(getDogs());
  }

  function handleFilterCreated(e) {
    dispatch(filter_Created(e.target.value));
  }

  function handleOrderByName(e) {
    e.preventDefault();
    dispatch(orderByName(e.target.value));
    setCurrentPage(1);
    setOrden(`Ordenado ${e.target.value}`)
  }

  return (
    <div>
      <Link to="/dogs">Create dog</Link>
      <h1>Aguante los perritos</h1>
      <button
        onClick={(e) => {
          handleClick(e);
        }}
      >
        Volver a cargar todos los personajes
      </button>
      <div>
        <select onChange={(e) => handleOrderByName(e)}>
          <option value="name_asc">Nombre Ascendente</option>
          <option value="name_desc">Nombre Descendente</option>
        </select>
        <select>
          <option value="peso_asc">Peso Ascendente</option>
          <option value="peso_desc">Peso Descendente</option>
        </select>
        <select onChange={(e) => handleFilterCreated(e)}>
          <option value="all">Todos los perros</option>
          <option value="created">Creados</option>
          <option value="api">Existente</option>
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
                  weight={el.height_metric}
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
