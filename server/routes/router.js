const express = require("express");
const pool = require("../modules/pool.js");

const router = express.Router();

//GET
router.get("/", (req, res) => {
  queryText = `
    SELECT * FROM shoppinglist
    ORDER BY name;`;

  pool
    .query(queryText)
    .then((result) => {
      res.status(200).send(result.rows);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
});

// POST
router.post("/", (req, res) => {
  const groceryItem = req.body;
  const queryText = `
    INSERT INTO shoppinglist (name, quantity, unit, purchased)
    VALUES ($1, $2, $3, false);
    `;
  pool
    .query(queryText, [
      groceryItem.name,
      groceryItem.quantity,
      groceryItem.unit,
    ])
    .then((result) => {
      console.log(`Added grocery item to the database, `, groceryItem);
      res.sendStatus(201);
    })
    .catch((error) => {
      console.log(`Error making database query ${queryText} `, error);
      res.sendStatus(500);
    });
});

// DELETE

router.delete("/", (req, res) => {
  const id = req.query.id;

  let queryText = `DELETE FROM shoppinglist WHERE id=$1;`;
  pool
    .query(queryText, [id])
    .then((result) => {
      console.log("Grocery item deleted");
      res.sendStatus(200);
    })
    .catch((error) => {
      console.log(`Error making database query ${queryText}`, error);
      res.sendStatus(500);
    });
});

// PUT

module.exports = router;
