const express = require("express");
const pool = require("../modules/pool.js");

const router = express.Router();

//GET
router.get("/", (req, res) => {
  queryText = `
    SELECT * FROM shoppinglist
    ORDER BY purchased, name;`;

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
  // if id include ID in query, else delete *
  let queryText;
  let queryArgs = [];
  if (id) {
    queryText = `DELETE FROM shoppinglist WHERE id=$1;`;
    queryArgs = [id];
  } else {
    queryText = "DELETE FROM shoppinglist;";
  }

  pool
    .query(queryText, queryArgs)
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

router.put("/", (req, res) => {
  const id = req.query.id;
  const resetPurchased = req.query.purchased;

  let queryText;
  let queryArgs = [];
  const { name, quantity, unit, purchased } = req.body;
  if (resetPurchased) {
    queryText = `UPDATE shoppinglist SET purchased = false;`;
  }
  if (!resetPurchased) {
    queryText = `
    UPDATE shoppinglist SET name=$1, quantity=$2, unit=$3, purchased=$4
    WHERE id = $5;    
  `;
    queryArgs = [name, quantity, unit, purchased, id];
  }

  pool
    .query(queryText, queryArgs)
    .then((result) => res.sendStatus(201))
    .catch((error) => {
      console.log(error);
      res.sendStatus(500);
    });
});

module.exports = router;
