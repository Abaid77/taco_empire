/*
 * All routes for dishes are defined here
 * Since this file is loaded in server.js into api/dishes,
 *   these routes are mounted onto /dishes
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require("express");
const router = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    let query = `SELECT * FROM dishes`;
    db.query(query)
      .then((data) => {
        const dishes = data.rows;
        res.json({ dishes });
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  router.get("/:dish_id", (req, res) => {
    let query = `SELECT * FROM dishes WHERE id = $1;`;
    console.log(query);
    console.log("req.params", req.params.dish_id);
    db.query(query, [req.params.dish_id])
      .then((data) => {
        const dishes = data.rows;
        res.json({ dishes });
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  return router;
};
