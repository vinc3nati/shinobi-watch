import React from "react";
import { BsCollectionPlayFill, BsShareFill } from "react-icons/bs";
import { MdWatchLater } from "react-icons/md";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { ChipContainer } from "../../components/Chips/ChipContainer";
import { ToastMessage } from "../../components/Toast/Toast";
import { useData, useAuth } from "../../context";
import { useDocumentTitle } from "../../hooks/useDocumentTitle";
import { ACTIONS, FILTERS, SORT_BY, ToastType } from "../../utils/constants";
import { sortedVideo } from "../../utils/FilteredData";
import { VideoCard } from "./VideoCard";

export const VideoList = ({ title }) => {
  useDocumentTitle(title);
  const {
    state: {
      videos,
      filters: { sortBy },
    },
    dispatch,
    addToWatchlater,
    setPlaylistModal,
  } = useData();
  const {
    user: { token },
  } = useAuth();
  const { search, pathname } = useLocation();
  const navigate = useNavigate();

  const query = new URLSearchParams(search);
  const searchQuery = query.get("type") ? query.get("type") : "all";
  const isInvalid =
    videos.length !== 0 &&
    searchQuery !== "all" &&
    !videos.some((item) => item.category.includes(searchQuery));
  let videoData =
    searchQuery === "all"
      ? videos
      : videos.filter((item) => item.category.includes(searchQuery));

  videoData = sortedVideo(videoData, sortBy);
  const clickHandler = async (id, video) => {
    switch (id) {
      case 1: // check for login else save to watch later
        if (!token) {
          navigate("/login", { state: { from: pathname } });
          return;
        }
        const res = await addToWatchlater({ video });
        ToastMessage(res?.msg, ToastType.Success);
        break;

      case 2: // check for login else save to playlist
        if (!token) {
          navigate("/login", { state: { from: pathname } });
          return;
        }
        await setPlaylistModal((prev) => ({ ...prev, show: true, video }));
        break;

      case 3: // copy video link
        navigator.clipboard.writeText(
          `https://shinobi-watch.netlify.app/explore/${video._id}`
        );
        ToastMessage("Link copied to keyboard", ToastType.Info);
        break;

      default:
        break;
    }
  };

  const MenuItems = [
    {
      _id: 1,
      clickHandler,
      icon: <MdWatchLater />,
      text: "Save to watch later",
    },
    {
      _id: 2,
      clickHandler,
      icon: <BsCollectionPlayFill />,
      text: "Save to playlist",
    },
    {
      _id: 3,
      clickHandler,
      icon: <BsShareFill />,
      text: "Share",
    },
  ];

  return (
    <>
      {!isInvalid && (
        <>
          <ChipContainer />

          <div className="video-list">
            {videoData.length > 0 &&
              videoData.map((video) => (
                <VideoCard
                  key={video._id}
                  video={video}
                  menuItems={MenuItems}
                />
              ))}
          </div>
        </>
      )}
      {isInvalid && <Navigate to="/error" replace />}
    </>
  );
};
