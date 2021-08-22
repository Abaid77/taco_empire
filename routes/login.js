/*
 * All routes for Login are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require("express");
const router = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    // display login page
    res.render("./login");
  });

  router.get("/:user_id", (req, res) => {
    // req.session.user_id = req.params.id;
    res.redirect("/");
  });

  router.post("/", (req, res) => {
    const email = req.body.email;
    console.log(email)
    // check for owners email
    if (email === "1@example.com") {
      res.status(403).send("Owner Login");
      return;
    } else {
      res.redirect('/orders')
    }

  });
  return router;
};
