import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getClean, getDetail } from "../actions";

export default function Detail() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const dogDetail = useSelector((state) => state.detail);

  useEffect(() => {
    dispatch(getDetail(id));
    dispatch(getClean());
  }, [dispatch, id]);

  console.log(dogDetail);

  return (
    <div>
      <Link to="/home">
        <button>Back to Home</button>
      </Link>

      {dogDetail ? (
        <div>
          <h1>Nombre: {dogDetail.name}</h1>
          <img
            src={dogDetail.img ? dogDetail.img : dogDetail.image}
            alt="Image not found"
            width="400px"
            height="400px"
          />
          <p>
            {!dogDetail.life_time_max
              ? `Their life span is approximately ${dogDetail.life_time_min}.`
              : `Their life span is between ${dogDetail.life_time_min} and ${dogDetail.life_time_max} years.`}{" "}
            <br />
            Their temperaments are {" " + dogDetail.temperament}
            . <br />
            {!dogDetail.height_max
              ? `These dogs can measure up to ${dogDetail.height_min} cm approximately`
              : `These dogs can measure between ${dogDetail.height_min} and ${dogDetail.height_max} cm.`}{" "}
            <br />
            and weight between {dogDetail.weight_min} and {dogDetail.weight_max}{" "}
            kg.
          </p>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}
