import React from "react";
import { useState, useEffect } from "react";

import "@fontsource/roboto";
import Box from "@mui/material/Box";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { indigo, orange, red } from "@mui/material/colors";

//Importing components

import Header from "../Header/Header.jsx";
import Inputs from "../Inputs/Inputs.jsx";
import ShoppingList from "../ShoppingList/ShoppingList.jsx";
import "./App.css";

//Creating Theme

const theme = createTheme({
  status: {
    error: indigo,
  },
  palette: {
    primary: indigo,
    secondary: orange,
  },
});

//GET request for items in shopping list database, setting shoppingList to an array of items in database

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

  //Review: why is this needed here?
  useEffect(() => {
    getShoppingList();
  }, []);

  //Displaying components on DOM
  //Passing GET request (getShoppingList) to Inputs and ShoppingList components
  //Passing array of shopping list items (shoppingList) to ShoppingList component
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Header setShoppingList={setShoppingList} />
        <Box
          sx={{
            mx: 1.5,
          }}
        >
          <Inputs getShoppingList={getShoppingList} />
          <ShoppingList
            shoppingList={shoppingList}
            getShoppingList={getShoppingList}
            theme={theme}
          />
        </Box>
      </ThemeProvider>
    </div>
  );
}

export default App;
