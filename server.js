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

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
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

// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own
const usersRoutes = require("./routes/users");
const dishesRoutes = require("./routes/dishes");
const loginRoutes = require("./routes/login");
const ordersRoutes = require("./routes/orders");
const ownerRoutes = require("./routes/owner");

// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
app.use("/users", usersRoutes(db));
app.use("/dishes", dishesRoutes(db));
app.use("/login", loginRoutes(db));
app.use("/orders", ordersRoutes(db));
app.use("/owner", ownerRoutes(db));
// Note: mount other resources here, using the same pattern above

// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).
app.get("/", (req, res) => {
  const user = req.session.user_id;
  const templateVars = { user };
  res.render("index", templateVars);
});

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
