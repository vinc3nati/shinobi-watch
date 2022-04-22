import React, { useRef, useState } from "react";
import ReactPlayer from "react-player/youtube";
import { FaVideo, FaThumbsUp, FaUpload, FaHistory } from "react-icons/fa";
import { BsCollectionPlayFill, BsShareFill } from "react-icons/bs";
import { MdWatchLater } from "react-icons/md";
import { useData } from "../../context";
import { ACTIONS } from "../../utils/constants";

const VideoPlayer = ({ video }) => {
  const [comment, setComment] = useState("");
  const {
    state: { videos },
    dispatch,
  } = useData();
  const playerRef = useRef(null);
  const increaseView = () => {
    const updatedList = videos.map((item) =>
      item._id === video._id ? { ...item, viewCount: item.viewCount + 1 } : item
    );
    dispatch({ type: ACTIONS.SetVideos, payload: { videos: updatedList } });
  };

  const handleChange = (e) => {
    setComment(e.target.value);
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
            // TODO: add to history on auth
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
          <FaThumbsUp className="video-player-icon" />
          <MdWatchLater className="video-player-icon" />
          <BsCollectionPlayFill className="video-player-icon" />
          <BsShareFill className="video-player-icon" />
        </div>
      </div>
      <p className="video-description">{video?.description}</p>
      <div className="comment-container">
        <div className="input-comment">
          <div class="input-grp fancy">
            <input
              id="comment-input"
              type="text"
              value={comment}
              onChange={handleChange}
              placeholder="Comment"
            />
            <label for="comment-input">Comment</label>
          </div>
          <button disabled={!comment.length} className="btn outline-primary">
            add
          </button>
        </div>
        <div className="video-comment">
          {video?.comments?.map((item) => (
            <div className="user-comment" key={item._id}>
              <div class="avatar avatar-text md">{item?.user_name[0]}</div>
              <div className="user-text-comment">
                <p className="text-bold">{item?.user_name}</p>
                <p>{item?.comment}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
