import React from "react";

export default function Card ({name, temperament, weight, image}){
    return (
        <div>
            <h3>Name: {name}</h3>
            <h5>Temperaments: {temperament}</h5>
            <h5>Weight: {weight}</h5>
            <img src={image} alt="img not found" width='200px' height='200px' />
        </div>
    )
}