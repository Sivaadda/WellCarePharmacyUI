import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Registration = () => {
  const [name, nameChange] =useState("");
  const [email, emailChange] =useState("");
  const [phoneNumber, phoneChange] =useState("");
  const [password, passwordChange] =useState("");

  const navigate = useNavigate();
  const handlesubmit=(e) =>{
    e.preventDefault();
    let regobj = {name,email,phoneNumber,password};
    console.log(regobj);

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
  return (
    <section className="vh-100" style={{ backgroundColor: '#fff' }}>
      <div className="container h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-lg-12 col-xl-11">
            <div className="card text-black" style={{ borderRadius: '25px' }}>
              <div className="card-body p-md-1">
                <div className="row justify-content-center">
                  <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">

                    <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign up</p>

                    <form className="mx-1 mx-md-4" onSubmit={handlesubmit}>

                      <div className="d-flex flex-row align-items-center mb-4">
                        <div className="form-outline flex-fill mb-0">
                        <label className="form-label" >Name</label>
                          <input type="text" required value={name} onChange={e=>nameChange(e.target.value)} className="form-control" />
                        </div>
                      </div>

                      <div className="d-flex flex-row align-items-center mb-4">
                        <div className="form-outline flex-fill mb-0">
                        <label className="form-label">Email Address</label>
                          <input type="email" required value={email} onChange={e=>emailChange(e.target.value)} className="form-control" />
                        </div>
                      </div>

                      <div className="d-flex flex-row align-items-center mb-4">
                        <div className="form-outline flex-fill mb-0">
                        <label className="form-label">Phone Number</label>
                          <input type="tel" value={phoneNumber} onChange={e=>phoneChange(e.target.value)} className="form-control" />
                        </div>
                      </div>

                      <div className="d-flex flex-row align-items-center mb-4">
                        <div className="form-outline flex-fill mb-0">
                        <label className="form-label">Password</label>
                          <input type="password" required value={password} onChange={e=>passwordChange(e.target.value)} className="form-control" />
                        </div>
                      </div>

                      <div className="form-check d-flex justify-content-center mb-5">
                        <input className="form-check-input me-2" type="checkbox" value="" id="form2Example3c" />
                        <label className="form-check-label" >
                          I agree all statements in <a href="#!">Terms of service</a>
                        </label>
                      </div>

                      <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                        <button type="submit" className="btn btn-primary btn-lg">Register</button>
                      </div>

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

export default Registration;
