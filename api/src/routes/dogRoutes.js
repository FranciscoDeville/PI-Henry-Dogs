const { Router } = require("express");
const axios = require("axios");
const { Dog, Temperament } = require("../db");
const { api_key } = process.env;
const { getAllInfo, createTemperament } = require("./info");

const router = Router();

router.get("/", async (req, res, next) => {
  try {
    let name = req.query.name;
    const allInfo = await getAllInfo();

    if (name) {
      name = decodeURI(name);
      const dog = allInfo.filter((d) =>
        d.name.toLowerCase().includes(name.toLowerCase())
      );
      if (dog.length) {
        return res.status(200).json(dog);
      } else {
        return res.status(400).json({ error: "Breed not found" });
      }
    } else {
      return res.status(200).json(allInfo);
    }
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const allInfo = await getAllInfo();
    if (id) {
      let dog = allInfo.find((d) => d.id == id);
      if (dog) {
        return res.status(200).json(dog);
      } else {
        return res.status(404).json({ error: "id not found" });
      }
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;

