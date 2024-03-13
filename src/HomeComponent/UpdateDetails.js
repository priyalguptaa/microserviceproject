import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';
import { API_BASE_URL_Reg } from './apiConfig';

const UpdateDetails = ({ show, handleClose}) => {

  const uId = localStorage.getItem("uId");
  console.log(uId , "myyyyyyy");
  console.log("UpdateDetails component rendered");
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    contact: '',
    address: '',
  });

  useEffect(() => {
      fetchUserDetails();
  }, []);
  

  const fetchUserDetails = async () => {
    console.log("Fetching user details...");
    try {
      const response = await axios.get(`${API_BASE_URL_Reg}/admin/user/${uId}`);
      console.log("User details fetched successfully:", response.data);
      setFormData(response.data.response); // Set the entire response data, not just response.data.response
    } catch (error) {
      console.error('Error fetching user details:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(`${API_BASE_URL_Reg}/admin/user/${uId}`, formData);
      console.log('Updated details:', response.data);
      handleClose();
    } catch (error) {
      console.error('Error updating details:', error);
    }
  };


  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Update Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Contact</Form.Label>
            <Form.Control
              type="text"
              name="contact"
              value={formData.cno}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Address</Form.Label>
            <Form.Control
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Update
          </Button>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default UpdateDetails;
