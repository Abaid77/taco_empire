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
    if (!req.session.user_id) {
      res.redirect("/login");
      return;
    }
    db.query(`SELECT * FROM orders;`)
      .then((data) => {
        const orders = data.rows;
        const user = req.session.user_id;
        const templateVars = { user, orders };
        res.render("order", templateVars);
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  router.get("/:user_id", (req, res) => {
    if (!req.session.user_id) {
      res.redirect("/login");
      return;
    }
    db.query(
      `SELECT *, to_char((select start_at)::timestamp, 'HH:MI:SSPM') AS start_time
        FROM orders WHERE user_id = $1 AND completed_at IS NULL
        ORDER BY id DESC;`,
      [req.session.user_id]
    )
      .then((data) => {
        const orders = data.rows;
        const orderList = {};
        for (let order of orders) {
          const dishList = {};
          for (let dish of order.dish_list) {
            switch (dish) {
              case 1:
                dishList.beef === undefined
                  ? (dishList.beef = 1)
                  : (dishList.beef += 1);
                break;
              case 2:
                dishList.chicken === undefined
                  ? (dishList.chicken = 1)
                  : (dishList.chicken += 1);
                break;
              case 3:
                dishList.shrimp === undefined
                  ? (dishList.shrimp = 1)
                  : (dishList.shrimp += 1);
                break;
            }
          }
          orderList[order.id] = dishList;
        }
        const user = req.session.user_id;
        const templateVars = { user, orders, orderList };
        res.render("user_orders", templateVars);
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  router.post("/", (req, res) => {
    const { user_id, dish_list } = req.body;
    db.query(
      `INSERT INTO orders (user_id,dish_list) VALUES ($1, ARRAY [${dish_list}]);`,
      [user_id]
    )
      .then((data) => {
        const orders = data.rows;
        res.json({ success: true });
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });
  return router;
};
