const express = require("express");
const path = require("path");
const app = express();
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const weather = require("./utils/weather");

const port = process.env.PORT || 3000;

app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "../templates/views"));
hbs.registerPartials(path.join(__dirname, "../templates/partials"));
app.use(express.static(path.join(__dirname, "../public")));

app.get("/", (req, res) => {
  res.render("index", { title: "Weather", name: "The Dude" });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.render("weather", { name: "The Dude" });
  } else {
    let address = req.query.address;
    geocode(address, coordinates => {
      weather(coordinates, info => {
        let { summary, temperature } = info.currently;
        res.render("renderWeather", { summary, temperature });
      });
    });
  }
});

app.get("/about", (req, res) => {
  res.render("about", { title: "About", name: "The Dude" });
});

app.get("/help", (req, res) => {
  res.render("help", { title: "Help", name: "The Dude" });
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    res.send({ error: "YOU MUST PROVIDE A SEARCH TREM" });
  } else {
    res.send({
      products: []
    });
  }
});

app.get("*", (req, res) => {
  res.render("notfound", { name: "The Dude" });
});

app.listen(port, () => {
  console.log("Listening on: ", port);
});
