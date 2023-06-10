import ShoppingItem from "../ShoppingItem/ShoppingItem";

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
      <button onClick={resetList}>Reset</button>
      <button onClick={clearList}>Clear</button>
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
