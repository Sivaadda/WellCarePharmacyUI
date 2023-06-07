import { useState } from "react";
import Footer from "./Footer";
import UserHeader from "./UserHeader";
import { useNavigate } from 'react-router-dom';
function Cart({ cartItems }){
  const getTotalCost = () => {
    return cartItems.reduce((total, cartItem) => {
      return total + cartItem.quantity * cartItem.price;
    }, 0);
  };
  const navigate = useNavigate();
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
      quantity: 23,
      totalPrice: 345,
      usersId: 5,
      products: cartItems.map(cartItem => ({
        productId: cartItem.id
      }))
    });

    // Send the POST request to the server
    fetch("https://localhost:7108/api/Orders/AddOrder", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(orderData)
    })
    .then(response =>{ return response.json()
    })
    .then(data => {
     
      console.log("Order placed successfully:");
      console.log(data)
      navigate("/Admin/Products");

      // Reset the order data or navigate to the order confirmation page
    })
    .catch(error => {
      console.log( error.message);
    });
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
       
              <tr className="justify-content-end">
              
              <td > <div></div></td>
                <td > <div></div></td>
                <td > <div><b>Total Cost:</b></div></td>
                <td > <div>${getTotalCost}</div></td>
                <td><div><button className="btn btn-warning" onClick={() => placeOrder()}>CheckOut</button></div></td>
              </tr>
              </tbody>
             </table>   
          <Footer/>
        </div>
      );
   }
export default Cart;



























                            

                           
        
