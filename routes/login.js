const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    // display login page
  });

  router.get("/:user_id", (req, res) => {
    req.session.user_id = req.params.id;
    res.redirect('/');
  });
  return router;
};
