import "./ShoppingItem.css";

const ShoppingItem = ({
  id,
  name,
  quantity,
  unit,
  purchased,
  getShoppingList,
}) => {
  //PUT request to update purchased status
  const buyItem = (id, toggledPurchased) => {
    fetch(`/shoppinglist/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id,
        name,
        quantity,
        unit,
        purchased: toggledPurchased,
      }),
    })
      .then(() => {
        getShoppingList();
      })
      .catch((err) => {
        console.error(err);
      });
  };

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
          buyItem(id, !purchased);
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
