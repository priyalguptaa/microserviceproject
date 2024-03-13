import React, { useState } from "react";
import { Link } from "react-router-dom";
import RoomDetails from "./RoomDetails";
import CreateRequest from "./CreateRequest";
import UpdateDetail from "./UpdateDetails";
import DocumentUpload from "./DocumentUpload";

const Navbar = ({ formData, onUpdateDetails  }) => {
  const [showModal, setShowModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showCreateRequest, setShowCreateRequest] = useState(false);
  const [showDocumentUpload, setShowDocumentUpload] = useState(false);

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleShowUpdateModal = () => {
    setShowUpdateModal(true);
  };

  const handleCloseUpdateModal = () => {
    setShowUpdateModal(false);
  };

  const handleCreateRequestClick = () => {
    setShowCreateRequest(true);
  };

  const handleCloseCreateRequest = () => {
    setShowCreateRequest(false);
  };

  const handleShowDocumentUpload = () => {
    setShowDocumentUpload(true);
  };

  const handleCloseDocumentUpload = () => {
    setShowDocumentUpload(false);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link
          className="navbar-brand"
          to="/homepage"
          style={{
            cursor: "pointer",
            color: "rgba(0, 0, 0, .9)",
            textDecoration: "none",
          }}
        >
          <b>Hostel Management</b>
        </Link>

        <div
          className="collapse navbar-collapse"
          id="navbarSupportedContent"
        >
          <ul
            className="navbar-nav me-auto mb-2 mb-lg-0"
            style={{ marginLeft: "784px" }}
          >
            <li className="nav-item">
              <Link
                to="/homepage"
                className="nav-link"
                style={{
                  cursor: "pointer",
                  color: "rgba(0, 0, 0, .9)",
                  textDecoration: "none",
                }}
              >
                Home
              </Link>
            </li>

            <li className="nav-item">
              <div
                className="nav-link"
                style={{
                  cursor: "pointer",
                  color: "rgba(0, 0, 0, .9)",
                }}
                onClick={handleShowModal}
              >
                Room Details
              </div>
            </li>

            <li className="nav-item">
              <Link
                to="/create-request"
                className="nav-link"
                style={{
                  cursor: "pointer",
                  color: "rgba(0, 0, 0, .9)",
                  textDecoration: "none",
                }}
              >
                Create Request
              </Link>
            </li>

            <li className="nav-item">
              <Link
                to="/feedback"
                className="nav-link"
                style={{
                  cursor: "pointer",
                  color: "rgba(0, 0, 0, .9)",
                  textDecoration: "none",
                }}
              >
                Feedback
              </Link>
            </li>

            <li className="nav-item">
              <Link
                to="/contact"
                className="nav-link"
                style={{
                  cursor: "pointer",
                  color: "rgba(0, 0, 0, .9)",
                  textDecoration: "none",
                }}
              >
                Contact
              </Link>
            </li>

            <li className="nav-item">
              <Link
                to="/about"
                className="nav-link"
                style={{
                  cursor: "pointer",
                  color: "rgba(0, 0, 0, .9)",
                  textDecoration: "none",
                }}
              >
                About
              </Link>
            </li>

            <li className="nav-item">
              <div
                className="nav-link"
                style={{
                  cursor: "pointer",
                  color: "rgba(0, 0, 0, .9)",
                }}
                onClick={handleShowUpdateModal}
                
                
              >
                Update Details
              </div>
            </li>

            <li className="nav-item">
              <Link
                to="/document-upload"
                className="nav-link"
                style={{
                  cursor: "pointer",
                  color: "rgba(0, 0, 0, .9)",
                  textDecoration: "none",
                }}
                onClick={handleShowDocumentUpload}
              >
                Document Upload
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <RoomDetails showModal={showModal} setShowModal={setShowModal} />

      {showCreateRequest && (
        <div className="overlay">
          <div className="overlay-content">
            <CreateRequest />
            <button onClick={handleCloseCreateRequest}>Close</button>
          </div>
        </div>
      )}

      <UpdateDetail
        show={showUpdateModal}
        handleClose={handleCloseUpdateModal}
        formData={formData} 
        onUpdateDetails={onUpdateDetails}
        
      />

      {showDocumentUpload && (
        <DocumentUpload handleClose={handleCloseDocumentUpload} />
      )}
    </nav>
  );
};

export default Navbar;
