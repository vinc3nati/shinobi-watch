import React from "react";
import { VideoCardMenu } from "./VideoCardMenu";

export const VideoCard = ({ video, menuItems }) => {
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
          <VideoCardMenu menuItems={menuItems} video={video} />
        </div>
        <div className="video-creator">{creator}</div>
      </div>
    </div>
  );
};
