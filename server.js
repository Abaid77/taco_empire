// load .env data into process.env

require("dotenv").config();

// Web server config

const PORT = process.env.PORT || 8080;
const ENV = process.env.ENV || "development";
const express = require("express");
const bodyParser = require("body-parser");
const sass = require("node-sass-middleware");
const app = express();
const morgan = require("morgan");
const cookieSession = require("cookie-session");
const { textOwner, textUser } = require("./send_sms");

// PG database client/connection setup

const { Pool } = require("pg");
const dbParams = require("./lib/db.js");
const db = new Pool(dbParams);
db.connect();

// Middleware

app.use(morgan("dev"));

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  "/styles",
  sass({
    src: __dirname + "/styles",
    dest: __dirname + "/public/styles",
    debug: true,
    outputStyle: "expanded",
  })
);
app.use(express.static("public"));
app.use(
  cookieSession({
    name: "user_id",
    keys: ["super secret 1", "super secret 2"],
  })
);

// Requires for routes

const usersRoutes = require("./routes/users");
const dishesRoutes = require("./routes/dishes");
const loginRoutes = require("./routes/login");
const ordersRoutes = require("./routes/orders");
const ownerRoutes = require("./routes/owner");

// Routes

app.use("/users", usersRoutes(db));
app.use("/dishes", dishesRoutes(db));
app.use("/login", loginRoutes(db));
app.use("/orders", ordersRoutes(db));
app.use("/owner", ownerRoutes(db));

// Home page

app.get("/", (req, res) => {
  const user = req.session.user_id;
  const templateVars = { user };
  res.render("index", templateVars);
});

// Twilio API call for sending SMS

app.post("/send-sms/:type", (req, res) => {
  if (req.params.type === "owner") {
    textOwner();
  }
  if (req.params.type === "user") {
    const { phone, duration, name, orderId } = req.body;
    textUser(phone, orderId, duration, name);
  }
  res.json({ success: true });
});

app.listen(PORT, () => {
  console.log(`Taco Empire app listening on port ${PORT}`);
});
