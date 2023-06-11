import AdminHeader from "./AdminHeader";
import React, { useEffect, useState } from "react";
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";

function Products(){

    const [products, getproducts] = useState([])
    const [productName, updatename] = useState("")
    const [price, updateprice] = useState("")
    const [description, updatedescription] = useState("")
    const [imageUrl, updateimage] = useState("")
    const [discount, updatediscount] =useState(0)
    const [status, updatestatus] = useState("InStock")
    const [editProduct, setEditProduct] =useState(null)
    let jwttoken =sessionStorage.getItem('token');
    let userId =sessionStorage.getItem('userId');
    const usenavigate =useNavigate();
    const productadd ={productName,price,description,imageUrl,discount,status};
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
            
        })
          .catch((err) =>{
            console.log(err.message);
            toast.error("Failed to add/update product");
            
        })
    }
    const deleteproduct = (id) => {
        if(window.confirm("Do you want to delect product?")){
          fetch("https://localhost:7108/api/Products/id?id=" + id,{
            method:"Delete"
          }).then(() => {
            window.location.reload();
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
        updatedescription(product.description);
        updatediscount(product.discount);
        updateimage(product.imageUrl);
        updateprice(product.price);
        updatestatus(product.status);
    };

    return(
        <div>
            <AdminHeader/>
            <h3>Add Products</h3>
            <form onSubmit={addproduct}>
                <div className="row col-sm-12 justify-content-center">
                    <div className="col-sm-5">
                    <div className="form-outline  mb-0">
                        <label className="form-label" >Product Name</label>
                          <input type="text" value={productName} onChange={e=>updatename(e.target.value)} className="form-control bg-info p-2 text-dark bg-opacity-10" />
                    </div>
                    <div className="form-outline flex-fill mb-0">
                        <label className="form-label" >Price</label>
                          <input type="decimal" value={price} onChange={e=>updateprice(e.target.value)} className="form-control bg-info p-2 text-dark bg-opacity-10" />
                    </div>
                    <div className="form-outline flex-fill mb-0">
                        <label className="form-label" >Description</label>
                          <input type="text-area" value={description} onChange={e=>updatedescription(e.target.value)} className="form-control bg-info p-2 text-dark bg-opacity-10" />
                    </div>

                    </div>
                    <div className="col-sm-5">
                    <div className="form-outline flex-fill mb-0">
                        <label className="form-label" >Discount</label>
                          <input type="texdecimal" value={discount} onChange={e=>updatediscount(e.target.value)} className="form-control bg-info p-2 text-dark bg-opacity-10" />
                    </div>
                    <div className="form-outline flex-fill mb-0">
                        <label className="form-label" >Status</label>
                          <input type="text" value={status} onChange={e=>updatestatus(e.target.value)}className="form-control bg-info p-2 text-dark bg-opacity-10" />
                    </div>
                    <div className="form-outline flex-fill mb-0">
                        <label className="form-label" >Image Url</label>
                          <input type="text-area" value={imageUrl} onChange={e=>updateimage(e.target.value)} className="form-control bg-info p-2 text-dark bg-opacity-10" />
                    </div>

                    </div>
                    
                </div>
                <div>
                <button className="btn btn-primary my-2 my-sm-3 " type="submit"><span>Add</span></button>
                </div>
            </form>
            <h2> product list</h2>
            <div>
            {products.map((product) => {
                return(
            <div className="d-inline-flex card mt-5 m-3" key={product.id} >
                <div >
                    <img src={product.imageUrl} alt="product " width="100" height="100"/>
                </div> 
                <div  className="card-body">
                    <div  className="card-title">
                        <p> Id: {product.id}</p>
                        <p className="">{product.productName}</p>
                    </div>
                    <ul className="navbar-nav">
                        <li className="nav-link p-0" ><b>Price:</b> ${product.price}</li>
                        <li className="nav-link" >{product.status}</li>
                    </ul>
                    <div>
                        <button type="button" className="btn btn-outline-warning mx-1 btn-rounded btn-sm" onClick={() => {handleEdit(product)}}>Edit</button>
                        <button type="button" className="btn btn-outline-danger btn-rounded btn-sm" onClick={() => {deleteproduct(product.id)}}>Delect</button>
                    </div>
                </div>
            </div> 
            )})}
            </div>
          </div>
    );
                }
export default Products;
