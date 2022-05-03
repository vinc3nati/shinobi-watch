import React, { useState } from "react";
import { useData } from "../../context";
import { ToastType } from "../../utils/constants";
import { ToastMessage } from "../Toast/Toast";
import emptyPlaylist from "../../assets/playlist_empty.png";

export const PlaylistModal = () => {
  const initialValues = {
    title: "",
    description: "",
  };
  const [playlistInfo, setPlaylistInfo] = useState(initialValues);
  const [showForm, setShowForm] = useState(false);
  const {
    state: { playlists },
    playlistModal: { video },
    setPlaylistModal,
    addToPlaylist,
    addVideoToPlaylist,
    removeVideoFromPlaylist,
  } = useData();

  const handleChange = (e) => {
    setPlaylistInfo((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isAlreadyPresent = playlists.find(
      (item) => item.title.toLowerCase() === playlistInfo.title.toLowerCase()
    );
    if (isAlreadyPresent) {
      ToastMessage("Playlist already exists", ToastType.Info);
    } else {
      addToPlaylist({ playlist: playlistInfo });
    }
    setPlaylistInfo({ ...initialValues });
    setShowForm(false);
  };
  const handleCheckBox = (e, playlistItem) => {
    if (!e.target.checked) {
      removeVideoFromPlaylist({
        playlistId: playlistItem._id,
        videoId: video?._id,
      });
    } else {
      addVideoToPlaylist({ playlistId: playlistItem._id, video });
    }
  };
  return (
    <div className="modal-container active">
      <div className="modal-content with-header">
        <div className="modal-header">
          <div className="h4 text-primary">Save To</div>
          <button
            className="modal-close"
            onClick={() =>
              setPlaylistModal((prev) => ({ ...prev, show: false }))
            }
          ></button>
        </div>
        <div className="modal-text text-justify">
          {playlists.length === 0 && (
            <div className="empty-playlist">
              <div className="empty-playlist-img">
                <img
                  className="img img-responsive"
                  src={emptyPlaylist}
                  alt="empty playlist"
                />
              </div>
              <p>Create playlist now</p>
            </div>
          )}
          {playlists?.map((playlistItem) => (
            <div className="checkbox-grp" key={playlistItem._id}>
              <input
                type="checkbox"
                checked={playlistItem.videos.some(
                  (item) => item._id === video._id
                )}
                onChange={(e) => {
                  playlistItem.videos.some((item) => item._id === video._id);
                  handleCheckBox(e, playlistItem);
                }}
                id={`${playlistItem.title}-check`}
              />
              <label htmlFor={`${playlistItem.title}-check`}>
                {playlistItem.title}
              </label>
            </div>
          ))}
        </div>
        {!showForm && (
          <button className="btn primary" onClick={() => setShowForm(true)}>
            create playlist
          </button>
        )}
        {showForm && (
          <form className="playlist-form" onSubmit={handleSubmit}>
            <div className="input-grp">
              <input
                required
                autoComplete="off"
                type="text"
                name="title"
                id="title"
                value={playlistInfo.title}
                onChange={handleChange}
                placeholder="Playlist name"
              />
            </div>
            <div className="input-grp">
              <input
                required
                autoComplete="off"
                type="text"
                name="description"
                id="description"
                value={playlistInfo.description}
                onChange={handleChange}
                placeholder="Something about the playlist"
              />
            </div>
            <button type="submit" className="btn primary">
              save
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
