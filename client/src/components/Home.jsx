import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDogs } from "../actions";
import Card from "./Card";
import { Link } from "react-router-dom";

export default function Home() {
  const dispatch = useDispatch();
  const allDogs = useSelector((state) => state.dogs);

  useEffect(() => {
    dispatch(getDogs());
  }, [dispatch]);

  function handleClick(e) {
    e.preventDefault();
    dispatch(getDogs());
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
        <select>
          <option value="name_asc">Nombre Ascendente</option>
          <option value="name_desc">Nombre Descendente</option>
        </select>
        <select>
          <option value="peso_asc">Peso Ascendente</option>
          <option value="peso_desc">Peso Descendente</option>
        </select>
        <select>
          <option value="All">Todos los perros</option>
          <option value="created">Creados</option>
          <option value="api">Existente</option>
        </select>

        {allDogs?.map((el) => {
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
