const { Client } = require("@googlemaps/google-maps-services-js");
require("dotenv").config();
const client = new Client({});
var axios = require('axios');

const initMap = (req, res) => {
    var config = {
    method: 'get',
    url: 'https://maps.googleapis.com/maps/api/place/textsearch/json?query=NTUC&key=AIzaSyBvNFYsuIRcawVXWtsb9sA-VYToFPU6afQ',
    headers: { }
    };

    axios(config)
    .then(function (response) {
    const result = response.data.results;
    result.forEach(place=>console.log(place));
    // result.forEach(place => console.log(place))
    // res.status(200).send(JSON.stringify(response.data.results));
    })
    .catch(function (error) {
    res.status(201).send(error);
    });
}


module.exports = {
  initMap,
};
