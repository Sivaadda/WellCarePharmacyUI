import AdminHeader from "./AdminHeader";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Orders(){

  const [orders, getorders] = useState([])

  let userId =sessionStorage.getItem('userId');
  const usenavigate =useNavigate();

  const deleteorder = (id) => {
    if(window.confirm("Do you want to delect order?")){
      fetch("https://localhost:7108/api/Orders/id?id=" + id,{
        method:"Delete"
      }).then(() => {
        window.location.reload();
      }).catch((err) => {
        console.log(err.message)
      })
    }
  }
  

  const getorderslist = () => {
      fetch("https://localhost:7108/api/Orders/GetAllOrders")
      .then((res) => res.json())
      .then((res) => {
          getorders(res)
      })
  }
  
  useEffect(() => {
      getorderslist()
      if(userId===''|| userId===null)
      {
          usenavigate("/");
      }
  }, [])
    return(
        <div>
            <AdminHeader/>
            <h1>All Orders</h1>
            <table className=" container table align-middle mb-0 bg-white  ">
              <thead className="bg-light ">
                <tr>
                    <th>Order Id</th>
                    <th>User Id</th>
                    <th>Product Id</th>
                    <th>Quantity</th>
                    <th>Total Price</th>
                    <th>Action</th>
                </tr>
              </thead>
              <tbody>
         {orders.map((order)=>{
           return(
             <tr  key={order.id}>
               <td>
                 <div>
                     <p>{order.id}</p>
                 </div>
               </td>
               <td>
                 <div>
                    <p>{order.users.name}</p>
                 </div>
               </td>
               <td>
                 <div >
                      <div>{order.products.map((product) => { return (<div key={product.id}>{product.productName}</div>)})}</div>
                 </div>
               </td>
               <td>
                 <div>
                  <p>{order.quantity}</p>
                 </div>
               </td>
               <td>
                 <div>
                  <p>{order.totalPrice}</p>
                 </div>
               </td>
               <td>
                 <div>
                 <button type="button" className="btn btn-outline-danger btn-rounded btn-sm" onClick={() => {deleteorder(order.id)}}>Delect</button> <span> </span>
                 <button type="button" className="btn btn-outline-success btn-rounded btn-sm" onClick={() => {getorderslist(order.users.id)}}>User Details</button>  <span> </span>
                 <button type="button" className="btn btn-outline-primary btn-rounded btn-sm" onClick={() => {getorderslist(order.products)}}>Product Details</button>
                 </div>
               </td>
             </tr>
         )})}
         
         </tbody>
             </table>
            </div>
    );
}
export default Orders;