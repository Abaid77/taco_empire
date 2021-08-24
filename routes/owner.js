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

module.exports = (db) => {
  router.get("/", (req, res) => {
    // display owner page
    // check for owners email
    const user = req.session.user_id;
    const templateVars = { user };
    res.render("owner", templateVars);
  });

  return router;
};
