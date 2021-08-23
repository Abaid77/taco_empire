/*
 * All routes for Orders are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require("express");
const router = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    db.query(`SELECT * FROM orders;`)
      .then((data) => {
        const orders = data.rows;
        res.render("order", { orders });
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  router.post("/", (req, res) => {
    const { user_id, dish_list } = req.body;
    // console.log("user_id", user_id, "dish_list", dish_list);
    db.query(
      `INSERT INTO orders (user_id,dish_list) VALUES ($1, ARRAY [${dish_list}]);`,
      [user_id]
    )
      .then((data) => {
        const orders = data.rows;
        console.log(orders);
        return orders;
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });
  return router;
};
