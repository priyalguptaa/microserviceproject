// SignUp.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import UpdateDetails from '../HomeComponent/UpdateDetails';
import { API_BASE_URL_Reg } from '../HomeComponent/apiConfig';

const SignUp = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    cno: '',
    address: '',
    agreeTerms: false,
  });

  const [registered, setRegistered] = useState(false);
  const [uid, setUid] = useState(null); // Define uid state variable

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleInputChangeForContact = (e) => {
    const { name, value } = e.target;
  
    // Use regular expression to remove non-numeric characters
    const numericValue = value.replace(/\D/g, '');
  
    setFormData((prevState) => ({
      ...prevState,
      [name]: numericValue,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      toast.error('Password and Confirm Password do not match');
      return;
    }

    if (Object.values(formData).some((field) => field === '') || !formData.agreeTerms) {
      toast.error('Please fill all required fields and agree to terms');
      return;
    }

    try {
      const response = await axios.post(`${API_BASE_URL_Reg}/admin/user`, formData);

      if (response.status === 200) {
        const { uid } = response.data;
        setRegistered(true);
        toast.success('Registered Successfully!');
        setFormData({
          name: '',
          email: '',
          password: '',
          confirmPassword: '',
          cno: '',
          address: '',
          agreeTerms: false,
        });
        setUid(uid); // Set uid state variable
      }
    } catch (error) {
      console.error('Error occurred:', error);
      toast.error('An error occurred. Please try again.');
    }
  };

  const handleLoginClick = () => {
    navigate('/login');
  };

  return (
    <section className="vh-100" style={{ backgroundColor: '#eee' }}>
      <div className="container h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-lg-12 col-xl-11">
            <div className="card text-black" style={{ borderRadius: '25px' }}>
              <div className="card-body p-md-5">
                <div className="row justify-content-center">
                  <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                    <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                      Hostel Management Sign up
                    </p>
                    <form className="mx-1 mx-md-4" onSubmit={handleSubmit}>
                          <div className="d-flex flex-row align-items-center mb-4">
                            <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                            <div className="form-outline flex-fill mb-0">
                              <input
                                type="text"
                                id="formHostelName"
                                name="name"
                                className="form-control"
                                value={formData.name}
                                onChange={handleInputChange}
                              />
                              <label
                                className="form-label"
                                htmlFor="formHostelName"
                              >
                                Name
                              </label>
                            </div>
                          </div>
                          <div className="d-flex flex-row align-items-center mb-4">
                            <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                            <div className="form-outline flex-fill mb-0">
                              <input
                                type="email"
                                id="formHostelEmail"
                                name="email"
                                className="form-control"
                                value={formData.email}
                                onChange={handleInputChange}
                              />
                              <label
                                className="form-label"
                                htmlFor="formHostelEmail"
                              >
                                Email
                              </label>
                            </div>
                          </div>
                          <div className="d-flex flex-row align-items-center mb-4">
                            <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                            <div className="form-outline flex-fill mb-0">
                              <input
                                type="password"
                                id="formHostelPassword"
                                name="password"
                                className="form-control"
                                value={formData.password}
                                onChange={handleInputChange}
                              />
                              <label
                                className="form-label"
                                htmlFor="formHostelPassword"
                              >
                                Password
                              </label>
                            </div>
                          </div>
                          <div className="d-flex flex-row align-items-center mb-4">
                            <i className="fas fa-key fa-lg me-3 fa-fw"></i>
                            <div className="form-outline flex-fill mb-0">
                              <input
                                type="password"
                                id="formHostelConfirmPassword"
                                name="confirmPassword"
                                className="form-control"
                                value={formData.confirmPassword}
                                onChange={handleInputChange}
                              />
                              <label
                                className="form-label"
                                htmlFor="formHostelConfirmPassword"
                              >
                                Confirm Password
                              </label>
                            </div>
                          </div>
                          <div className="d-flex flex-row align-items-center mb-4">
                            <i className="fas fa-phone fa-lg me-3 fa-fw"></i>
                            <div className="form-outline flex-fill mb-0">
                              <input
                                type="text"
                                id="formHostelContact"
                                name="cno"
                                className="form-control"
                                value={formData.cno}
                                onChange={handleInputChangeForContact}
                              />
                              <label
                                className="form-label"
                                htmlFor="formHostelContact"
                              >
                                Contact
                              </label>
                            </div>
                          </div>
                          <div className="d-flex flex-row align-items-center mb-4">
                            <i className="fas fa-map-marker-alt fa-lg me-3 fa-fw"></i>
                            <div className="form-outline flex-fill mb-0">
                              <input
                                type="text"
                                id="formHostelAddress"
                                name="address"
                                className="form-control"
                                value={formData.address}
                                onChange={handleInputChange}
                              />
                              <label
                                className="form-label"
                                htmlFor="formHostelAddress"
                              >
                                Address
                              </label>
                            </div>
                          </div>
                          <div className="form-check d-flex justify-content-center mb-5">
                            <input
                              className="form-check-input me-2"
                              type="checkbox"
                              id="formHostelAgreeTerms"
                              name="agreeTerms"
                              checked={formData.agreeTerms}
                              onChange={handleInputChange}
                            />
                            <label
                              className="form-check-label"
                              htmlFor="formHostelAgreeTerms"
                            >
                              I agree to all statements in{" "}
                              <a href="#!">Terms of service</a>
                            </label>
                          </div>
                      <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                        <button
                          type="submit"
                          className="btn btn-primary btn-lg"
                        >
                          Register
                        </button>
                      </div>
                      {/* Login button */}
                      <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                        <button
                          type="button"
                          className="btn btn-secondary btn-lg"
                          onClick={handleLoginClick}
                        >
                          Login
                        </button>
                      </div>
                    </form>
                  </div>
                    {/* ... */}
                    <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                    <img
                      src="https://s3.us-west-2.amazonaws.com/www.bookingninjas.com/img/illustration-2.svg"
                      className="img-fluid"
                      alt="Sample image"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Show UpdateDetails modal when registered state is true */}
      {registered && <UpdateDetails handleClose={() => setRegistered(false)} formData={formData} uid={uid}/>}
      <ToastContainer />
    </section>
  );
};

export default SignUp;
