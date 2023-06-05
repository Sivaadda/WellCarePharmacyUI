import AdminHeader from "./AdminHeader";
import { useEffect, useState } from "react";
function Users(){

    const [users, getusers] = useState([])
    
    useEffect(() => {
      let jwtToken =sessionStorage.getItem('token');
        fetch("https://localhost:7108/api/Users", {headers:{
          'Authorization': 'Value' + jwtToken
        }})
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
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone Number</th>
                    <th>Password</th>
                    <th>Registered on</th>
                </tr>
              </thead>
              <tbody>
         {users.map((user)=>{
           return(
             <tr  key={user.id}>
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
             </tr>
         )})}
         
         </tbody>
             </table>
             </div>
    );
}
export default Users;