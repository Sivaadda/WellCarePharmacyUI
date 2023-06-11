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
          <img src="https://i1.wp.com/www.quytech.com/blog/wp-content/uploads/2020/01/On-Demand-Medicine-Delivery-App-Development.jpg?resize=1024%2C487&ssl=1" alt="home screen" width="100%" height="100%"/>
          <Footer/>
        </div>
    );
}                               

export default Home;