import AdminHeader from "./AdminHeader";

function Orders(){
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

             </tbody>
             </table>
            </div>
    );
}
export default Orders;