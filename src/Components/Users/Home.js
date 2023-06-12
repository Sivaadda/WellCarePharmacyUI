import { useEffect } from "react";
import Footer from "./Footer";
import UserHeader from "./UserHeader";
import { useNavigate } from "react-router-dom";


function Home() {
  let userId =sessionStorage.getItem('userId');
  const usenavigate=useNavigate();

  useEffect(() => {
    if(userId===''|| userId===null)
    {
        usenavigate("/");
        
    }
    

}, [])

    return(
        <div>
          <UserHeader/>
          <img src="https://img.freepik.com/free-vector/online-pharmacy-service_107791-2650.jpg?size=626&ext=jpg" alt="home screen" width={980} height={498}/>
          <Footer/>
        </div>
    );
}                               

export default Home;