import React from "react";
import { useNavigate } from "react-router-dom";
import errorImage from "../../assets/404_6.png";
import { useDocumentTitle } from "../../hooks/useDocumentTitle";

export const Error = ({ title }) => {
  useDocumentTitle(title);
  const navigate = useNavigate();
  return (
    <main id="error-page">
      <div className="error-container">
        <div className="error-img-container">
          <img className="error-img" src={errorImage} alt="error-logo" />
        </div>
        <div className="error-content">
          <div className="error-heading">
            <p>Error</p>
            <p>404</p>
          </div>
          <div className="error-text">Page not found</div>
          <div className="error-button-grp">
            <button
              className="btn outline-primary"
              onClick={() => navigate("/")}
            >
              Home
            </button>
            <button
              className="btn primary"
              onClick={() => navigate("/explore")}
            >
              videos
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};
