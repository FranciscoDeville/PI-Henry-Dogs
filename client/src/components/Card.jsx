import React from "react";

export default function Card ({name, temperament, weight_min, weight_max, image}){
    return (
        <div>
            <h3>Name: {name}</h3>
            <h5>Temperaments: {temperament}</h5>
            <h5>Weight: {weight_min + ' - ' + weight_max + ' Kilogramos'}</h5>
            <img src={image} alt="Image not found" width='350px' height='300px' />
        </div>
    )
}