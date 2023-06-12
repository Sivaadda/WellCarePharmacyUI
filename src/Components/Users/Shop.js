import { useEffect, useState } from "react";
import Footer from "./Footer";
import UserHeader from "./UserHeader";
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
function Shop({addToCart}){
    const [products, getproducts] = useState([])

                
    let userId =sessionStorage.getItem('userId');
    const usenavigate=useNavigate();
    
    let jwttoken =sessionStorage.getItem('token');
    
    const getproductlist = () => {
        fetch("https://localhost:7108/api/Products/GetAllProducts", {
            headers:{
                'Authorization':'bearer ' + jwttoken,
            }
        })
        .then((res) => res.json())
        .then((res) => {
            getproducts(res)
        }).catch((err) =>{
       
            console.log(err.message);
            
    })
}
    useEffect(() => {
        getproductlist()
        if(userId===''|| userId===null)
        {
            usenavigate("/");
            toast.error("Failed to login");
        }
        

    }, [])

    return(
        <div>
            <UserHeader/>

            {products.map((product) => {
                return(
            <div className="d-inline-flex card mt-5 m-3" key={product.id} >
                <div >
                    <img src={product.imageUrl} alt="product " width="100" height="100"/>
                </div> 
                <div  className="card-body">
                    <div  className="card-title">
                        <p className="">{product.productName}</p>
                    </div>
                    <ul className="navbar-nav">
                        <li className="nav-link p-0" ><b>Price:</b> Rs {product.price}</li>
                        <li className="nav-link" >{product.status}</li>
                    </ul>
                    <div>
                        <button type="button" className="btn btn-outline-info btn-rounded btn-sm" onClick={() => addToCart(product)}
                          >Add to Cart</button>
                    </div>
                </div>
            </div> 
            )})}
            <Footer/>
        </div>              
    );
}
export default Shop;