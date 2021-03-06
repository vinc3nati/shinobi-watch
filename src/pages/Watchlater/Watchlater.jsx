import React from "react";
import { FaTrashAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { BsCollectionPlayFill } from "react-icons/bs";
import { useData } from "../../context";
import { useDocumentTitle } from "../../hooks/useDocumentTitle";
import { PageSkeleton } from "../../components/PageSkeleton/PageSkeleton";

export const Watchlater = ({ title }) => {
  useDocumentTitle(title);
  const {
    state: { watchLater },
    removeFromWatchlater,
    setPlaylistModal,
  } = useData();
  const navigate = useNavigate();

  const clickHandler = async (id, video) => {
    switch (id) {
      case 0:
        removeFromWatchlater({ videoId: video._id });
        break;
      case 1:
        await setPlaylistModal((prev) => ({ ...prev, show: true, video }));
        break;
      default:
        break;
    }
  };
  const watchlater_menu = [
    {
      _id: 0,
      clickHandler,
      icon: <FaTrashAlt />,
      danger: true,
      text: "remove",
    },
    {
      _id: 1,
      clickHandler,
      icon: <BsCollectionPlayFill />,
      text: "save to playlist",
    },
  ];

  return (
    <PageSkeleton
      videos={watchLater}
      menuItems={watchlater_menu}
      text="Watch Later Videos"
    />
  );
};
