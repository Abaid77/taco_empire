/*
 * All routes for dishes are defined here
 * Since this file is loaded in server.js into api/dishes,
 *   these routes are mounted onto /dishes
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

// This route is not currently used in the app. For example purposes we simplified the menu. However this code serves as the base for
// adding database queries to fill out the menu.
  // Database query for specific dish
const express = require("express");
const router = express.Router();

// Database query for list of all dishes

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

  // Database query for specific dish

  router.get("/:dish_id", (req, res) => {
    let query = `SELECT * FROM dishes WHERE id = $1;`;
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
