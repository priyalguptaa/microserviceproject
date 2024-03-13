import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { API_BASE_URL_Reg } from "../HomeComponent/apiConfig";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (formData.email.trim() && formData.password.trim()) {
      try {
        const response = await axios.post(`${API_BASE_URL_Reg}/admin/user/login`, formData);
  
        if (response.status === 200) {
          const uId = response.data.response.uid;
          localStorage.setItem("uId", uId);
          navigate("/homepage"); 
        }
      } catch (error) {
        if (error.response && error.response.status === 401) {
          toast.error("Invalid email or password. Please try again.");
        } 
      }
    } else {
      toast.error("Please fill in both email and password fields");
    }
  };
   

  const handleRegistration = () => {
    navigate("/signup");
  };

  return (
    <section className="vh-100">
      <div className="container py-5 h-100">
        <div className="row d-flex align-items-center justify-content-center h-100">
          <div className="col-md-8 col-lg-7 col-xl-6">
            <img
              src="https://jurnal.iicet.org/plugins/themes/titanTheme/images/login.webp"
              className="img-fluid"
              alt="Phone image"
            />
          </div>
          <div className="col-md-7 col-lg-5 col-xl-5 offset-xl-1">
            <form onSubmit={handleSubmit}>
              <div className="form-outline mb-4">
                <input
                  type="email"
                  id="form1Example13"
                  className="form-control form-control-lg"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                />
                <label className="form-label" htmlFor="form1Example13">
                  Email address
                </label>
              </div>
              <div className="form-outline mb-4">
                <input
                  type="password"
                  id="form1Example23"
                  className="form-control form-control-lg"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                />
                <label className="form-label" htmlFor="form1Example23">
                  Password
                </label>
              </div>
              <div className="d-flex justify-content-around align-items-center mb-4">
                <a href="#!">Forgot password?</a>
              </div>
              <button
                type="submit"
                className="btn btn-primary btn-lg btn-block"
              >
                Sign in
              </button>
              <button
                type="button"
                className="btn btn-secondary btn-lg btn-block"
                style={{ marginLeft: "339px" }}
                onClick={handleRegistration}
              >
                Register
              </button>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer />
    </section>
  );
};

export default Login;
