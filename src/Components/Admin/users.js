import AdminHeader from "./AdminHeader";
function Users(){
    return(
        <div>
             <AdminHeader/>
             <h1>All Users</h1>
             <table className=" container table align-middle mb-0 bg-white  ">
              <thead className="bg-light ">
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone Number</th>
                    <th>Password</th>
                    <th>Registered on</th>
                </tr>
              </thead>
             <tbody>

             </tbody>
             </table>
             </div>
    );
}
export default Users;