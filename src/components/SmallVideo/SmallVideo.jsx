import React from "react";
import { Link } from "react-router-dom";
import { VideoCardMenu } from "../../pages/Videos/VideoCardMenu";

export const SmallVideo = ({ video, menuItems }) => {
  return (
    <article className="small-video-container">
      <Link to={`/explore/${video?._id}`} className="small-img-container">
        <img
          src={`https://i.ytimg.com/vi/${video?._id}/0.jpg`}
          alt="thumbnail"
          className="small-video-img"
        />
      </Link>
      <div className="small-video-content">
        <p className="small-video-title">
          <span>{video?.title}</span>
          <VideoCardMenu menuItems={menuItems} video={video} />
        </p>
        <p className="small-video-creator">{video?.creator}</p>
        <span></span>
      </div>
    </article>
  );
};
