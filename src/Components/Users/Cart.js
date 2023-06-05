import Footer from "./Footer";
import UserHeader from "./UserHeader";
function Cart(){
       
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
              
             </tbody>
              <tr className="justify-content-end">
              
              <td > <div></div></td>
                <td > <div></div></td>
                <td > <div><b>Total Cost:</b></div></td>
                <td > <div>$</div></td>
                <td><div><button className="btn btn-warning">CheckOut</button></div></td>
              </tr>

             </table>   
          <Footer/>
        </div>
      );
   }
export default Cart;



























                            

                           
        
