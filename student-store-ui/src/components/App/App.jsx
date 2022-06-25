import * as React from "react"
// import {BrowserRouter} from 'react-router-dom';
import Navbar from "../Navbar/Navbar"
import Sidebar from "../Sidebar/Sidebar"
import Home from "../Home/Home"
import ProductGrid from "../ProductGrid/ProductGrid";
import About from "../About/About";
import Footer from "../Footer/Footer";
import Contact from "../Contact/Contact";
import Menu from "../Menu/Menu";
import ProductDetail from "../ProductDetail/ProductDetail";
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

import "./App.css"

import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
export default function App() {
  const [products, setProductStat] = useState([]);
  const [isFetching, setFetchingStat] = useState(false);
  const [isOpen, setOpenStat] = useState(false);
  const [shoppingCart, setShoppingCartStat] = useState([]);
  const [checkoutForm, setCheckoutForm] = useState([]);
  const [error, setErrorStat] = useState("");
  const URL = "https://codepath-store-api.herokuapp.com/store";

  useEffect(async()  => {
    const {data} = await axios(URL)
    .catch(function(error){
      console.log("error: ", error)
      setLoading(true)
  })
    setProductStat(data.products)
    // console.log("products: ", data.products)
  },[])
  // fetchProducts();

  function handleOnToggle(){
    setOpenStat(!isOpen);
  };
  function handleAddItemsToCart(productId){
    // TODO: It should add that product to the shoppingCart if 
    // it doesn't exist, and set its quantity to 1.
    //  It should add the price of the product to the total 
    // price of the shoppingCart.
    console.log("cart: ", shoppingCart)
    let temp = [...shoppingCart];
    let inCart = false;

    temp = temp.map((item) =>
    {
      if(item.itemId === productId){
        inCart = true;
        return{...item, quantity: item.quantity + 1};
      }
      else{
        return item;
      }

    }
    );
    if(!inCart){
      temp = [...temp, {itemId: productId, quantity: 1}];
    }
    setShoppingCartStat(temp)
    
  };
  function handleRemoveItemToCart(productId){
    console.log("cart: ", shoppingCart)
    let temp = [...shoppingCart];
    let inCart = false;

    temp = temp.map((item) =>
    {
      if(item.itemId === productId){
        inCart = true;
        return{...item, quantity: item.quantity - 1};
      }
      else{
        return item;
      }

    }
    );
    if(!inCart){
      temp = [...temp, {itemId: productId, quantity: 0}];
    }
    setShoppingCartStat(temp)
  };
  function handleOnCheckoutFormChange(name, value){
    //TODO: It should update the checkoutForm object 
    // with the new value from the correct input(s)
  };
  function handleOnSubmitCheckoutForm(name, value){

  };

  return (
    <div className="app">
      <BrowserRouter>

        <main>
          {/* YOUR CODE HERE! */}
          <Navbar />
          <Sidebar isOpen={isOpen} shoppingCart={shoppingCart} products={products} checkoutForm={checkoutForm} handleCheckoutForm={handleOnCheckoutFormChange} handleSubmitCheckoutForm={handleOnSubmitCheckoutForm} handleToggle={handleOnToggle}/>
          <Routes>
            <Route path="/" element={<Home products={products} handleAddItemsToCart={handleAddItemsToCart} handleRemoveItemToCart={handleRemoveItemToCart}/>} />
            <Route path="/products/:productId" element={<ProductDetail  handleAddItemsToCart={handleAddItemsToCart} handleRemoveItemToCart={handleRemoveItemToCart}/>} />
          </Routes> 
          {/* <Menu /> */}

        </main>
      </BrowserRouter>
    </div>
  )
};
