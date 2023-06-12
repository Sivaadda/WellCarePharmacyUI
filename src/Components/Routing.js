import { BrowserRouter, Routes , Route} from "react-router-dom";
import Home from "./Users/Home.js";
import Registration from "./Registration";
import Login from "./Login";
import { ToastContainer } from "react-toastify";
import Orders from "./Admin/orders.js";
import Products from "./Admin/Products.js";
import Users from "./Admin/users.js";
import Cart from "./Users/Cart.js";
import Shop from "./Users/Shop.js";


function Routing({addToCart,setCartItems, cartItems, delectItem, removeItem}){
    return(
        <div>
            <ToastContainer theme="colored"></ToastContainer>
            <BrowserRouter>
            <Routes>
                <Route path ="/" element={<Login/>}></Route> 
                <Route path ="/Registration" element={<Registration/>}></Route> 
               
                <Route path="/Admin/Orders" element={<Orders/>}></Route>
                <Route path="/Admin/Products" element={<Products/>}></Route>
                <Route path="/Admin/Users" element={<Users/>}></Route>
             
                <Route path="/Users/Home" element={<Home/>}></Route>
                <Route path="/Users/Cart" element={<Cart cartItems={cartItems} setCartItems={setCartItems} addToCart={addToCart} delectItem ={delectItem} removeItem={removeItem}/>}></Route>
                <Route path="/Users/Shop" element={<Shop addToCart={addToCart}/>}></Route>
                
                
            </Routes>
            </BrowserRouter>
        </div>
    );
}
export default Routing;