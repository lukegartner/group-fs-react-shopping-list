import "./ShoppingItem.css";

const ShoppingItem = ({
  id,
  name,
  quantity,
  unit,
  purchased,
  getShoppingList,
}) => {
  //Will this need to become a PUT request?
  const buyItem = () => {};

  //DELETE request using query id
  const removeItem = (id) => {
    fetch(`/shoppinglist/?id=${id}`, {
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
