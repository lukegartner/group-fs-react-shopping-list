import { useState } from "react";

const Inputs = ({ getShoppingList }) => {
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [unit, setUnit] = useState("");

  const addItem = () => {
    fetch("/shoppinglist", {
      method: "POST",
      body: JSON.stringify({ name, quantity, unit }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(() => {
        getShoppingList();
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <form className="inputs" onSubmit={addItem}>
      <h2>Add Item</h2>
      <input
        type="text"
        placeholder="Item"
        onChange={(e) => setName(e.target.value)}
        value={name}
      />
      <input
        type="number"
        placeholder="Quantity"
        onChange={(e) => setQuantity(e.target.value)}
        value={quantity}
      />
      <input
        type="text"
        placeholder="Unit"
        onChange={(e) => setUnit(e.target.value)}
        value={unit}
      />
      <input type="submit" />
    </form>
  );
};

export default Inputs;
