import AdminHeader from "./AdminHeader";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useTokenExpiration from "../TokenExpireLogic";
function Users(){
  useTokenExpiration();
  

    let jwttoken =sessionStorage.getItem('token');
    const [users, getusers] = useState([]);
    const usenavigate=useNavigate();
    const userId = sessionStorage.getItem('userId');
    
    const deleteuser = (id) => {
      if(window.confirm("Do you want to delect user?")){
        fetch("https://localhost:7108/api/Users/id?id=" + id,{
          method:"Delete",
            headers:{
              'Authorization':'bearer ' + jwttoken,
            }
        }).then(() => {
          window.location.reload();
        }).catch((err) => {
          console.log(err.message)
          usenavigate("/500Servererror");
        })
      }
    }
    
    const formatDate = (dateString) => {
      const date = new Date(dateString);
      return date.toLocaleDateString(); // Change the date format as needed
    };
    useEffect(() => {

      if(userId===''|| userId===null)
      {
          usenavigate("/");
      }
      
      let jwttoken =sessionStorage.getItem('token');
        fetch("https://localhost:7108/api/Users",{
          headers:{
            'Authorization':'bearer ' + jwttoken,
          }
        })
        .then((res) =>  res.json())
        .then((res) => {
          console.log(res)
            getusers(res)
        }).catch((error) => {
          console.log(error.message)
          usenavigate("/500Servererror");
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
                  <p>{formatDate (user.registeredOn)}</p>
                 </div>
               </td>
               <td>
                 <div>
                 <button type="button" className="btn btn-outline-danger btn-rounded btn-sm" onClick={() => {deleteuser(user.id)}}>Delete</button>
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