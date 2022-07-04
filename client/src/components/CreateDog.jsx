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
  ReadingError,
  Ul,
  ButtonTemperaments,
  Select,
  ButtonInicio,
  DivInicio,
} from "../styles/FormsStyles";
import Input from "./Input";
import NavBar from "./NavBar";
import ImageDefault from '../styles/images/Bingo_and_Rolly_of_Puppy_Dog_Pals_1.jpg'


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
      height_max.field > height_min.field &&
      weight_max.field > weight_min.field &&
      life_span_max.field > life_span_min.field &&
      temperament.field.length > 0
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
      // ...
    } else {
      setFormValid("false");
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
    <main>
    <DivInicio>
      <Link to='/home'>
        <ButtonInicio >Inicio</ButtonInicio>
      </Link>
    </DivInicio>
      <ImageDog src={image.field ? image.field : ImageDefault} alt=""/>
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
          state={image}
          setState={setImage}
          type="url"
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
          label="Maximum life expectancy"
          placeholder="Maximum life expectancy(years)..."
          name="life_span_max"
          errormessage="The maximum life expectancy can only contain one or two digits and must be less than the minimum life expectancy."
          regularPhrase={expressions.number}
        />
        <div>
          <Label>Temperaments:</Label>
          <Ul>
            <li key={"key"}>
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

        {/* <div>
          <p>Temperaments:</p>
            <ol>
              {temperament.field.map((el) => (
                <button
                  type="button"
                  key={el.id}
                  onClick={() => handleDelete(el)}
                >
                  {el}
                </button>
              ))}
            </ol>
          <select onChange={(e) => handleSelect(e)}>
            {temperaments.map((temp) => (
              <option key={temp.id} value={temp.name}>
                {temp.name}
              </option>
            ))}
          </select>
        </div> */}

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
    </main>
  );
}

{
  /* const [usuario, cambiarUsuario] = useState({campo: '', valido: null});
	const [nombre, cambiarNombre] = useState({campo: '', valido: null});
	const [password, cambiarPassword] = useState({campo: '', valido: null});
	const [password2, cambiarPassword2] = useState({campo: '', valido: null});
	const [correo, cambiarCorreo] = useState({campo: '', valido: null});
	const [telefono, cambiarTelefono] = useState({campo: '', valido: null});
	const [terminos, cambiarTerminos] = useState(false);
	const [formularioValido, cambiarFormularioValido] = useState(null);

	const expresiones = {
		usuario: /^[a-zA-Z0-9_-]{4,16}$/, // Letras, numeros, guion y guion_bajo
		nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
		password: /^.{4,12}$/, // 4 a 12 digitos.
		correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
		telefono: /^\d{7,14}$/ // 7 a 14 numeros.
	}

	const validarPassword2 = () => {
		if(password.campo.length > 0){
			if(password.campo !== password2.campo){
				cambiarPassword2((prevState) => {
					return {...prevState, valido: 'false'}
				});
			} else {
				cambiarPassword2((prevState) => {
					return {...prevState, valido: 'true'}
				});
			}
		}
	}

	const onChangeTerminos = (e) => {
		cambiarTerminos(e.target.checked);
	}

	const onSubmit = (e) => {
		e.preventDefault();

		if(
			usuario.valido === 'true' &&
			nombre.valido === 'true' &&
			password.valido === 'true' &&
			password2.valido === 'true' &&
			correo.valido === 'true' &&
			telefono.valido === 'true' &&
			terminos
		){
			cambiarFormularioValido(true);
			cambiarUsuario({campo: '', valido: ''});
			cambiarNombre({campo: '', valido: null});
			cambiarPassword({campo: '', valido: null});
			cambiarPassword2({campo: '', valido: 'null'});
			cambiarCorreo({campo: '', valido: null});
			cambiarTelefono({campo: '', valido: null});

			// ... 
		} else {
			cambiarFormularioValido(false);
		}
	}

	return (
		<main>
			<Formulario action="" onSubmit={onSubmit}>
				<Input
					estado={usuario}
					cambiarEstado={cambiarUsuario}
					tipo="text"
					label="Usuario"
					placeholder="john123"
					name="usuario"
					leyendaError="El usuario tiene que ser de 4 a 16 dígitos y solo puede contener numeros, letras y guion bajo."
					expresionRegular={expresiones.usuario}
				/>
				<Input
					estado={nombre}
					cambiarEstado={cambiarNombre}
					tipo="text"
					label="Nombre"
					placeholder="John Doe"
					name="usuario"
					leyendaError="El nombre solo puede contener letras y espacios."
					expresionRegular={expresiones.nombre}
				/>
				<Input
					estado={password}
					cambiarEstado={cambiarPassword}
					tipo="password"
					label="Contraseña"
					name="password1"
					leyendaError="La contraseña tiene que ser de 4 a 12 dígitos."
					expresionRegular={expresiones.password}
				/>
				<Input
					estado={password2}
					cambiarEstado={cambiarPassword2}
					tipo="password"
					label="Repetir Contraseña"
					name="password2"
					leyendaError="Ambas contraseñas deben ser iguales."
					funcion={validarPassword2}
				/>
				<Input
					estado={correo}
					cambiarEstado={cambiarCorreo}
					tipo="email"
					label="Correo Electrónico"
					placeholder="john@correo.com"
					name="correo"
					leyendaError="El correo solo puede contener letras, numeros, puntos, guiones y guion bajo."
					expresionRegular={expresiones.correo}
				/>
				<Input
					estado={telefono}
					cambiarEstado={cambiarTelefono}
					tipo="text"
					label="Teléfono"
					placeholder="4491234567"
					name="telefono"
					leyendaError="El telefono solo puede contener numeros y el maximo son 14 dígitos."
					expresionRegular={expresiones.telefono}
				/>



				<ContenedorTerminos>
					<Label>
						<input 
							type="checkbox"
							name="terminos"
							id="terminos"
							checked={terminos} 
							onChange={onChangeTerminos}
						/>
						Acepto los Terminos y Condiciones
					</Label>
				</ContenedorTerminos>
				{formularioValido === false && <MensajeError>
					<p>
						<FontAwesomeIcon icon={faExclamationTriangle}/>
						<b>Error:</b> Por favor rellena el formulario correctamente.
					</p>
				</MensajeError>}
				<ContenedorBotonCentrado>
					<Boton type="submit">Enviar</Boton>
					{formularioValido === true && <MensajeExito>Formulario enviado exitosamente!</MensajeExito>}
				</ContenedorBotonCentrado>
			</Formulario>
		</main>
	); */
}
