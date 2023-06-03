import "./ShoppingItem.css";

const ShoppingItem = ({
  id,
  name,
  quantity,
  unit,
  purchased,
  getShoppingList,
}) => {
  const buyItem = () => {};
  const removeItem = (id) => {
    fetch(`/shoppinglist/?id=${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    })
      .then(() => {
        getShoppingList();
      })
      .catch((err) => {
        console.error(error);
      });
  };

  return (
    <div className={purchased ? "shopping-item purchased" : "shopping-item"}>
      <h3>{name}</h3>
      <p>
        {quantity} {unit}
      </p>
      <button
        onClick={() => {
          buyItem(id);
        }}
      >
        Buy
      </button>
      <button
        onClick={() => {
          removeItem(id);
        }}
      >
        Remove
      </button>
    </div>
  );
};

export default ShoppingItem;
