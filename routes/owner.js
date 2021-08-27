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
    // check for owners email, otherwise redirect to login
    if (!req.session.user_id || req.session.user_id !== 1) {
      res.redirect("/login");
      return;
    }
    // display owner page
    const user = req.session.user_id;
    const templateVars = { user };
    res.render("owner", templateVars);
  });

  router.get("/new-orders", (req, res) => {
    // database query to see new orders
    db.query(
      `
      SELECT orders.*, users.id as user_id,users.name,to_char((select start_at)::timestamp, 'HH:MI:SSPM') AS start_time
      FROM orders JOIN users ON user_id = users.id
      WHERE duration = 0;
    `
    )
      .then((response) => {
        res.json(response.rows);
      })
      .catch((err) => res.json(err.message));
  });

  router.get("/responded-orders", (req, res) => {
    // database query to see responded orders
    db.query(
      `
      SELECT orders.*, users.id as user_id,users.name,to_char((select start_at)::timestamp, 'HH:MI:SSPM') AS start_time
      FROM orders JOIN users ON user_id = users.id
      WHERE duration > 0 AND completed_at IS NULL
      ORDER BY start_at DESC;
      ;
    `
    )
      .then((response) => {
        res.json(response.rows);
      })
      .catch((err) => res.json(err.message));
  });

  router.get("/user/:order_id", (req, res) => {
    // get info for SMS text
    db.query(
      `
      SELECT name, phone FROM orders JOIN users ON user_id = users.id
      WHERE orders.id = $1;
    `,
      [req.params.order_id]
    )
      .then((response) => {
        res.json(response.rows[0]);
      })
      .catch((err) => res.json(err.message));
  });

  router.put("/", (req, res) => {
    const { orderId, duration } = req.body;
    // updating the duration in database
    db.query(
      `
      UPDATE orders SET duration = $1
      WHERE id = $2
      RETURNING *
      ;
    `,
      [duration, orderId]
    )
      .then((response) => {
        res.json(response.rows[0]);
      })
      .catch((err) => res.json(err.message));
  });

  router.patch("/", (req, res) => {
    const { orderId } = req.body;
    // complete the order in the database
    db.query(
      `
      UPDATE orders SET completed_at = to_timestamp(${Date.now()} / 1000.0)
      WHERE id = $1
      RETURNING *
      ;
    `,
      [orderId]
    )
      .then((response) => {
        res.json(response.rows[0]);
      })
      .catch((err) => res.json(err.message));
  });

  return router;
};
