import React from "react";
import { useAuth } from "../../context";
import { useDocumentTitle } from "../../hooks/useDocumentTitle";
import { convertToProperDate } from "../../utils/convertToProperDate";

export const Profile = ({ title }) => {
  useDocumentTitle(title);
  const {
    user: { user },
    handleLogOut,
  } = useAuth();
  return (
    <div className="profile-container">
      <div className="user-img-container">
        <div class="avatar avatar-text lg">{user.name[0]}</div>
      </div>
      <div className="profile-content">
        <div className="profile-section">
          <span className="profile-title">Name :</span>
          <span className="profile-value">{user.name}</span>
        </div>
        <div className="profile-section">
          <span className="profile-title">Email :</span>
          <span className="profile-value">{user.email}</span>
        </div>
        <div className="profile-section">
          <span className="profile-title">Joined At :</span>
          <span className="profile-value">
            {convertToProperDate(user.createdAt)}
          </span>
        </div>
        <button className="btn outline-error" onClick={handleLogOut}>
          Logout
        </button>
      </div>
    </div>
  );
};
