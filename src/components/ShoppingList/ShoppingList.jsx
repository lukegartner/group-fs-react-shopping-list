import ShoppingItem from "../ShoppingItem/ShoppingItem";

const ShoppingList = ({ shoppingList, getShoppingList }) => {
  const resetList = () => {};
  const clearList = () => {};
  return (
    <div>
      <h2>Shopping List</h2>
      <button onClick={resetList}>Reset</button>
      <button onClick={clearList}>Clear</button>
      <div className="shopping-items">
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
