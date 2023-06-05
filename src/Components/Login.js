import {useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Login = () => {
  const[email, emailAddresschange] =useState("");
  const[password, passwordlchange] =useState("");

  const usenavigate=useNavigate();

  useEffect(()=>{
    sessionStorage.clear();
  },[]);

  const ProceedLoginusingAPI = (e) => {
    e.preventDefault();
    if (validate()) {
        let inputobj={email,password};
        fetch('https://localhost:7108/api/AuthUsers/Login',{
            method:'POST',
            headers:{'content-type':'application/json'},
            body:JSON.stringify(inputobj)
        }).then((res) => {
           return res.json()
        }).then((resp) => {
            console.log(resp)
            if (Object.keys(resp).length === 0) {
              toast.error('Login failed, invalid credentials');
          }else{
               toast.success('Success');
               sessionStorage.setItem('email',email);
               sessionStorage.setItem('token',resp.token);
               sessionStorage.setItem('roleId',resp.roleid);
             if(resp.roleid === 2)
             {
              usenavigate("/Users/Home");
             }else{
              usenavigate("/Admin/Products");
             }
             
          }
           
        }).catch((err) => {
            toast.error('Login Failed due to :' + err.message);
        });
    }
}
const validate = () => {
    let result = true;
    if (email === '' || email === null) {
        result = false;
        toast.warning('Please Enter emailAddress');
    }
    if (password === '' || password === null) {
        result = false;
        toast.warning('Please Enter Password');
    }
    return result;
}

  return (
    <section className="vh-100" style={{ backgroundColor: '#fff' }}>
      <div className="container h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-lg-12 col-xl-11">
            <div className="card text-black" style={{ borderRadius: '25px' }}>
              <div className="card-body p-md-1">
                <div className="row justify-content-center">
                  <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">

                    <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Login</p>

                    <form className="mx-1 mx-md-4 " onSubmit={ProceedLoginusingAPI}>

                    
                      <div className="d-flex flex-row align-items-center mb-4">
                        <div className="form-outline flex-fill mb-0">
                        <label className="form-label">Email Address</label>
                          <input type="email" value ={email} onChange={e => emailAddresschange(e.target.value)}  className="form-control" />
                        </div>
                      </div>

                      <div className="d-flex flex-row align-items-center mb-4">
                        <div className="form-outline flex-fill mb-0">
                        <label className="form-label">Password</label>
                          <input type="password" value ={password} onChange={e => passwordlchange(e.target.value)}className="form-control" />
                        </div>
                      </div>

                      <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                        <button type="submit" className="btn btn-primary btn-lg">Login</button>
                        </div>
                     <p>Don't have an account? <Link  to={'/Registration'}> Register here</Link></p>
                    </form>

                  </div>
                  <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">

                    <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                      className="img-fluid" alt="Sample" />

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;