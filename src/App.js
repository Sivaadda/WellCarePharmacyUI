import './App.css';
import Routing from './Components/Routing';
import React from 'react';
import { useState } from 'react';


function App() {
  const [cartItems,setCartItems] = useState([]);

  const addToCart = (product) => {
  setCartItems([...cartItems, product]);
  }
  return (
    <div className="App">
    
      <Routing addToCart={addToCart} cartItems ={cartItems}></Routing>
    </div>
  );
}

export default App;
