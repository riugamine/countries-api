const axios = require('axios');

// Controller to get all the countries
const getAvailableCountries = async (req, res) => {
    try {
        const response = await axios.get('https://date.nager.at/api/v3/AvailableCountries');

        // validate is a countrie is not found 
        if (!response.data || response.data.length === 0) {
            return res.status(404).json({ error: 'No countries found' });
        }

        res.json(response.data);
    } catch (error) {
        console.error('Error fetching available countries:', error.message);
        res.status(500).json({ error: 'Failed to fetch available countries' });
    }
};
// Controller to get info of the countries
const getCountryInfo = async (req, res) => {
    const { code } = req.params;

    try {
        //validate that the countrie codde is not empty
        if (!code || code.trim() === '') {
            return res.status(400).json({ error: 'Country code is required' });
        }
        // 1. get country info
        const countryInfoResponse = await axios.get(`https://date.nager.at/api/v3/CountryInfo/${code}`);
        const countryInfo = countryInfoResponse.data;
        if (!countryInfo || !countryInfo.commonName) {
            return res.status(404).json({ error: 'Country information not found' });
        }
        // 2. get population data
        const populationResponse = await axios.post('https://countriesnow.space/api/v0.1/countries/population', {
            country: countryInfo.commonName,
        });
        const populationData = populationResponse.data.data.populationCounts;
        if (!populationData || populationData.length === 0) {
            return res.status(404).json({ error: 'Population data not found' });
        }
        // 3. get url for country flag
        const flagResponse = await axios.post('https://countriesnow.space/api/v0.1/countries/flag/images', {
            country: countryInfo.commonName,
        });
        const flagUrl = flagResponse.data?.data?.flag;
        if (!flagUrl) {
            return res.status(404).json({ error: 'Flag image not found' });
        }

        // response
        res.json({
            country: countryInfo.commonName,
            borders: countryInfo.borders || [],
            population: populationData,
            flag: flagUrl,
          });

    } catch (error) {
        console.error('Error fetching country info:', error.message);
    
        if (error.response && error.response.status === 404) {
          return res.status(404).json({ error: 'Country not found or invalid country code' });
        }
    
        res.status(500).json({ error: 'Failed to fetch country information' });
      }
};

module.exports = {
    getAvailableCountries,
    getCountryInfo,
};