/*
 * All routes for Login are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require("express");
const router = express.Router();
const cookieSession = require("cookie-session");

router.use(
  cookieSession({
    name: "user_id",
    keys: ["super secret 1", "super secret 2"],
  })
);

module.exports = () => {
  // display login page
  router.get("/", (req, res) => {
    const user = req.session.user_id;
    const templateVars = { user };
    res.render("./login", templateVars);
  });

  router.get("/register", (req, res) => {
    // display registration page
    res.render("./register");
  });

  router.get("/:user_id", (req, res) => {
    // redirect to home
    res.redirect("/");
  });

  router.post("/", (req, res) => {
    //login users
    const email = req.body.email;
    // check for owners email
    if (email === "1@example.com") {
      req.session.user_id = 1;
      res.redirect("/owner");
      return;
    } else {
      req.session.user_id = 2;
      res.redirect("/orders");
    }
  });

  router.post("/logout", (req, res) => {
    // logout and clear cookies
    req.session = null;
    res.redirect("/");
  });
  return router;
};
