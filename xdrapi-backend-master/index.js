var express = require("express");
var cors = require("cors");
var app = express();
const port = process.env.PORT || "4000";
var bodyParser = require("body-parser");
const mongoose = require("mongoose");
var session = require("express-session");
const dotenv = require("dotenv");

app.use(session({ secret: "xdrapi", saveUninitialized: true, resave: true }));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
dotenv.config();
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://127.0.0.1:27017/xdrapi", {
  useNewUrlParser: true,
});

mongoose.connection.on(
  "error",
  console.error.bind(console, "connection error:")
);

require("./routes")(app);

app.get("/", (req, res) => {
  res.status(200).send("Hello World !");
});

app.listen(port, () => {
  console.log(`Listening to requests on http://localhost:${port}`);
});
