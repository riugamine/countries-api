Country Info API
A simple RESTful API that provides information about countries. The API has two main endpoints to retrieve a list of available countries and detailed information about a specific country.

Table of Contents
Introduction
Endpoints
GET /api/countries
GET /api/country/:code
Technologies Used
Installation
Usage
Error Handling
Introduction
This API allows you to:

Retrieve a list of available countries.
Fetch detailed information about a specific country, including:
Neighboring countries.
Historical population data.
Flag URL.
Endpoints
GET /api/countries
This endpoint returns a list of all available countries.

Response
Status: 200 OK
Content-Type: application/json
Body: An array of available countries.
json
Copiar
Editar
[
  "USA",
  "UK",
  "Germany",
  ...
]
Error Responses
Status: 500 Internal Server Error
Body:
json
Copiar
Editar
{ "error": "Failed to fetch available countries" }
GET /api/country/:code
This endpoint returns detailed information about a specific country. Replace :code with the country code (e.g., UA for Ukraine).

URL Example
http://localhost:3001/api/country/UA

Response
Status: 200 OK
Content-Type: application/json
Body:
json
Copiar
Editar
{
  "country": "Ukraine",
  "borders": ["Russia", "Belarus", "Poland", "Slovakia", "Hungary", "Romania", "Moldova"],
  "population": [
    { "year": 2020, "population": 41660000 },
    { "year": 2021, "population": 41700000 }
  ],
  "flag": "https://countryflagsapi.com/png/ua"
}
Error Responses
Status: 400 Bad Request
json
Copiar
Editar
{ "error": "Country code is required" }
Status: 404 Not Found
json
Copiar
Editar
{ "error": "Country not found or invalid country code" }
Status: 500 Internal Server Error
json
Copiar
Editar
{ "error": "Failed to fetch country information" }
Technologies Used
Backend: Node.js (Express.js)
APIs:
Date Nager API
CountriesNow API
Installation
To run this API locally, follow the steps below.

1. Clone the Repository
bash
Copiar
Editar
git clone https://github.com/yourusername/country-info-api.git
cd country-info-api
2. Install Dependencies
bash
Copiar
Editar
npm install
3. Run the Server
bash
Copiar
Editar
npm run dev
This will start the server at http://localhost:3001.

Usage
Once the server is running, you can make the following requests:

GET /api/countries: To get a list of available countries.
GET /api/country/:code: To get detailed information about a specific country. Replace :code with the country code (e.g., UA, US, GB).
You can use tools like Postman or cURL to test the API.

Error Handling
The API includes error handling for common issues:

Missing or invalid country codes.
Issues with fetching data from external APIs.
Internal server errors.
All errors are returned with an appropriate status code and error message.