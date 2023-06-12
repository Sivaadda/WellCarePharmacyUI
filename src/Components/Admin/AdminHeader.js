import React from 'react';
import logo from "../Images/logo.png"
import cart from "../Images/cart1.png";
import medicine from "../Images/shop.png";
import users from "../Images/users.png";
import {Link} from 'react-router-dom';

function AdminHeader(){
   
        return(
            <div  >
                <header className='d-flex justify-content-evenly bg-dark text-white' >
                    <div className=' col-sm-2 align-self-center'>
                        <span className='p-2'>
                        <Link to='/Admin/Products'>
                            <img src={logo} alt="Logo" width="200" height="55" />
                        </Link>
                        </span>
                    </div>
                  <div className='col-sm-5'></div>
                    <div className=' align-self-center'>
                        <ul className='d-inline-flex nav '>
                            <li className='p-2 nav-item'><Link to="/Admin/Products" className='nav-link text-white'><span><img src={cart} alt="home" width="30" height="29" /> Products</span></Link></li>
                            <li className='p-2 nav-item'><Link to="/Admin/Orders" className='nav-link text-white'><span> <img src={medicine} alt="home" width="18" height="17" /> Orders</span></Link></li>
                            <li className='p-2 nav-item'><Link to="/Admin/Users" className='nav-link text-white'><span><img src={users} alt="home" width="30" height="29" /> Users</span></Link></li>
                        </ul>
                      
                    </div>
                    <div className='col-sm-1 align-self-center'>
                    <button className="btn btn-warning my-2 my-sm-0" type="button"><Link to="/" className='nav-link text-white'><span>Logout</span></Link></button>
                   </div>
                </header> 
            </div>
        );
    }

export default AdminHeader;

