import React from "react";
import {
  CardConteiner,
  CardHeader,
  CardHeading,
  CardBody,
  CardFieldset,
  CardNote,
  CardImage,
} from "../styles/CardStyles";
export default function Card({
  name,
  temperament,
  weight_min,
  weight_max,
  image,
}) {
  return (
    <CardConteiner>
      <CardHeader>
        <CardHeading>{name}</CardHeading>
      </CardHeader>
      <CardBody>
        <CardImage src={image} alt="Image not found" />
        <CardFieldset>
          <CardNote>
            Weight: {weight_min} - {weight_max} kilograms
          </CardNote>
          <CardNote>Temperaments: {temperament}</CardNote>
        </CardFieldset>
      </CardBody>
    </CardConteiner>
  );
}
