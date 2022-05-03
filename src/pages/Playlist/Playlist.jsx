import React from "react";
import { useNavigate } from "react-router-dom";
import { BiTrashAlt } from "react-icons/bi";
import { FaPlay } from "react-icons/fa";
import { useData } from "../../context";
import emptyPlaylist from "../../assets/playlist_empty.png";
import { useDocumentTitle } from "../../hooks/useDocumentTitle";
import emptyPlaylistVideo from "../../assets/empty_playlist_video.png";

export const Playlist = ({ title }) => {
  useDocumentTitle(title);
  const {
    state: { playlists },
    removePlaylist,
  } = useData();
  const navigate = useNavigate();

  return (
    <>
      {playlists.length === 0 && (
        <div className="playlist-poster">
          <div className="playlist-poster-img">
            <img
              className="img img-responsive"
              src={emptyPlaylist}
              alt="empty playlist"
            />
          </div>
          <div className="playlist-poster-text">
            Looks like you don't have any playlist. Explore and create one!
          </div>
          <button className="btn primary" onClick={() => navigate("/explore")}>
            explore
          </button>
        </div>
      )}
      {playlists.length !== 0 && (
        <div className="playlist-container">
          {playlists.map((item) => (
            <div className="playlist-window" key={item._id}>
              <div className="playlist-window-content">
                <p className="playlist-window-title">{item.title}</p>
                <p className="playlist-window-desc">{item.description}</p>
                <BiTrashAlt
                  className="playlist-window-icon"
                  onClick={() => removePlaylist({ playlistId: item._id })}
                />
              </div>
              <div className="playlist-window-img">
                <img
                  className="img img-responsive"
                  src={
                    item.videos.length > 0
                      ? `https://i.ytimg.com/vi/${item.videos[0]._id}/0.jpg`
                      : emptyPlaylistVideo
                  }
                />
                {item.videos.length !== 0 && (
                  <p
                    className="playlist-window-img-text"
                    onClick={() => navigate(`/explore/playlists/${item._id}`)}
                  >
                    {item.videos.length}
                    <FaPlay />
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};
