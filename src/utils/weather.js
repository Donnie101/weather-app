const request = require("request");

const weather = ({ latitude, longitude }, callback) => {
  const url = `https://api.darksky.net/forecast/42d0fb685befbefe2c0a17f8a29a7d2d/${latitude},${longitude}`;

  request({ url }, (error, { body }) => {
    if (error) {
      console.log("SOMETHING WENT WRONG");
    } else if (body.error) {
      console.log("UNABLE TO FIND LOCATION");
    } else {
      const data = JSON.parse(body);
      callback(data);
    }
  });
};

module.exports = weather;
