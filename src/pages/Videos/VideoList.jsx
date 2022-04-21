import React from "react";
import { BsCollectionPlayFill, BsShareFill } from "react-icons/bs";
import { MdWatchLater } from "react-icons/md";
import { useLocation } from "react-router-dom";
import { ChipContainer } from "../../components/Chips/ChipContainer";
import { ToastMessage } from "../../components/Toast/Toast";
import { useData } from "../../context/data-context";
import { ToastType } from "../../utils/constants";
import { VideoCard } from "./VideoCard";

export const VideoList = () => {
  const {
    state: { videos },
  } = useData();

  const { search } = useLocation();
  const query = new URLSearchParams(search);
  const searchQuery = query.get("type") ? query.get("type") : "all";

  const videoData =
    searchQuery === "all"
      ? videos
      : videos.filter((item) => item.category.includes(searchQuery));

  console.log(searchQuery);

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
      <ChipContainer />

      <div className="video-list">
        {videoData.length > 0 &&
          videoData.map((video) => (
            <VideoCard key={video._id} video={video} menuItems={MenuItems} />
          ))}
      </div>
    </>
  );
};
