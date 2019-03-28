const request = require("request");

const geocode = (address, callback) => {
  request(
    {
      url: `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1IjoiZG9ubmllMTAxIiwiYSI6ImNqdHJhcmRlMTBvOTc0ZG1zeXZyZmZuYmkifQ.Uocui6sS-eAnWp6MROA2cw`
    },
    (error, { body }) => {
      if (error) {
        console.log("SOMETHING WENT WRONG");
      } else {
        let data = JSON.parse(body);
        const latitude = data.features[0].center[0];
        const longitude = data.features[0].center[1];
        callback({ latitude, longitude });
      }
    }
  );
};

module.exports = geocode;
