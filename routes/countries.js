const express = require('express');
const { getAvailableCountries, getCountryInfo  } = require('../controllers/countriesController');
const router = express.Router();

router.get('/', getAvailableCountries); //list of all countries
router.get('/:code', getCountryInfo); // detail info of a country

module.exports = router;