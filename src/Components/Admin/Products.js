import AdminHeader from "./AdminHeader";
import { useEffect, useState } from "react";

function Products(){

    const [products, getproducts] = useState([])

    const getproductlist = () => {
        fetch("https://localhost:7108/api/Products/GetAllProducts")
        .then((res) => res.json())
        .then((res) => {
            getproducts(res)
        })
    }
    
    useEffect(() => {
        getproductlist()
    }, [])


    return(
        <div>
            <AdminHeader/>
            <h3>Add Products</h3>
            <form>
                <div className="row col-sm-12 justify-content-center">
                    <div className="col-sm-5">
                    <div className="form-outline  mb-0">
                        <label className="form-label" >Product Name</label>
                          <input type="text" className="form-control bg-info p-2 text-dark bg-opacity-10" />
                    </div>
                    <div className="form-outline flex-fill mb-0">
                        <label className="form-label" >Price</label>
                          <input type="decimal" className="form-control bg-info p-2 text-dark bg-opacity-10" />
                    </div>
                    <div className="form-outline flex-fill mb-0">
                        <label className="form-label" >Description</label>
                          <input type="text-area" className="form-control bg-info p-2 text-dark bg-opacity-10" />
                    </div>

                    </div>
                    <div className="col-sm-5">
                    <div className="form-outline flex-fill mb-0">
                        <label className="form-label" >Discount</label>
                          <input type="texdecimal" className="form-control bg-info p-2 text-dark bg-opacity-10" />
                    </div>
                    <div className="form-outline flex-fill mb-0">
                        <label className="form-label" >Status</label>
                          <input type="text" className="form-control bg-info p-2 text-dark bg-opacity-10" />
                    </div>
                    <div className="form-outline flex-fill mb-0">
                        <label className="form-label" >Image Url</label>
                          <input type="text-area" className="form-control bg-info p-2 text-dark bg-opacity-10" />
                    </div>

                    </div>
                    
                </div>
                <div>
                <button class="btn btn-primary my-2 my-sm-3 " type="button"><span>Add</span></button>
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
                        <p className="">{product.productName}</p>
                    </div>
                    <ul className="navbar-nav">
                        <li className="nav-link p-0" ><b>Price:</b> ${product.price}</li>
                        <li className="nav-link" >{product.status}</li>
                    </ul>
                    <div>
                        <button type="button" className="btn btn-outline-warning mx-1 btn-rounded btn-sm">Edit</button>
                        <button type="button" className="btn btn-outline-danger btn-rounded btn-sm">Delect</button>
                    </div>
                </div>
            </div> 
            )})}
            </div>
          </div>
    );
}
export default Products;
