import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { postDog, getTemperaments } from "../actions/index";
import { useDispatch, useSelector } from "react-redux";

import {
  Form,
  Label,
  ErrorMessage,
  CenteredButtonContainer,
  Button,
  SuccessMessage,
  ImageDog,
  Ul,
  ButtonTemperaments,
  Select,
  ButtonInicio,
  DivInicio,
  MainConteiner,
} from "../styles/FormsStyles";
import Input from "./Input";
import ImageDefault from "../styles/images/Bingo_and_Rolly_of_Puppy_Dog_Pals_1.jpg";

export default function CreateDog() {
  //------------------------------------------------------------------------------------------------------------------------
  const dispatch = useDispatch();
  const history = useHistory();
  const temperaments = useSelector((state) => state.temperaments);

  const [name, setName] = useState({ field: "", valid: null });
  const [image, setImage] = useState({ field: "", valid: null });
  const [height_min, setHeight_min] = useState({ field: "", valid: null });
  const [height_max, setHeight_max] = useState({ field: "", valid: null });
  const [weight_min, setWeight_min] = useState({ field: "", valid: null });
  const [weight_max, setWeight_max] = useState({ field: "", valid: null });
  const [life_span_min, setLife_span_min] = useState({
    field: "",
    valid: null,
  });
  const [life_span_max, setLife_span_max] = useState({
    field: "",
    valid: null,
  });
  const [temperament, setTemperament] = useState({ field: [] });

  const [formValid, setFormValid] = useState(null);

  const expressions = {
    name: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
    number: /^[1-9]$|^[1-9][0-9]$|^(100)$/, // 1 al 100 numeros.
    url: /^(ftp|http|https):\/\/[^ "]+$/, // Valida una url
  };

  useEffect(() => {
    dispatch(getTemperaments());
  }, [dispatch]);

  function handleSubmit(e) {
    e.preventDefault();
    // Valido que esten todos los campos correctos
    if (
      temperament.field.length > 0 &&
      height_max.field > height_min.field &&
      weight_max.field > weight_min.field &&
      life_span_max.field > life_span_min.field
    ) {
      if (
        name.valid === "true" &&
        height_min.valid === "true" &&
        height_max.valid === "true" &&
        weight_min.valid === "true" &&
        weight_max.valid === "true" &&
        life_span_min.valid === "true" &&
        life_span_max.valid === "true"
      ) {
        setFormValid("true");
        let newDog = {
          name: name.field,
          image: image.field,
          height_min: height_min.field,
          height_max: height_max.field,
          weight_min: weight_min.field,
          weight_max: weight_max.field,
          life_span_min: life_span_min.field,
          life_span_max: life_span_max.field,
          temperament: temperament.field,
        };
        dispatch(postDog(newDog));

        // Vacio los campos
        setName({ field: "", valid: null });
        setImage({ field: "", valid: null });
        setHeight_min({ field: "", valid: null });
        setHeight_max({ field: "", valid: null });
        setWeight_min({ field: "", valid: null });
        setWeight_max({ field: "", valid: null });
        setLife_span_min({ field: "", valid: null });
        setLife_span_max({ field: "", valid: null });
        setTemperament({ field: [] });

        alert("Dog created successfully!");
        history.push("/home");
      }
    } else {
      setFormValid("false");
      // Seteo el estado para que se remarque el input erroneo en rojo
      if(name.valid !== 'true') setName({valid: "false"})
      if(height_min.valid !== 'true') setHeight_min({valid: "false"})
      if(height_max.valid !== 'true') setHeight_max({valid: "false"})
      if(weight_min.valid !== 'true') setWeight_min({valid: "false"})
      if(weight_max.valid !== 'true') setWeight_max({valid: "false"})
      if(life_span_min.valid !== 'true') setLife_span_min({valid: "false"})
      if(life_span_max.valid !== 'true') setLife_span_max({valid: "false"})
    }
  }

  function handleSelect(e) {
    setTemperament({
      field: [...temperament.field, e.target.value],
    });
  }

  function handleDelete(el) {
    setTemperament({
      ...temperament,
      field: temperament.field.filter((e) => e !== el),
    });
  }

  return (
    <MainConteiner>
      <DivInicio>
        <Link to="/home">
          <ButtonInicio>Home</ButtonInicio>
        </Link>
      </DivInicio>
      <ImageDog
        src={image.field ? image.field : ImageDefault}
        alt="Image not found"
      />
      <Form action="" onSubmit={handleSubmit}>
        <Input
          state={name}
          setState={setName}
          type="text"
          label="Breed name"
          placeholder="Breed name..."
          name="name"
          errormessage="The breed name can only contain letters and spaces."
          regularPhrase={expressions.name}
        />
        <Input
          state={image ? image : ImageDefault}
          setState={setImage}
          type="text"
          label="Image URL"
          placeholder="Image URL..."
          name="image"
          errormessage="It has to be a valid URL."
          regularPhrase={expressions.url}
        />
        <Input
          state={height_min}
          setState={setHeight_min}
          type="number"
          min="1"
          max="100"
          label="Minimun height"
          placeholder="Minimun height(Centimeters)..."
          name="height_min"
          errormessage="The minimum height can only contain one or two digits."
          regularPhrase={expressions.number}
        />
        <Input
          state={height_max}
          setState={setHeight_max}
          type="number"
          min="1"
          max="100"
          label="Maximum height"
          placeholder="Maximum height(Centimeters)..."
          name="height_max"
          errormessage="The maximum height can only contain one or two digits and must be less than the minimum height."
          regularPhrase={expressions.number}
        />
        <Input
          state={weight_min}
          setState={setWeight_min}
          type="number"
          min="1"
          max="100"
          label="Minimun weight"
          placeholder="Minimun weight(Kilograms)..."
          name="weight_min"
          errormessage="The minimum weight can only contain one or two digits."
          regularPhrase={expressions.number}
        />
        <Input
          state={weight_max}
          setState={setWeight_max}
          type="number"
          min="1"
          max="100"
          label="Maximum weight"
          placeholder="Maximum weight(Kilograms)..."
          name="weight_max"
          errormessage="The maximum weight can only contain one or two digits and must be less than the minimum weight."
          regularPhrase={expressions.number}
        />
        <Input
          state={life_span_min}
          setState={setLife_span_min}
          type="number"
          min="1"
          max="100"
          label="Minimum life expectancy"
          placeholder="Minimum life expectancy(years)..."
          name="life_span_min"
          errormessage="The minimum life expectancy can only contain one or two digits."
          regularPhrase={expressions.number}
        />
        <Input
          state={life_span_max}
          setState={setLife_span_max}
          type="number"
          min="1"
          max="100"
          label="Maximum life expectancy"
          placeholder="Maximum life expectancy(years)..."
          name="life_span_max"
          errormessage="The maximum life expectancy can only contain one or two digits and must be less than the minimum life expectancy."
          regularPhrase={expressions.number}
        />
        <div>
          <Label>Temperaments:</Label>
          <Ul>
            <li>
              {temperament.field.map((el) => (
                <ButtonTemperaments
                  type="button"
                  key={el.id}
                  onClick={() => handleDelete(el)}
                >
                  {el}
                </ButtonTemperaments>
              ))}
            </li>
          </Ul>
        </div>
        <div>
          <Select onChange={(e) => handleSelect(e)}>
            {temperaments.map((temperament) => (
              <option value={temperament.name} key={temperament.id}>
                {temperament.name}
              </option>
            ))}
          </Select>
        </div>

        {formValid === "false" && (
          <ErrorMessage>
            <p>
              <b>Error:</b> Please fill in the form correctly.
            </p>
          </ErrorMessage>
        )}

        <CenteredButtonContainer>
          <Button type="submit">Send</Button>
          {formValid === "true" && (
            <SuccessMessage>Formulario enviado exitosamente!</SuccessMessage>
          )}
        </CenteredButtonContainer>
      </Form>
    </MainConteiner>
  );
}
