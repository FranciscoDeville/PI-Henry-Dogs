const { Router } = require("express");
const dogsRoutes = require("./dogRoutes.js");
const temperamentsRoutes = require("./temperamentRoutes.js");
const { Dog, Temperament } = require('../db.js')
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const router = Router();
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use("/dogs", dogsRoutes);
router.use("/temperaments", temperamentsRoutes);

router.post("/post", async (req, res, next) => {
    try {
      const {
        name,
        height_min,
        height_max,
        weight_min,
        weight_max,
        life_span_min,
        life_span_max,
        temperament,
        image,
        createdInDb,
      } = req.body;
  
      const dogCreated = await Dog.create({
        name,
        height_min,
        height_max,
        weight_min,
        weight_max,
        life_span_min,
        life_span_max,
        temperament,
        image,
        createdInDb,
      });
      let temperamentDb = await Temperament.findAll({where: {name: temperament}})
      dogCreated.addTemperament(temperamentDb)
      /* for (let i = 0; i < temperament.length; i++) {
        const temp = await Temperament.findOne({
            where: {name: temperament[i]}
        })
        dogCreate.addTemperament(temp)
      } */
      res.status(200).json(dogCreated);
    } catch (error) {
      next(error);
    }
  });

module.exports = router;
