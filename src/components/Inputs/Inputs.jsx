import { useState } from "react";

//Setting up variables to capture and set name, quanity, and unit. getShoppingList (props.getShoppingList) is passed to the function
const Inputs = ({ getShoppingList }) => {
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [unit, setUnit] = useState("");

  //Sending POST request with items from user input

  const addItem = () => {
    fetch("/shoppinglist", {
      method: "POST",
      body: JSON.stringify({ name, quantity, unit }),
      //Above: is { name, quantity, unit } being passed in as an object?
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(() => {
        getShoppingList();
        //Calling another GET request to refresh page with new item
      })
      .catch((err) => {
        console.error(err);
      });
  };

  //Defining input component to be rendered on DOM
  // Review: Discuss theory behind use of onChange and value below

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
