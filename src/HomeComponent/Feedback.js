import React, { useState } from "react";
import Rating from "react-rating-stars-component";
import axios from "axios";
import "../CSS/CreateRequest.css";
import "../CSS/Feedback.css";
import { API_BASE_URL } from "./apiConfig";
const Feedback = () => {
  const [formData, setFormData] = useState({
    feedback: "",
    rating: 0,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleRatingChange = (newRating) => {
    setFormData((prevState) => ({
      ...prevState,
      rating: newRating,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_BASE_URL}/rails/user_profile/feedback/1`, formData);
      console.log(response.data);
    } catch (error) {
      console.error("Error:", error);
    }
    
  };

  return (
    <div className="createContainer">
      <div className="container-fluid px-1 py-5 mx-auto ">
        <div className="row d-flex justify-content-center ">
          <div className="col-xl-7 col-lg-8 col-md-9 col-11 text-center">
            <h3>Feedback</h3>
            <p className="blue-text">Please give the feedback</p>
            <div className="Createcard">
              <h5 className="text-center mb-4">
                Hostel Management Feedback Form
              </h5>
              <form className="form-card" onSubmit={handleSubmit}>
                <div className="row justify-content-between text-left"></div>
                <div className="row justify-content-center text-left">
                  <div className="form-group col-sm-6 flex-column d-flex">
                    <label className="form-control-label px-3">
                      Feedback<span className="text-danger"> *</span>
                    </label>
                    <input
                      type="text"
                      name="feedback"
                      value={formData.feedback}
                      onChange={handleChange}
                      className="form-control"
                      placeholder="Enter feedback"
                    />
                  </div>
                </div>
                <br />
                <div className="row justify-content-center text-left">
                  <div className="form-group col-sm-6 flex-column d-flex myRating">
                    <label className="form-control-label px-3">
                      Rating<span className="text-danger"> *</span>
                    </label>
                    <Rating
                      count={5}
                      edit={true}
                      onChange={handleRatingChange}
                      value={formData.rating}
                      activeColor="#ffd700"
                      size={30}
                    />
                  </div>
                </div>
                <div className="row justify-content-center">
                  <div className="form-group col-sm-6">
                    <button type="submit" className="btn-block btn-primary">
                      Generate Feedback
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Feedback;
