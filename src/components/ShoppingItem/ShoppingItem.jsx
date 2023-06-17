import { useState } from "react";
import "./ShoppingItem.css";

import * as React from 'react';
import Box from '@mui/material/Box';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import BorderColorIcon from '@mui/icons-material/BorderColor';

const ShoppingItem = ({
  id,
  name,
  quantity,
  unit,
  purchased,
  getShoppingList,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [itemName, setItemName] = useState(name);
  const [itemQuantity, setItemQuantity] = useState(quantity);
  const [itemUnit, setItemUnit] = useState(unit);

  //PUT request to update purchased status
  const buyItem = (id, toggledPurchased) => {
    fetch(`/shoppinglist/?id=${id}`, {
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

  const editItem = (id) => {
    fetch(`/shoppinglist/?id=${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id,
        name: itemName,
        quantity: itemQuantity,
        unit: itemUnit,
        purchased,
      }),
    })
      .then(() => {
        getShoppingList();
        setIsEditing(false);
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
    <Box
      className={purchased ? "shopping-item purchased" : "shopping-item"}>
        {isEditing ? (
          <input
            type="text"
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
          />
        ) : (
          <h3>{name}</h3>
        )}
        {isEditing ? (
          <>
            <input
              type="number"
              value={itemQuantity}
              onChange={(e) => setItemQuantity(e.target.value)}
            />
            <input
              type="text"
              value={itemUnit}
              onChange={(e) => setItemUnit(e.target.value)}
            />
          </>
        ) : (
          <p>
            {quantity} {unit}
          </p>
        )}
        {isEditing ? (
          <button
            onClick={() => {
              editItem(id);
            }}
          >
            Update
          </button>
        ) : null}
        {!purchased ? (
          <CheckBoxIcon
            className="icons"
            color='success'
            onClick={() => {
              buyItem(id, !purchased);
            }}
          />
        ) : null}
        {!purchased ? (
          <DeleteIcon
            className="icons"
            color='error'
            onClick={() => {
              removeItem(id);
            }}
          />
        ) : null}
        <BorderColorIcon
          className="icons"
          onClick={() => {
            setIsEditing(!isEditing);
          }}
        />
    </Box>
  );
};

export default ShoppingItem;
