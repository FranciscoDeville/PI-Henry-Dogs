const { Router } = require('express');
const router = Router();
const {Temperament} = require('../db');

router.get('/', async (req, res, next) => {
    try {
        const temperaments = await Temperament.findAll()
        res.status(200).json(temperaments)
    } catch (error) {
        next(error)
    }
})

module.exports = router;