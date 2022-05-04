import React, { useState } from "react";
import { RiErrorWarningFill } from "react-icons/ri";
import { useData } from "../../context";
import { ACTIONS, ToastType } from "../../utils/constants";
import { ToastMessage } from "../Toast/Toast";

export const Upload = () => {
  const initialValue = {
    videoUrl: "",
    creator: "",
    title: "",
    description: "",
    category: [],
  };
  const initialError = {
    videoUrl: "",
    creator: "",
    title: "",
    description: "",
    category: "",
  };
  const [uploadVideo, setUploadVideo] = useState(initialValue);
  const [uploadError, setUploadError] = useState(initialError);
  const {
    state: { videos, categories },
    dispatch,
    setUploadModal,
  } = useData();

  const youtube_parser = (url) => {
    const regExp =
      /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[7].length == 11 ? match[7] : false;
  };

  const handleChange = (e) => {
    const name = e.target.name,
      value = e.target.value;
    if (name === "category") {
      setUploadVideo((prev) => ({
        ...prev,
        category: prev.category.concat(value),
      }));
    } else setUploadVideo((prev) => ({ ...prev, [name]: value }));
  };

  const handleErrorFocus = (e) => {
    const name = e.target.name;
    setUploadError((prev) => ({ ...prev, [name]: "" }));
  };

  const checkValidation = () => {
    let uploadFlag = true;

    const tempId = youtube_parser(uploadVideo.videoUrl);
    if (!tempId) {
      setUploadError((prev) => ({ ...prev, videoUrl: "Invalid YouTube URL" }));
      uploadFlag = false;
    }

    if (!uploadVideo.creator.trim().length > 0) {
      setUploadError((prev) => ({ ...prev, creator: "Invalid creator" }));
      uploadFlag = false;
    }

    if (!uploadVideo.title.trim().length > 0) {
      setUploadError((prev) => ({ ...prev, title: "Invalid title" }));
      uploadFlag = false;
    }

    if (!uploadVideo.description.trim().length > 0) {
      setUploadError((prev) => ({
        ...prev,
        description: "Invalid Description",
      }));
      uploadFlag = false;
    }

    if (!uploadVideo.category.length > 0) {
      setUploadError((prev) => ({
        ...prev,
        category: "Please select category",
      }));
      uploadFlag = false;
    }

    return { tempId, uploadFlag };
  };

  const handleUpload = (e) => {
    e.preventDefault();
    const { tempId, uploadFlag } = checkValidation();
    if (uploadFlag) {
      const isVideoPresent = videos.find((item) => item._id === tempId);
      if (isVideoPresent) {
        ToastMessage("Video already exists!", ToastType.Info);
        return;
      } else {
        dispatch({
          type: ACTIONS.SetUploadedVideo,
          payload: {
            uploadedVideo: {
              _id: tempId,
              creator: uploadVideo.creator.trim(),
              title: uploadVideo.title.trim(),
              description: uploadVideo.description.trim(),
              category: uploadVideo.category,
              viewCount: 0,
              uploadDate: new Date().getTime(),
            },
          },
        });
        setUploadVideo(initialValue);
        setUploadModal(false);
        ToastMessage("Video Uploaded", ToastType.Success);
      }
    }
  };

  return (
    <div className="upload-modal modal-container active">
      <div className="modal-content with-header">
        <div className="modal-header">
          <div className="h4 text-primary">Upload Video</div>
          <button
            className="modal-close"
            onClick={() => setUploadModal(false)}
          ></button>
        </div>
        <div className="modal-text text-justify">
          <div className="input-grp">
            <label htmlFor="videoUrl">Video URL</label>
            <input
              required
              autoComplete="off"
              type="text"
              name="videoUrl"
              id="videoUrl"
              value={uploadVideo.videoUrl}
              onFocus={handleErrorFocus}
              onChange={handleChange}
              placeholder="YouTube URL"
            />
            {uploadError.videoUrl && (
              <p className="text-error">
                <RiErrorWarningFill /> {uploadError.videoUrl}
              </p>
            )}
          </div>
          <div className="input-grp">
            <label htmlFor="creator">Author</label>
            <input
              required
              autoComplete="off"
              type="text"
              name="creator"
              id="creator"
              value={uploadVideo.creator}
              onFocus={handleErrorFocus}
              onChange={handleChange}
              placeholder="Video Author"
            />
            {uploadError.creator && (
              <p className="text-error">
                <RiErrorWarningFill /> {uploadError.creator}
              </p>
            )}
          </div>
          <div className="input-grp">
            <label htmlFor="title">Title</label>
            <input
              required
              autoComplete="off"
              type="text"
              name="title"
              id="title"
              value={uploadVideo.title}
              onFocus={handleErrorFocus}
              onChange={handleChange}
              placeholder="Video Title"
            />
            {uploadError.title && (
              <p className="text-error">
                <RiErrorWarningFill /> {uploadError.title}
              </p>
            )}
          </div>
          <div className="input-grp">
            <label htmlFor="description">Description</label>
            <input
              required
              autoComplete="off"
              type="text"
              name="description"
              id="description"
              value={uploadVideo.description}
              onFocus={handleErrorFocus}
              onChange={handleChange}
              placeholder="Video Description"
            />
            {uploadError.description && (
              <p className="text-error">
                <RiErrorWarningFill /> {uploadError.description}
              </p>
            )}
          </div>
          <div className="input-grp">
            <label htmlFor="category">Category</label>
            <select
              id="category"
              name="category"
              onChange={handleChange}
              onFocus={handleErrorFocus}
              required
            >
              {categories.map((item) => (
                <option key={item._id} value={item.categoryName}>
                  {item.categoryName}
                </option>
              ))}
            </select>
            {uploadError.category && (
              <p className="text-error">
                <RiErrorWarningFill /> {uploadError.category}
              </p>
            )}
          </div>
        </div>
        <button type="submit" className="btn primary" onClick={handleUpload}>
          Upload
        </button>
      </div>
    </div>
  );
};
