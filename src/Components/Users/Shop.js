import { useEffect, useState } from "react";
import Footer from "./Footer";
import UserHeader from "./UserHeader";
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import useTokenExpiration from "../TokenExpireLogic";
function Shop({addToCart}){
  useTokenExpiration();
    const [products, getproducts] = useState([])
    const [product,getproduct] = useState([])
    const discountPercentage = (product.discount / product.price) * 100;
    const discountedPrice = product.price - product.discount;
                
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
            const inStockProducts = res.filter((product) => product.status === "InStock");
            getproducts(inStockProducts);
            console.log(res);
        }).catch((err) =>{
       
            console.log(err.message);
            
    })
}

const getproductbyId = (id) => {
    
    fetch("https://localhost:7108/api/Products/id?id=" + id,{
      headers:{
        'Authorization':'bearer ' + jwttoken,
      }
    }).then((res) => {
     return res.json()
    }).then((res) => {
        getproduct(res)
    }).catch((err) => {
      console.log(err.message)
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
                const discountPercentage = (product.discount / product.price) * 100;
                const discountedPrice = product.price - product.discount;
                return(
                    <div className="d-inline-flex card mt-5 m-3" >
                    <div class="card shadow" style={{width: "14rem", height:"20rem"}}>
                    <div >
                    <a type="button" onClick={() =>getproductbyId(product.id)} data-bs-toggle="modal" data-bs-target="#exampleModal" >
                        <img src={product.imageUrl} alt="product " width="100" height="100"/>
                    </a>
                    
                </div> 
                    <div class="card-body">
                      <h6 class="card-title">{product.productName}</h6>
                    </div>
                    <ul class="list-group list-group-flush">
                      <li class="list-group-item"><b>Price:</b> Rs. {discountedPrice}  <sup> <del>  Rs.{product.price} </del> </sup></li>
                      <li class="list-group-item"><b>Discount:</b> {discountPercentage.toFixed(1)}% off</li>
                    </ul>
                    <div class="card-body">
                    <button type="button" className="btn btn-outline-info btn-rounded btn-sm" onClick={() => addToCart( product )}
                          >Add to Cart</button>
                    </div>
                  </div>
                  </div>
            )})}




<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="exampleModalLabel">{product.productName}</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
      <div class=" mb-3" style={{maxWidth: "540px"}}>
  <div class="row g-0">
    <div class="col-md-4">
      <img src={product.imageUrl} class="img-fluid rounded-start" alt="..."/>
    </div>
    <div class="col-md-8">
      <div class="card-body">
        
    <p   style={{width: "18rem"}} class="card-text text-center">{product.descripition}</p>
        <p class="card-text"><b>Price:</b> Rs. {product.price}</p>
        <p class="card-text"><b>Discount:</b> Rs. {product.discount} ({discountPercentage.toFixed(2)}% off)</p>
          <p class="card-text"><b>Discounted Price:</b> Rs. {discountedPrice}</p>
      </div>
    </div>
  </div>
</div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
      </div>
    </div>
  </div>
</div>
          
        </div>              
    );
}
export default Shop;