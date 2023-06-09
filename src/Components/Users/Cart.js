import { useState } from "react";
import Footer from "./Footer";
import UserHeader from "./UserHeader";
import { toast } from "react-toastify";

function Cart({ cartItems, delectItem, removeItem , addToCart}){
  const Totalprice = cartItems.reduce((price,cart) => price+ cart.quantity * cart.price,0 );
  const userId = sessionStorage.getItem('userId');
  const totalQuantity = cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0);

  const [orderData, setOrderData] = useState({
    quantity: 0,
    totalPrice: 0,
    usersId: 0,
    products: [
      {
        productId: 0
      }
    ]
  });
  
  const placeOrder = () => {
    // Update the orderData state with the required values
    setOrderData({
      quantity: totalQuantity,
      totalPrice: Totalprice,
      usersId:userId ,
      products: cartItems.map(cartItem => ({
        productId: cartItem.id
      }))
    });

    // Send the POST request to the server
    fetch("https://localhost:7108/api/Orders/AddOrder", {
      method: "POST",
      headers : { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
       },
      body: JSON.stringify(orderData)
    })
    .then(response =>{ return response.json()
    })
    .then(data => {
     
      toast.success("Order is placed successfully");
      console.log("Order placed successfully:");
      console.log(data)
      // Reset the order data or navigate to the order confirmation page
    })
   
  };
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
    return(
        <div>
          <UserHeader/>
          <h1>Cart Items</h1>
             <table className=" container table align-middle mb-0 bg-white  ">
              <thead className="bg-light ">
                <tr>
                    <th>id</th>
                    <th>Image</th>
                    <th>Name</th>
                    <th>Quantity</th>
                    <th>SubTotal</th>
                    <th>Action</th>
                </tr>
              </thead>
              <tbody>
          {cartItems.map((cartItem) => (
            <tr key={cartItem.id}>
              <td>
                <div>
                 <p>{cartItem.id}</p>
                </div>
              </td>
              <td>
                <div>
                  <img src={cartItem.imageUrl} alt={cartItem.productName} width="80" height="80" />
                </div>
              </td>
              <td>
                <div>
                  <p>{cartItem.productName}</p>
                </div>
              </td>
              <td>
                <div>
                <button type="button" className="btn  btn-rounded" onClick={()=>{addToCart(cartItem)}}>+</button>
                <button type="button" className="btn  btn-rounded" onClick={()=>{removeItem(cartItem)}}>-</button>
                </div>
              </td>
              <td>
                <div>
                ${cartItem.quantity}*{cartItem.price}
                </div>
              </td>
              <td>
                <div>
                <button className="btn btn-danger btn-rounded" onClick={()=>{delectItem(cartItem.id)}}>Delete</button>
                </div>
              </td>
            </tr>
          ))}
       
              <tr className="justify-content-end">
              
              <td > <div></div></td>
                <td > <div></div></td>
                <td > <div><b>Total Cost:</b></div></td>
                <td > <div>${Totalprice}</div></td>
                <td><div><button className="btn btn-warning" onClick={() => placeOrder()}>CheckOut</button></div></td>
              </tr>
              </tbody>
             </table>   
          <Footer/>
        </div>
      );
   }
export default Cart;



























                            

                           
        
