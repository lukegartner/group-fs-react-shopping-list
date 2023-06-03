import React from "react";
import { useState, useEffect } from "react";

import Header from "../Header/Header.jsx";
import Inputs from "../Inputs/Inputs.jsx";
import ShoppingList from "../ShoppingList/ShoppingList.jsx";
import ShoppingItem from "../ShoppingItem/ShoppingItem.jsx";
import "./App.css";

function App() {
  const [shoppingList, setShoppingList] = useState([]);

  const getShoppingList = () => {
    return fetch("/shoppinglist")
      .then((response) => response.json())
      .then((item) => setShoppingList(item))
      .catch((error) => {
        console.error(error);
      });
  };

  //Getting shopping list
  useEffect(() => {
    getShoppingList();
  }, []);

  return (
    <div className="App">
      <Header />
      <Inputs getShoppingList={getShoppingList} />
      <ShoppingList
        shoppingList={shoppingList}
        getShoppingList={getShoppingList}
      />
    </div>
  );
}

export default App;
