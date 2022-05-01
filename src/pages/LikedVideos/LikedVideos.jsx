import React from "react";
import { FaTrashAlt } from "react-icons/fa";
import { BsCollectionPlayFill } from "react-icons/bs";
import { useDocumentTitle } from "../../hooks/useDocumentTitle";
import { useAuth, useData } from "../../context";
import { SmallVideo } from "../../components/SmallVideo/SmallVideo";
import poster from "../../assets/poster.png";
import { capitalize } from "../../utils/capitalize";
import { useNavigate } from "react-router-dom";

export const LikedVideos = ({ title }) => {
  useDocumentTitle(title);
  const {
    state: { liked },
    removeLikedVideo,
  } = useData();
  const {
    user: { user },
  } = useAuth();

  const navigate = useNavigate();

  const clickHandler = async (id, video) => {
    switch (id) {
      case 0:
        removeLikedVideo({ videoId: video._id });
        break;
      case 1:
        //TODO: save to playlist
        break;
      default:
        break;
    }
  };
  const liked_menu = [
    {
      _id: 0,
      clickHandler,
      icon: <FaTrashAlt />,
      danger: true,
      text: "remove",
    },
    {
      _id: 0,
      clickHandler,
      icon: <BsCollectionPlayFill />,
      text: "save to playlist",
    },
  ];
  return (
    <div className="liked-page-wrapper">
      <div className="poster">
        <div className="poster-img-container">
          <img className="img img-responsive" src={poster} alt="poster img" />
          <p className="poster-video-count">
            Liked Videos ({liked?.length} &nbsp;videos)
          </p>
        </div>
        <div className="poster-author">
          <div class="avatar avatar-text md">{user.name[0]}</div>&nbsp;
          <span>{capitalize(user.name)}</span>
        </div>
      </div>
      {liked?.length === 0 ? (
        <div className="empty-list">
          <h2>No liked videos in your arsenal</h2>
          <button className="btn primary" onClick={() => navigate("/explore")}>
            explore
          </button>
        </div>
      ) : (
        <div className="liked-video-container">
          {liked?.map((item) => (
            <SmallVideo key={item._id} menuItems={liked_menu} video={item} />
          ))}
        </div>
      )}
    </div>
  );
};
