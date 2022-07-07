import React from "react";
import { Link } from "react-router-dom";
import image from "../styles/images/ImageError.jpg"
//import s from '../styles/errorNotFound.module.css'
import { ButtonInicio } from "../styles/FormsStyles";
import { Img } from "../styles/ErrorStyles";


export default function Error(){
 return (

     <div>
         <div>
         <h1>Error 404 Not found!</h1>
         </div>
        <div >
        <Link to="/home">
        <ButtonInicio>Home</ButtonInicio>
        </Link>
        </div>
         <Img src={image} alt="img not found!" />
     </div>
 )
}