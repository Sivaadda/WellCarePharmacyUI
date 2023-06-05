import AdminHeader from "./AdminHeader";
import { useEffect, useState } from "react";

function Orders(){

  const [orders, getorders] = useState([])

  const getorderslist = () => {
      fetch("https://localhost:7108/api/Orders/GetAllOrders")
      .then((res) => res.json())
      .then((res) => {
          getorders(res)
      })
  }
  
  useEffect(() => {
      getorderslist()
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
                      <p>{order.products.map((product) => { return (<p>{product.productName}</p>)})}</p>
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
             </tr>
         )})}
         
         </tbody>
             </table>
            </div>
    );
}
export default Orders;