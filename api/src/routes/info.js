const axios = require("axios");
const { api_key } = process.env;
const { Dog, Temperament } = require("../db");

const getApiInfo = async () => {
  const apiUrl = await axios.get(
    `https://api.thedogapi.com/v1/breeds?api_key=${api_key}`
  );
  const apiInfo = await apiUrl.data.map((e) => {
    return {
      id: e.id,
      name: e.name,
      height_imperial: e.height.imperial,
      weight_imperial: e.weight.imperial,
      height_metric: e.height.metric, //Altura
      weight_metric: e.weight.metric,
      life_span: e.life_span,
      temperament: e.temperament,
      image: e.image.url,
    };
  });
  return apiInfo;
};

const getDbInfo = async () => {
  return await Dog.findAll({
    include: {
      model: Temperament,
      attributes: ["name"],
      through: {
        attributes: [],
      },
    },
  });
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
  const temperament = await apiUrl.data.map((e) => {
    if (e.temperament !== null) {
      return e.temperament;
    }
  });

  let temp1 = temperament.join();
  let temp2 = temp1.replace(/ /g, "");
  let temp3 = temp2.split(",");
  let temp4 = new Set(temp3);
  let temp5 = [...temp4];
  let temp6 = temp5.filter((t) => t !== "" && t !== null);
  let temperaments = temp6.map((e) => {
    return { name: e };
  });
  await Temperament.bulkCreate(temperaments);
};

module.exports = { getApiInfo, getDbInfo, getAllInfo, createTemperament };
