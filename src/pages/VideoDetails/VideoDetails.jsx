import React, { useState, lazy, Suspense } from "react";
import { useParams } from "react-router-dom";
import { BsCollectionPlayFill, BsShareFill } from "react-icons/bs";
import { MdWatchLater } from "react-icons/md";
import { ToastMessage } from "../../components/Toast/Toast";
import { ToastType } from "../../utils/constants";
import { Loader } from "../../components/Loader/Loader";
import { useData } from "../../context";
import { VideoCard } from "../Videos/VideoCard";
const VideoPlayer = lazy(() => import("./VideoPlayer"));

export const VideoDetails = () => {
  const {
    state: { videos },
  } = useData();
  const { videoId } = useParams();
  const videoToDisplay = videos.find((elem) => elem._id === videoId);
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
        break;

      case 2: // check for login else save to playlist
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
      {/* TODO:
  if no video is found navigate to error page
  */}
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
    </>
  );
};
