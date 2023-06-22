import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import validator from 'validator';

const Registration = () => {
  const [name, nameChange] =useState("");
  const [email, emailChange] =useState("");
  const [phoneNumber, phoneChange] =useState("");
  const [password, passwordChange] =useState("");

  const validate = () => {
    let isValid = true;
  
    if (name.trim() === '') {
      isValid = false;
      toast.warning('Please enter your full name.');
    }
  
    if (email.trim() === '') {
      isValid = false;
      toast.warning('Please enter your email address.');
    } else if (!validator.isEmail(email)) {
      isValid = false;
      toast.warning('Please enter a valid email address.');
    }
  
    if (phoneNumber.trim() === '') {
      isValid = false;
      toast.warning('Please enter your phone number.');
    } else if (!validator.isLength(phoneNumber, { max: 10, min:10})) {
      isValid = false;
      toast.warning('Phone number should be 10 characters.');
    }
  
    if (password.trim() === '') {
      isValid = false;
      toast.warning('Please enter a password.');
    } else if (!validator.isLength(password, { max: 20, min:8 })) {
      isValid = false;
      toast.warning('Password should be above 8 and not exceed 20  characters.');
    }
  
    return isValid;
  };
  
  const navigate = useNavigate();
  const handlesubmit=(e) =>{
    e.preventDefault();
    let regobj = {name,email,phoneNumber,password};
    console.log(regobj);
    if (validate()) {
    fetch("https://localhost:7108/api/AuthUsers/Registration", {
      method:"POST",
      headers:{'content-type':'application/json'},
      body:JSON.stringify(regobj)
    }).then((res)=>{
        toast.success("Registered successfully.")
        navigate("/");
    }).catch((err)=>{
        toast.error("Failed: " +err.messsage);
    });
  }
  }
  return (
    <section className="vh-100" style={{ backgroundImage :"url('https://hrharvestride.com/wp-content/uploads/2019/01/medical-background-with-loop_n26ve-_yg__f0005-medical.jpg')" }}>
      <div className="container h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-lg-12 col-xl-11">
            <div className="card text-black" style={{ borderRadius: '25px' }}>
              <div className="card-body p-md-1">
                <div className="row justify-content-center">
                  <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">

                    <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4 text-primary ">Sign up</p>

                    <form className="mx-1 mx-md-4" onSubmit={handlesubmit}>

                      <div className="d-flex flex-row align-items-center mb-4">
                        <div className="form-outline flex-fill mb-0 input-group mb-3">
                        <span className="input-group-text" id="basic-addon1"><img alt="usericon" src= "https://tse4.mm.bing.net/th?id=OIP.bu3vuymRYBLWGMSR-pGtlAHaHa&pid=Api&P=0&h=180" height={20} width={20}></img></span>
                          <input type="text" value={name} onChange={e=>nameChange(e.target.value)}  placeholder="Full Name"  className="form-control" />
                        </div>
                      </div>

                      <div className="d-flex flex-row align-items mb-4 ">
                        <div className="form-outline flex-fill mb-0 input-group mb-3">
                        <span className="input-group-text" id="basic-addon1"><img alt="emailicon" src= "https://tse4.mm.bing.net/th?id=OIP.lL-Y1iwd-JCwQMCt2DnESwHaH2&pid=Api&P=0&h=180" height={20} width={20}></img></span>
                          <input type="email" value={email} onChange={e=>emailChange(e.target.value)}  placeholder="Email Address" className="form-control" />
                        </div>
                      </div>


                      <div className="d-flex flex-row align-items-center mb-4">
                        <div className="form-outline flex-fill mb-0 input-group mb-3">
                        <span className="input-group-text" id="basic-addon1"><img alt="phoneicon" src= "https://tse4.mm.bing.net/th?id=OIP.i82JBZUtdkCVKGVI0408bwHaHb&pid=Api&P=0&h=180" height={20} width={20}></img></span>
                          <input type="tel" value={phoneNumber} pattern="[0-9]{10}" onChange={e=>phoneChange(e.target.value)}  placeholder="Phone Number"  className="form-control" />
                        </div>
                      </div>

                      <div className="d-flex flex-row align-items-center mb-4">
                        <div className="form-outline flex-fill mb-0 input-group mb-3">
                        <span className="input-group-text" id="basic-addon1"><img alt="passwordicon" src= "https://tse3.mm.bing.net/th?id=OIP.Ny8dqSPZjv_iCq46P4dWOQHaId&pid=Api&P=0&h=180" height={20} width={20}></img></span>
                          <input type="password"value={password} onChange={e=>passwordChange(e.target.value)}  placeholder="Password"  className="form-control" />
                        </div>
                      </div>
                      <div className="form-check d-flex justify-content-center mb-5">
                        <label className="form-check-label" >
                          Already have an account ? <Link to='/'>Login here</Link>
                        </label>
                      </div>
                      <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                        <button type="submit" className="btn btn-primary btn-lg">Register</button>
                      </div>

                    </form>

                  </div>
                  <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">

                    <img src="https://img.freepik.com/premium-vector/pharmacy-medical-drugs-medicine-drugstore-healthcare-flat-vector-illustration-banner-background_128772-1931.jpg?size=626&ext=jpg&ga=GA1.2.378484170.1686548611&semt=ais"
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

export default Registration;
