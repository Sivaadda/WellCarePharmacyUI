import Footer from "./Footer";
import UserHeader from "./UserHeader";
function Shop(){

    return(
        <div>
            <UserHeader/>
            <div className="d-inline-flex card mt-5 m-3" >
                <div >
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
                        <button type="button" className="btn btn-outline-info btn-rounded btn-sm">Add to Cart</button>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>              
    );
}
export default Shop;