import React from "react";
import { FaEllipsisV } from "react-icons/fa";

export const VideoCard = ({ video }) => {
  const { _id, title, creator, ...rest } = video;
  return (
    <div className="video-card">
      <div className="video-img-container">
        <img
          src={`https://i.ytimg.com/vi/${_id}/0.jpg`}
          alt="thumbnail"
          className="img img-responsive"
        />
      </div>
      <div className="video-content">
        <div className="video-title">
          <span className="text-bold">{title}</span>
          <FaEllipsisV className="video-options" />
        </div>
        <div className="video-creator">{creator}</div>
      </div>
    </div>
  );
};
