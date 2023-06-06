import AdminHeader from "./AdminHeader";
import { useEffect, useState } from "react";
function Users(){

    const [users, getusers] = useState([]);

    const deleteuser = (id) => {
      if(window.confirm("Do you want to delect user?")){
        fetch("https://localhost:7108/api/Users/id?id=" + id,{
          method:"Delete"
        }).then(() => {
          window.location.reload();
        }).catch((err) => {
          console.log(err.message)
        })
      }
    }
    
    useEffect(() => {
      let jwtToken =sessionStorage.getItem('token');
        fetch("https://localhost:7108/api/Users")
        .then((res) =>  res.json())
        .then((res) => {
          console.log(res)
            getusers(res)
        }).catch((error) => {
          console.log(error.message)
        });
    },
     
   [])

    return(
        <div>
             <AdminHeader/>
             <h1>All Users</h1>
             <table className=" container table align-middle mb-0 bg-white  ">
              <thead className="bg-light ">
                <tr>
                    <th>UserId</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone Number</th>
                    <th>Password</th>
                    <th>Registered on</th>
                    <th>Action</th>
                </tr>
              </thead>
              <tbody>
         {users.map((user)=>{
           return(
             <tr  key={user.id}>
              <td>
                 <div>
                     <p>{user.id}</p>
                 </div>
               </td>
               <td>
                 <div>
                     <p>{user.name}</p>
                 </div>
               </td>
               <td>
                 <div>
                    <p>{user.email}</p>
                 </div>
               </td>
               <td>
                 <div >
                     <p>{user.phoneNumber}</p>
                 </div>
               </td>
               <td>
                 <div>
                 <p>{user.password}</p>
                 </div>
               </td>
               <td>
                 <div>
                  <p>{user.registeredOn}</p>
                 </div>
               </td>
               <td>
                 <div>
                 <button type="button" className="btn btn-outline-danger btn-rounded btn-sm" onClick={() => {deleteuser(user.id)}}>Delect</button>
                 </div>
               </td>
             </tr>
         )})}
         
         </tbody>
             </table>
             </div>
    );
}
export default Users;