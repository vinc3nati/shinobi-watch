import React, { lazy, Suspense } from "react";
import { useParams } from "react-router-dom";
import { BsCollectionPlayFill, BsShareFill } from "react-icons/bs";
import { MdWatchLater } from "react-icons/md";
import { Navigate } from "react-router-dom";
import { ToastMessage } from "../../components/Toast/Toast";
import { ToastType } from "../../utils/constants";
import { Loader } from "../../components/Loader/Loader";
import { useData } from "../../context";
import { VideoCard } from "../Videos/VideoCard";
import { useDocumentTitle } from "../../hooks/useDocumentTitle";

const VideoPlayer = lazy(() => import("./VideoPlayer"));

export const VideoDetails = ({ title }) => {
  useDocumentTitle(title);
  const {
    state: { videos },
    addToWatchlater,
    setPlaylistModal,
  } = useData();
  const { videoId } = useParams();
  const videoToDisplay = videos.find((elem) => elem._id === videoId) || [];

  const relatedVideos = videos.filter(
    (ele) =>
      ele._id !== videoId &&
      !videoToDisplay?.category?.some((item) =>
        ele.category.some((eleItem) => eleItem === item)
      )
  );

  const clickHandler = async (id, video) => {
    switch (id) {
      case 1: // check for login else save to watch later
        const res = await addToWatchlater({ video });
        ToastMessage(res?.msg, ToastType.Success);
        break;

      case 2: // check for login else save to playlist
        await setPlaylistModal((prev) => ({ ...prev, show: true, video }));
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
      {!videoToDisplay && <Navigate to="/error" replace />}
      {videoToDisplay && (
        <div className="video-details-container">
          <Suspense fallback={<Loader />}>
            <VideoPlayer video={videoToDisplay} />
          </Suspense>
          <div className="suggested-videos">
            {relatedVideos &&
              relatedVideos.map((item) => (
                <VideoCard key={item._id} video={item} menuItems={MenuItems} />
              ))}
          </div>
        </div>
      )}
    </>
  );
};
