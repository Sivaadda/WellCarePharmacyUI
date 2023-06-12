import { toast } from 'react-toastify';
import './App.css';
import Routing from './Components/Routing';
import React from 'react';
import { useState } from 'react';


function App() {
  const [cartItems,setCartItems] = useState([]);

  const addToCart = (det) =>{
    const MedicineExist = cartItems.find((cart)=> cart.id === det.id);
    
    if(MedicineExist){
      setCartItems(cartItems.map((cart) => cart.id === det.id ?
      {...MedicineExist , quantity:MedicineExist.quantity+1}: cart));
    }
      else{
        setCartItems([...cartItems, {...det, quantity:1}])

      }
      toast.success("Product is added to cart")
    }

      const removeItem = (det) =>{
      const MedicineExist = cartItems.find((cart)=> cart.id === det.id);
      if(MedicineExist.quantity === 1){
        setCartItems(cartItems.filter((cart) => cart.id === det.id ));
   
      }
        else{
          setCartItems(
         cartItems.map((cart) => cart.id === det.id ? {...MedicineExist, quantity:MedicineExist.quantity - 1}:cart));
      
  
        }
      }
      const delectItem = (id) =>{
        setCartItems((item) =>{
          return item.filter(cartItems => cartItems.id !== id)
        })
      }

 
  return (
    <div className="App">
    
      <Routing addToCart={addToCart} setCartItems={setCartItems} cartItems ={cartItems} delectItem ={delectItem} removeItem={removeItem}></Routing>
    </div>
  );
}

export default App;
