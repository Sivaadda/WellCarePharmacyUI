import AdminHeader from "./AdminHeader";
import React, { useEffect, useState } from "react";
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import useTokenExpiration from "../TokenExpireLogic";

function Products(){
  useTokenExpiration();

    const [products, getproducts] = useState([])
    const [productName, updatename] = useState("")
    const [price, updateprice] = useState("")
    const [descripition, updatedescription] = useState("")
    const [imageUrl, updateimage] = useState("")
    const [discount, updatediscount] =useState(0)
    const [status, updatestatus] = useState("InStock")
    const [editProduct, setEditProduct] =useState(null)
    let jwttoken =sessionStorage.getItem('token');
    let userId =sessionStorage.getItem('userId');
    const usenavigate =useNavigate();
    const productadd ={productName,price,descripition,imageUrl,discount,status};
    const addproduct =(e) => {
        e.preventDefault();
        console.log(productadd);
        const apimethod = editProduct? "PUT" :"POST";
        const apiUrl = editProduct ? 'https://localhost:7108/api/Products/id?id='+ editProduct.id :
        "https://localhost:7108/api/Products/AddProduct";
        fetch(apiUrl, {
            method:apimethod,
            headers:{
              "content-type" : "application/json",
              'Authorization':'bearer ' + jwttoken,
              
            },
            body:JSON.stringify(productadd)
        }).then(res =>{
          res.json()
        })
         .then((data) =>{
                 
                updatename("");
                updatedescription("");
                updatediscount(0);
                updateimage("");
                updateprice("");
                updatestatus("InStock");
                setEditProduct(null);
                toast.success(editProduct? "Product is updated": "Product is added");
                getproductlist();
                document.getElementById("image-input").value = "";
                
                
            
        })
          .catch((err) =>{
            console.log(err.message);
            toast.error("Failed to add/update product");
            
        })
    }
    const deleteproduct = (id) => {
        if(window.confirm("Do you want to delect product?")){
          fetch("https://localhost:7108/api/Products/id?id=" + id,{
            method:"Delete",
            headers:{
              'Authorization':'bearer ' + jwttoken,
            }
          }).then(() => {
            getproductlist();
          }).catch((err) => {
            console.log(err.message)
          })
        }
      }

    
    
    const getproductlist = () => {
       fetch("https://localhost:7108/api/Products/GetAllProducts",{
          headers:{
            'Authorization':'bearer ' + jwttoken,
          }
        })
        .then((res) => res.json())
        .then((res) => {
            console.log(res)
            getproducts(res)
        })
    }
    
    useEffect(() => {
        getproductlist()
        if(userId===''|| userId===null)
        {
            usenavigate("/");
        }
        
       
    }, [])

    const handleEdit =(product) => {
        setEditProduct(product);
        updatename(product.productName);
        updatedescription(product.descripition);
        updatediscount(product.discount);
        updateimage(product.imageUrl);
        updateprice(product.price);
        updatestatus(product.status);
    };

    function converToBase64(e){
      console.log(e);
      var reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload =() =>{
        updateimage(reader.result);
        
        
      };
      reader.onerror = error => {
        console.log("Error:",error);
      };
      
      }
    
    return(
        <div>
            <AdminHeader/>
            <p></p>
            <p></p>
            <h3>Add/Update Product</h3>
          <div className="row">
            <div className="mx-auto col-9 ">
            <form onSubmit={addproduct}  style={{width: "75rem"}} >
                <div className="row col-sm-12 justify-content-center">
                    <div className="col-sm-6">
                    <div className="form-outline  mb-3 input-group mt-4">
                    <span className="input-group-text">Product Name</span>
                    <input type="text" value={productName} onChange={e=>updatename(e.target.value)} className="form-control bg-info p-2 text-dark bg-opacity-10" />
                    </div>
                    <div className="form-outline flex-fill mb-3 input-group mb-0">
                          <span className="input-group-text">Price</span>
                          <input type="decimal" value={price} onChange={e=>updateprice(e.target.value)} className="form-control bg-info p-2 text-dark bg-opacity-10" />
                          <span className="input-group-text">.00</span>
                    </div>
                    <div className="form-outline flex-fill mb-3 input-group mb-3">
                    <span className="input-group-text">Descripition</span>
                          <input type="text-area" value={descripition} onChange={e=>updatedescription(e.target.value)} className="form-control bg-info p-2 text-dark bg-opacity-10" />
                    </div>

                    </div>
                    <div className="col-sm-6">
                    <div className="form-outline flex-fill mb-3 input-group mt-4">
                    <span className="input-group-text">Discount Amount</span>
                          <input type="texdecimal" value={discount} onChange={e=>updatediscount(e.target.value)} className="form-control bg-info p-2 text-dark bg-opacity-10" />
                          <span className="input-group-text">.00</span>
                    </div>
                    <div className="form-outline flex-fill mb-3 input-group mb-3">
                    <span className="input-group-text">Status</span>
                          <input type="text" value={status} onChange={e=>updatestatus(e.target.value)}className="form-control bg-info p-2 text-dark bg-opacity-10" />
                    </div>
                    <div className="form-outline flex-fill mb-3 input-group mb-3">
                        
                          <input type="file" accept="image/*"onChange={converToBase64} id="image-input" className="form-control bg-info p-2 text-dark bg-opacity-10" />
                          <span className="input-group-text">Upload Image</span>
                    </div>

                    </div>
                    
                </div>
                <div>
                <button className="btn btn-primary my-0 my-sm-3 " type="submit"><span>Add/Update</span></button>
                </div>
            </form>
            </div>
            </div>
            
           
            <div>
            {products.map((product) => {
               const discountPercentage = (product.discount / product.price) * 100;
               const discountedPrice = product.price - product.discount;
                return(
                
            <div className="d-inline-flex card mt-5 m-2 shadow" key={product.id} style={{width: "15rem", height:"27rem"}} >
                <div  >
                    <img src={product.imageUrl} alt="product " width="100" height="100"/>
                </div> 
                <div  className="card-body">
                    <div  className="card-title">
                        <p> <b>Id:</b> {product.id}</p>
                        <p className="">{product.productName}</p>
                    </div>
                    <ul className="navbar-nav">
                        <li className="nav-link p-0" ><b>Price:</b> Rs. {discountedPrice}  <sup> <del>  Rs.{product.price} </del> </sup></li>
                        <li className="card-text"><b>Discount:</b> {discountPercentage.toFixed(0)}% off</li>
                        <li className="nav-link" >{product.status}</li>
                        <li className="nav-link" >{product.descripition}</li>
                    </ul>
                    <div>
                      
                        <button type="button" className="btn btn-outline-warning mx-1 btn-rounded btn-sm" onClick={() => {handleEdit(product)}}>Edit</button>
                        <button type="button" className="btn btn-outline-danger btn-rounded btn-sm" onClick={() => {deleteproduct(product.id)}}>Delete</button>
                    </div>
                </div>
            </div> 
           
            )})}
            </div>
          </div>
    );
                }
export default Products;
