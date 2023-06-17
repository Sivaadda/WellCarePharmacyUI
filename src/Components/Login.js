import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import validator from 'validator';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    sessionStorage.clear();
  }, []);

  const proceedLoginUsingAPI = (e) => {
    e.preventDefault();
    if (validate()) {
      setIsSubmitting(true);
      let inputobj = { email, password };
      fetch('https://localhost:7108/api/AuthUsers/Login', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(inputobj)
      })
        .then((res) => res.json())
        .then((resp) => {
          console.log(resp);
          if (Object.keys(resp).length === 0) {
            toast.error('Login failed, invalid credentials');
          } else {
            sessionStorage.setItem('email', email);
            sessionStorage.setItem('token', resp.token);
            sessionStorage.setItem('roleId', resp.roleid);
            sessionStorage.setItem('userId', resp.userid);
            if (resp.roleid === 2) {
              navigate("/Users/Home");
              toast.success('Success');
            } else if(resp.roleid === 1) {
              navigate("/Admin/Products");
              toast.success('Success');
            } else{
              toast.error("Inavalid Cradentials")
            }
          }
         
        })
        .catch((err) => {
          toast.error('Login Failed due to Invalid Credentials');
          setIsSubmitting(false);
        });
    }
  };

  const validate = () => {
    let result = true;
    if (email === '' || email === null) {
      result = false;
      toast.warning('Please Enter Email Address');
    } else if (!validator.isEmail(email)) {
      result = false;
      toast.warning('Please Enter a Valid Email Address');
    }
    if (password === '' || password === null) {
      result = false;
      toast.warning('Please Enter Password');
    }
    return result;
  };

  return (
    <section className="vh-100" style={{ backgroundImage: "Url('https://tse2.mm.bing.net/th?id=OIP.Lj8JCkZzwowku6bFAQfiZwHaHa&pid=Api&P=0&h=180')" }}>
      <div className="container h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-lg-12 col-xl-11">
            <div className="card text-black" style={{ borderRadius: '25px' }}>
              <div className="card-body p-md-1">
                <div className="row justify-content-center">
                  <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">

                    <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4 text-primary ">Login</p>

                    <form className="mx-1 mx-md-4 " onSubmit={proceedLoginUsingAPI}>


                      <div className="d-flex flex-row align-items-center mb-4">
                        <div className="form-outline flex-fill mb-0 input-group mb-3">
                          <span className="input-group-text" id="basic-addon1">
                            <img src="https://tse4.mm.bing.net/th?id=OIP.lL-Y1iwd-JCwQMCt2DnESwHaH2&pid=Api&P=0&h=180" height={20} width={20} alt="Email Icon" />
                          </span>
                          <input
                            type="email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            placeholder="Email Address"
                            className="form-control"
                          />
                        </div>
                      </div>

                      <div className="d-flex flex-row align-items-center mb-4">
                        <div className="form-outline flex-fill mb-0 input-group mb-3">
                          <span className="input-group-text" id="basic-addon1">
                            <img src="https://tse3.mm.bing.net/th?id=OIP.Ny8dqSPZjv_iCq46P4dWOQHaId&pid=Api&P=0&h=180" height={20} width={20} alt="Password Icon" />
                          </span>
                          <input
                            type="password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            placeholder="Password"
                            className="form-control"
                          />
                        </div>
                      </div>

                      <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                        <button
                          type="submit"
                          className="btn btn-primary btn-lg"
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? 'Logging In...' : 'Login'}
                        </button>
                      </div>
                      <p>Don't have an account? <Link to={'/Registration'}> Register here</Link></p>
                    </form>

                  </div>
                  <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">

                    <img
                      src="https://img.freepik.com/premium-vector/pharmacy-medical-drugs-medicine-drugstore-healthcare-flat-vector-illustration-banner-background_128772-1931.jpg?size=626&ext=jpg&ga=GA1.2.378484170.1686548611&semt=ais"
                      className="img-fluid"
                      alt="Sample"
                    />

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
