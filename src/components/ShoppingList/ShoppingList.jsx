import ShoppingItem from "../ShoppingItem/ShoppingItem";

//shoppingList (list of items from database) and getShoppingList (GET request) were passed to this component from App.jsx

const ShoppingList = ({ shoppingList, getShoppingList }) => {
  //Do these two functions just rest an object to empty?
  const resetList = () => {};
  const clearList = () => {};
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
