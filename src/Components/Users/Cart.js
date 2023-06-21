import { useState , useEffect} from "react";
import UserHeader from "./UserHeader";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import useTokenExpiration from "../TokenExpireLogic";
function Cart({ cartItems, delectItem, removeItem , addToCart,setCartItems}){
  useTokenExpiration();
  const Totalprice = cartItems.reduce(
    (total, cartItem) => total + cartItem.quantity * (cartItem.price - cartItem.discount),
    0
  );
  const userId = sessionStorage.getItem('userId');
  let jwttoken =sessionStorage.getItem('token');
  const totalQuantity = cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0);
  const usenavigate=useNavigate();
  
  const [orderData, setOrderData] = useState({
    totalQuantity: 0,
    totalPrice: 0,
    usersId: 0,
    products: []
  });
  
  const PlaceOrder = () => {
    // Update the orderData state with the required values
    setOrderData({
      totalQuantity: totalQuantity,
      totalPrice: Totalprice,
       usersId: userId ,
      products: cartItems.map(cartItem => ({
        productId: cartItem.id,
        quantity:cartItem.quantity
      }))
    });
    
    // Send the POST request to the server
    fetch("https://localhost:7108/api/Orders/AddOrder", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        'Authorization':'bearer ' + jwttoken,
      },
      body: JSON.stringify(orderData)
    })
    .then(response =>{ 

      return response.json()
    })
    .then(data => {
      toast.success("Order is placed successfully");  
      setCartItems([]);      
      })
    
  };


  useEffect(() => {

    if(userId===''|| userId===null)
    {
        usenavigate("/");
    }

}, [userId, usenavigate])
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
    return(
        <div>
          <UserHeader/>
          <h1>Cart Items</h1>
             <table className=" container table align-middle mb-0 bg-white  ">
              <thead className="bg-light ">
                <tr>
                    
                    <th>Image</th>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>SubTotal</th>
                    <th>Action</th>
                </tr>
              </thead>
              <tbody>
          {cartItems.map((cartItem) => {
             
             const discountedPrice = cartItem.price - cartItem.discount;
            
            return(
              
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
                  <p> Rs. {discountedPrice}</p>
                </div>
              </td>
              <td>
                <div>
                <button type="button" className="btn  btn-rounded" onClick={()=>{addToCart(cartItem)}}>+</button>
                {cartItem.quantity}
                <button type="button" className="btn  btn-rounded" onClick={()=>{removeItem(cartItem)}}>-</button>
                </div>
              </td>
              <td>
                <div>
                Rs. {cartItem.quantity * discountedPrice}
                </div>
              </td>
              <td>
                <div>
                <button className="btn btn-danger btn-rounded" onClick={()=>{delectItem(cartItem.id)}}>Delete</button>
                </div>
              </td>
            </tr>
          
            );
             } )}
            
           
       
              <tr className="justify-content-end">
              
              <td > <div></div></td>
                <td > <div></div></td>
                <td > <div><b>Total Cost:</b></div></td>
                <td > <div>Rs. {Totalprice}</div></td>
                <td><div><button className="btn btn-warning" onClick={() => PlaceOrder()}>CheckOut</button></div></td>
              </tr>
              </tbody>
             </table>   
          
        </div>
      );
   }
export default Cart;



























                            

                           
        
