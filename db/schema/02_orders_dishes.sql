DROP TABLE IF EXISTS dishes, orders CASCADE;

CREATE TABLE dishes (
  id SERIAL PRIMARY KEY NOT NULL,
  dish_name VARCHAR(255) NOT NULL,
  description TEXT,
  price INTEGER NOT NULL,
  image TEXT
);

CREATE TABLE orders(
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  dish_list INTEGER[],
  duration INTEGER DEFAULT 0,
  start_at TIMESTAMP DEFAULT now(),
  completed_at TIMESTAMP
);
