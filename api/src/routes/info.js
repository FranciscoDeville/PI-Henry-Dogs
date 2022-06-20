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
      height: e.height.metric, //Altura
      weight: e.weight.metric,
      life_span: e.life_span,
      breed_group: e.breed_group,
      bred_for: e.bred_for,
      temperament: e.temperament,
      origin: e.origin,
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
  const [apiInfo2, dbinfo2] = Promise.all([getApiInfo(), getDbInfo()]);
  return [...apiInfo2, ...dbinfo2];
};

module.exports = { getApiInfo, getDbInfo, getAllInfo };
