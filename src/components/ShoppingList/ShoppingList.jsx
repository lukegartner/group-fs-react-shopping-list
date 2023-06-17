import ShoppingItem from "../ShoppingItem/ShoppingItem";
import "./ShoppingList.css";
import Swal from "sweetalert2";
import { Button } from "@mui/material";

//shoppingList (list of items from database) and getShoppingList (GET request) were passed to this component from App.jsx

const ShoppingList = ({ shoppingList, getShoppingList }) => {
  const resetList = () => {
    fetch("/shoppinglist/?purchased=true", {
      method: "PUT",
      body: JSON.stringify({ purchased: true }),
      headers: { "Content-Type": "application/json" },
    })
      .then(() => {
        getShoppingList();
      })
      .catch((error) => console.error(error));
  };
  // alert/conditional state before sending request

  // DELETE ALL request
  const clearList = () => {
    fetch("/shoppinglist", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    })
      //Using GET request passed in from props
      .then(() => {
        getShoppingList();
      })
      .catch((err) => {
        console.error(error);
      });
  };

  return (
    <div>
      <h2>Shopping List</h2>
      <Button
        variant="contained"
        color="secondary"
        sx={{ mx: 1 }}
        onClick={() => {
          Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to reverse this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#9ACD32",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Reset List",
          }).then((result) => {
            if (result.isConfirmed) {
              resetList();
              Swal.fire("List reset!", "Your list has been reset.", "Success");
            }
          });
        }}
      >
        Reset
      </Button>
      <Button
        variant="contained"
        color="primary"
        onClick={() => {
          Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#9ACD32",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Clear List",
          }).then((result) => {
            if (result.isConfirmed) {
              clearList();
              Swal.fire(
                "List cleared!",
                "Your list has been cleared.",
                "success"
              );
            }
          });
        }}
      >
        Clear
      </Button>
      <div className="shopping-items">
        {/* Looping through each item in shoppingList and displaying it using ShoppingItem component. Also passing multiple props along to ShoppingItem component. */}
        {shoppingList.map(({ id, name, quantity, unit, purchased }) => (
          <ShoppingItem
            key={id}
            id={id}
            name={name}
            quantity={quantity}
            unit={unit}
            purchased={purchased}
            getShoppingList={getShoppingList}
          />
        ))}
      </div>
    </div>
  );
};

export default ShoppingList;
