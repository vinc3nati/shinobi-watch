import React, { useRef, useState } from "react";
import ReactPlayer from "react-player/youtube";
import { FaEye, FaThumbsUp } from "react-icons/fa";
import { BsCollectionPlayFill, BsShareFill } from "react-icons/bs";
import { MdWatchLater } from "react-icons/md";
import { v4 as uuid } from "uuid";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth, useData } from "../../context";
import { ACTIONS, ToastType } from "../../utils/constants";
import { capitalize } from "../../utils/capitalize";
import { ToastMessage } from "../../components/Toast/Toast";

const VideoPlayer = ({ video }) => {
  const [comment, setComment] = useState("");
  const [disabled, setDisabled] = useState(false);
  const {
    state: { videos, liked, watchLater, history },
    dispatch,
    addToLikedVideo,
    removeLikedVideo,
    addToWatchlater,
    removeFromWatchlater,
    updateVideoComments,
    addToHistory,
  } = useData();
  const {
    user: { user, token },
  } = useAuth();
  const playerRef = useRef(null);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const isLiked = liked.some((item) => item._id === video._id);
  const isWatchlater = watchLater.some((item) => item._id === video._id);

  const increaseView = () => {
    const updatedList = videos.map((item) =>
      item._id === video._id ? { ...item, viewCount: item.viewCount + 1 } : item
    );
    dispatch({ type: ACTIONS.SetVideos, payload: { videos: updatedList } });
  };

  const handleChange = (e) => {
    setComment(e.target.value);
  };

  const handleLike = async () => {
    if (!token) {
      navigate("/login", { state: { from: pathname } });
      return;
    }
    setDisabled(true);
    isLiked
      ? await removeLikedVideo({ videoId: video._id })
      : await addToLikedVideo({ video });
    setDisabled(false);
  };

  const handleWatchlater = async () => {
    if (!token) {
      navigate("/login", { state: { from: pathname } });
      return;
    }
    setDisabled(true);
    isWatchlater
      ? await removeFromWatchlater({ videoId: video._id })
      : await addToWatchlater({ video });
    setDisabled(false);
  };

  const updateComments = async () => {
    if (!token) {
      ToastMessage("Please login to comment", ToastType.Error);
      return;
    }
    const singleComment = {
      _id: uuid(),
      user_name: capitalize(user.name),
      comment,
    };
    await updateVideoComments({
      videoId: video._id,
      comments: video?.comments?.concat(singleComment),
    });
    setComment("");
  };

  const handleHistory = async () => {
    if (history.find((item) => item._id === video?._id)) return;
    await addToHistory({ video });
  };

  return (
    <div className="video-player">
      <div className="video-container">
        <ReactPlayer
          ref={playerRef}
          url={`https://www.youtube.com/embed/${video?._id}`}
          controls={true}
          width={"100%"}
          height={"100%"}
          onStart={() => {
            handleHistory();
            increaseView();
          }}
        />
      </div>
      <div className="video-player-content">
        <div className="video-player-text">
          <p className="video-title">{video?.title}</p>
          <p>{video?.creator}</p>
        </div>
        <div className="video-player-actions">
          <FaThumbsUp
            style={
              disabled ? { pointerEvents: "none", cursor: "not-allowed" } : null
            }
            className={`video-player-icon ${isLiked ? "active" : ""}`}
            onClick={handleLike}
          />
          <MdWatchLater
            style={
              disabled ? { pointerEvents: "none", cursor: "not-allowed" } : null
            }
            className={`video-player-icon ${isWatchlater ? "active" : ""}`}
            onClick={handleWatchlater}
          />
          <BsCollectionPlayFill
            style={
              disabled ? { pointerEvents: "none", cursor: "not-allowed" } : null
            }
            className="video-player-icon"
          />
          <BsShareFill
            style={
              disabled ? { pointerEvents: "none", cursor: "not-allowed" } : null
            }
            className="video-player-icon"
          />
        </div>
      </div>
      {video?.viewCount !== 0 && (
        <div className="view-count">
          <FaEye /> {video?.viewCount > 99 ? "99+" : video?.viewCount}
        </div>
      )}
      <p className="video-description">{video?.description}</p>
      <div className="comment-container">
        <div className="input-comment">
          <div className="input-grp fancy">
            <input
              id="comment-input"
              type="text"
              value={comment}
              onChange={handleChange}
              placeholder="Comment"
            />
            <label htmlFor="comment-input">Comment</label>
          </div>
          <button
            disabled={!comment.length}
            onClick={updateComments}
            className="btn primary"
          >
            add
          </button>
        </div>
        <div className="video-comment">
          {video?.comments?.map((item) => (
            <div className="user-comment" key={item._id}>
              <div class="avatar avatar-text md">{item?.user_name[0]}</div>
              <div className="user-text-comment">
                <p>{item?.user_name}</p>
                <p className="text-light">{item?.comment}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
