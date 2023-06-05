import AdminHeader from "./AdminHeader";

function Products(){
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
            
            <div className="d-inline-flex card mt-2 m-3" >
                <div className=" my-3">
                    <img src="https://tse3.mm.bing.net/th?id=OIP.SRwVauzO0gIcmKTmolGicgHaHa&pid=Api&P=0&h=180" alt="product " width="100" height="100"/>
                </div> 
                <div  className="card-body">
                    <div  className="card-title">
                        <p className="">babyproduct</p>
                    </div>
                    <ul className="navbar-nav">
                        <li className="nav-link p-0" ><b>Price:</b> $50</li>
                        <li className="nav-link" >InStock</li>
                    </ul>
                    <div>
                        <button type="button" className="btn btn-outline-warning mx-1 btn-rounded btn-sm">Edit</button>
                        <button type="button" className="btn btn-outline-danger btn-rounded btn-sm">Delect</button>
                    </div>
                </div>
            </div></div>
    );
}
export default Products;