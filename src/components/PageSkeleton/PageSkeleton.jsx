import React from "react";
import { useAuth } from "../../context";
import { SmallVideo } from "../../components/SmallVideo/SmallVideo";
import poster from "../../assets/poster.png";
import { capitalize } from "../../utils/capitalize";
import { useNavigate } from "react-router-dom";

export const PageSkeleton = ({ videos, menuItems, text, clearAll }) => {
  const {
    user: { user },
  } = useAuth();
  const navigate = useNavigate();
  return (
    <div className="skeleton-page-wrapper">
      <div className="poster">
        <div className="poster-img-container">
          <img className="img img-responsive" src={poster} alt="poster img" />
          <p className="poster-video-count">
            {text} ({videos?.length} &nbsp;video/s)
          </p>
          {clearAll && videos.length !== 0 && (
            <button className="btn outline-error" onClick={clearAll}>
              remove all
            </button>
          )}
        </div>
        <div className="poster-author">
          <div className="avatar avatar-text md">{user.name[0]}</div>&nbsp;
          <span>{capitalize(user.name)}</span>
        </div>
      </div>
      {videos?.length === 0 ? (
        <div className="empty-list">
          <h2>No {text} in your arsenal</h2>
          <button className="btn primary" onClick={() => navigate("/explore")}>
            explore
          </button>
        </div>
      ) : (
        <div className="skeleton-video-container">
          {videos?.map((item) => (
            <SmallVideo key={item._id} menuItems={menuItems} video={item} />
          ))}
        </div>
      )}
    </div>
  );
};
