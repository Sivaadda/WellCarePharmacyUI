import { useState } from "react";
import Footer from "./Footer";
import UserHeader from "./UserHeader";
function Cart({ cartItems }){
  const getTotalCost = () => {
    return cartItems.reduce((total, cartItem) => {
      return total + cartItem.quantity * cartItem.price;
    }, 0);
  };
  
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
    // Create the request payload
    const payload = {
      quantity: orderData.quantity,
      totalPrice: orderData.totalPrice,
      usersId: orderData.usersId,
      products: orderData.products
    };

    // Send the POST request to the server
    fetch("https://localhost:7108/api/Orders/AddOrder", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    })
      .then((response) => {
        response.json()
        console.log(response.json)
      })
  
      .then((data) => {
        console.log("Order placed successfully:", data);
        // Reset the order data or navigate to the order confirmation page
      })
      .catch((error) => {
        console.error("Error placing the order:", error);
      });
  };

 
    return(
        <div>
          <UserHeader/>
          <h1>Cart Items</h1>
             <table className=" container table align-middle mb-0 bg-white  ">
              <thead className="bg-light ">
                <tr>
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
                {cartItem.quantity}
                </div>
              </td>
              <td>
                <div>
                ${cartItem.quantity * cartItem.price}
                </div>
              </td>
              <td>
                <div>
                <button className="btn btn-danger btn-rounded">Delete</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
              <tr className="justify-content-end">
              
              <td > <div></div></td>
                <td > <div></div></td>
                <td > <div><b>Total Cost:</b></div></td>
                <td > <div>${getTotalCost}</div></td>
                <td><div><button className="btn btn-warning" onClick={() => placeOrder()}>CheckOut</button></div></td>
              </tr>

             </table>   
          <Footer/>
        </div>
      );
   }
export default Cart;



























                            

                           
        
