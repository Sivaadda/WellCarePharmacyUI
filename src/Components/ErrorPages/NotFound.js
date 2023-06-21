import { useNavigate } from "react-router-dom";

function NotFound(){
    var usenavigate =useNavigate(); 
    const goBack = () => {
     usenavigate("/");
           };
    return(
        <div>
           <div><img src="https://onlinezebra.com/wp-content/uploads/2019/01/error-404-not-found.jpg" width={1000} height={750}></img></div> 
            <button type="submit" className="btn btn-primary" onClick={goBack}>Return to Login Page</button>
        </div>
    );
}
export default NotFound;