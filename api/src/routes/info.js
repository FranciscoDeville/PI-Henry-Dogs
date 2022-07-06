const axios = require("axios");
const { api_key } = process.env;
const { Dog, Temperament } = require("../db");


const getApiInfo = async () => {
  const apiUrl = await axios.get(
    `https://api.thedogapi.com/v1/breeds?api_key=${api_key}`
  );
  const apiInfo = await apiUrl.data.map((e) => {
    return {
      name: e.name,
      id: e.id,
      height_min:
        e.height.metric.split(" - ")[0] && e.height.metric.split(" - ")[0],
      height_max:
        e.height.metric.split(" - ")[1] && e.height.metric.split(" - ")[1],
      weight_min:
        e.weight.metric.split(" - ")[0] !== "NaN"
          ? e.weight.metric.split(" - ")[0]
          : 6,
      weight_max:
        e.weight.metric.split(" - ")[1] && e.weight.metric.split(" - ")[1],
      life_span_min: e.life_span.split(" - ")[0] && e.life_span.split(" - ")[0],
      life_span_max:
        e.life_span.split(" - ")[1] &&
        e.life_span.split(" - ")[1].split(" ")[0],
      temperament: e.temperament ? e.temperament : "Unknown",
      image: e.image.url,
    };
  });
  return apiInfo;
};

const getDbInfo = async () => {
  try {
    const dogs = await Dog.findAll({
      include: Temperament,
    });

    const info = dogs.map((e) => {
      let temp = e.temperaments.map((e) => e.name);
      let temp2 = temp.join(", ");

      return {
        name: e.name,
        id: e.id,
        height_max: e.height_max,
        height_min: e.height_min,

        weight_max: e.weight_max,
        weight_min: e.weight_min,

        life_span_max: e.life_span_max,
        life_span_min: e.life_span_min,

        temperament: temp2,
        image: e.image
          ? e.image
          : "https://i0.wp.com/imagenesparapeques.com/wp-content/uploads/2017/08/Personajes-Puppy-Dogs-Palls.png?w=300&ssl=1",
        createdInDb: e.createdInDb,
      };
    });
    return info;
  } catch (error) {
    console.log(error);
  }
};

const getAllInfo = async () => {
  const apiInfo2 = await getApiInfo();
  const dbInfo2 = await getDbInfo();
  const allInfo = [...apiInfo2, ...dbInfo2];
  return allInfo;
};

const createTemperament = async () => {
  const apiUrl = await axios.get(
    `https://api.thedogapi.com/v1/breeds?api_key=${api_key}`
  );
  var temperaments = await apiUrl.data.map((e) => e.temperament); //mapeo los temperamentos

  temperaments = temperaments.join(", ").split(", "); //Junto el array en string y los separo
  temperaments = [...new Set(temperaments)].sort(); //Quitamos duplicados
  temperaments = temperaments.filter((el) => el); //Quitamos los vacios

  temperaments.forEach((e) => {
    Temperament.findOrCreate({
      where: { name: e },
    });
  });
  const allTemperaments = await Temperament.findAll();
  return allTemperaments;
};
/* let temperaments = temp6.map((e) => {
    return { name: e };
  });
  await Temperament.bulkCreate(temperaments); */

module.exports = { getApiInfo, getDbInfo, getAllInfo, createTemperament };
