import AdminHeader from "./AdminHeader";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Orders(){
  let jwttoken =sessionStorage.getItem('token');
  const [orders, getorders] = useState([]);
  const [getuser, setgetuser] = useState([]);
  const [product, getproducts] = useState([])

  let userId =sessionStorage.getItem('userId');
  const usenavigate =useNavigate();

  const deleteorder = (id) => {
    if(window.confirm("Do you want to delect order?")){
      fetch("https://localhost:7108/api/Orders/id?id=" + id,{
        method:"Delete",
        headers:{
          'Authorization':'bearer ' + jwttoken,
        }
      }).then(() => {
        window.location.reload();
      }).catch((err) => {
        console.log(err.message)
      })
    }
  }

  
    const getproductbyId = (id) => {
    
      fetch("https://localhost:7108/api/Orders/id?id=" + id,{
        headers:{
          'Authorization':'bearer ' + jwttoken,
        }
      }).then((res) => {
       return res.json()
      }).then((res) => {
        
          setgetuser(res.users)
          getproducts(res.productOrders);
          
          
         
      }).catch((err) => {
        console.log(err.message)
      })
    }
  
   

  const getorderslist = () => {
      fetch("https://localhost:7108/api/Orders/GetAllOrders", {
        headers:{
          'Authorization':'bearer ' + jwttoken,
        }
      })
      .then((res) => res.json())
      .then((res) => {
          getorders(res)
          console.log(res)
      })
  }
  
  useEffect(() => {
    getorderslist()
      if(userId===''|| userId===null)
      {
          usenavigate("/");
      }
  }, [userId, usenavigate])
    return(
        <div>
            <AdminHeader/>
            <h1>All Orders</h1>
            <table className=" container table align-middle mb-0 bg-white  ">
              <thead className="bg-light ">
                <tr>
                    <th>Order Id</th>
                    <th>User Name</th>
                    <th>Quantity</th>
                    <th>Total Price</th>
                    <th>Action</th>
                </tr>
              </thead>
              <tbody>
         {orders.map((order)=>{
           return(
             <tr  key={order.id} >
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
                 <div>
                  <p>{order.totalQuantity}</p>
                 </div>
               </td>
               
               <td>
                 <div>
                  <p>Rs. {order.totalPrice}</p>
                 </div>
               </td>
               <td>
                 <div>
                 <button type="button" className="btn btn-outline-danger btn-rounded btn-sm" onClick={() => {deleteorder(order.id)}}>Delete</button> <span> </span>
                 <button type="button" className="btn btn-outline-success btn-rounded btn-sm"  data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => {getproductbyId(order.id)}}>User Details</button>  <span> </span>
                 <button type="button" className="btn btn-outline-primary btn-rounded btn-sm" data-bs-toggle="modal" data-bs-target="#exampleModal2" onClick={() => {getproductbyId(order.id)}}>Product Details</button>
                 </div>
               </td>
             </tr>
         )})}
         
         </tbody>
             </table>

             

<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="exampleModalLabel">User Details</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <table class="table">
          <tbody >
            <tr >
              <th>Id</th>
              <td>{getuser.id}</td>
            </tr>
            <tr>
              <th>Name</th>
              <td>{getuser.name}</td>
            </tr>
            <tr>
              <th>Email Address</th>
              <td>{getuser.email}</td>
            </tr>
            <tr>
              <th>Phone Number</th>
              <td>{getuser.phoneNumber}</td>
            </tr>
          </tbody>
        </table> 
      </div>
      <div >
        <button type="button" class="btn btn-secondary mb-3" data-bs-dismiss="modal">Close</button>
      </div>
    </div>
  </div>
</div>


<div class="modal fade" id="exampleModal2" tabindex="-1" aria-labelledby="exampleModalLabel2" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="exampleModalLabel">Products Details</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
      <table class="table table-hover">
  <thead>
    <tr>
      <th scope="col">S.No</th>
      <th scope="col">Product Name</th>
      <th scope="col">Price</th>
      <th scope="col">Quantity</th>

     
   
    </tr>
  </thead>
  
  {product.map((p) => {return(
     
      <tbody>
          <tr key={p.productId}>
          <td>{p.productId}</td>
          <td>{p.product.productName}</td>
          <td>{p.product.price}</td>

<td>{p.quantity}</td>
</tr>
    </tbody>

    
  );})}
   
   
    
  
</table>
      </div>
      <div >
        <button type="button" class="btn btn-secondary mb-3" data-bs-dismiss="modal">Close</button>
      </div>
    </div>
  </div>
</div>
</div>
          
    );
}
export default Orders;





