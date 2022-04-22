import React from "react";
import { useNavigate } from "react-router-dom";
import { VideoCardMenu } from "./VideoCardMenu";

export const VideoCard = ({ video, menuItems }) => {
  const { _id, title, creator, ...rest } = video;
  const navigate = useNavigate();
  return (
    <div className="video-card">
      <div className="video-img-container">
        <img
          src={`https://i.ytimg.com/vi/${_id}/0.jpg`}
          alt="thumbnail"
          onClick={() => navigate(`/explore/${_id}`)}
          className="img img-responsive"
        />
      </div>
      <div className="video-content">
        <div className="video-title">
          <span className="text-bold">{title}</span>
          <VideoCardMenu menuItems={menuItems} video={video} />
        </div>
        <div className="video-creator">{creator}</div>
      </div>
    </div>
  );
};
