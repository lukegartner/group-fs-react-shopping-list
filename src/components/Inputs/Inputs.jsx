import { useState } from "react";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import { BsCartPlus } from "react-icons/bs";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";

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
        console.log("test");
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
      <h2 style={{ padding: ".25rem" }}>Add Item</h2>
      <TextField
        type="text"
        label="Item"
        onChange={(e) => setName(e.target.value)}
        value={name}
        variant="outlined"
        sx={{ padding: ".25rem" }}
      />
      <TextField
        type="number"
        label="Quantity"
        onChange={(e) => setQuantity(e.target.value)}
        value={quantity}
        variant="outlined"
        sx={{ padding: ".25rem" }}
      />
      <TextField
        type="text"
        label="Unit"
        onChange={(e) => setUnit(e.target.value)}
        value={unit}
        variant="outlined"
        sx={{ padding: ".25rem" }}
      />
      {/* <input type="submit" /> */}
      <IconButton
        type="submit"
        color="primary"
        aria-label="add to shopping cart"
        sx={{ padding: ".5rem" }}
      >
        <AddShoppingCartIcon fontSize="large" />
      </IconButton>
    </form>
  );
};

export default Inputs;
