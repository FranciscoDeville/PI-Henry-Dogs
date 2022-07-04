import React from "react";
import {
  CardWrapper,
  CardHeader,
  CardHeading,
  CardBody,
  CardFieldset,
  CardOptionsNote,
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
    <CardWrapper>
      <CardHeader>
        <CardHeading>{name}</CardHeading>
      </CardHeader>

      <CardBody>
        <CardImage src={image} alt="Image not found" />
        <CardFieldset>
          <CardOptionsNote>
            Weight: {weight_min} - {weight_max} kilograms
          </CardOptionsNote>
          <CardOptionsNote>Temperaments: {temperament}</CardOptionsNote>
        </CardFieldset>
      </CardBody>
    </CardWrapper>
  );
}
