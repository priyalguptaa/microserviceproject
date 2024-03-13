import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../CSS/DocumentUpload.css';

const DocumentUpload = ({ handleClose = () => {} }) => {
  const navigate = useNavigate();
  const [aadharCard, setAadharCard] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [uploadComplete, setUploadComplete] = useState(false);

  const handleAadharCardUpload = (event) => {
    const file = event.target.files[0];
    setAadharCard(file);
  };

  const handlePhotoUpload = (event) => {
    const file = event.target.files[0];
    setPhoto(file);
  };

  const handleUploadAll = () => {
    if (!aadharCard || !photo) {
      toast.error("Please upload both Aadhar card and photo.");
      return;
    }
    
    console.log("Uploading Aadhar card:", aadharCard);
    console.log("Uploading photo:", photo);
    
    toast.success("Files uploaded successfully!");
    
    setAadharCard(null);
    setPhoto(null);
    setUploadComplete(true);
    
  };

  const handleCancel = () => {
    handleClose(); 

    navigate('/homepage');
  };

  useEffect(() => {
    if (uploadComplete) {
      navigate('/homepage');
    }
  }, [navigate, uploadComplete]);

  return (
    <div className="document-upload-modal">
      {!uploadComplete && (
        <div className="overlay-content">
          <h2>Document Upload</h2>
          <div className="upload-option">
            <label htmlFor="aadharCardUpload">Upload Aadhar Card:</label>
            <input type="file" id="aadharCardUpload" onChange={handleAadharCardUpload} />
          </div>
          <div className="upload-option">
            <label htmlFor="photoUpload">Upload Photo:</label>
            <input type="file" id="photoUpload" onChange={handlePhotoUpload} />
          </div>
          <div className="button-container">
            <button onClick={handleUploadAll} className="upload-button">Upload All</button>
            <button onClick={handleCancel} className="cancel-button">Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DocumentUpload;
