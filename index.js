const express = require('express');
const axios = require('axios');
const cors = require('cors');
const countriesRoutes = require('./routes/countries');
require ('dotenv').config();


const app = express();
const PORT = process.env.PORT || 3001;

//middleware
app.use(express.json());
app.use(cors());
//Home route
app.get('/', (req , res) => {
    res.send('Country info Backend is running!');
});
app.use('/api/countries', countriesRoutes);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
});

