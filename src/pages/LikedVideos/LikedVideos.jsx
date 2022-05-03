import React from "react";
import { FaTrashAlt } from "react-icons/fa";
import { BsCollectionPlayFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useDocumentTitle } from "../../hooks/useDocumentTitle";
import { useData } from "../../context";
import { PageSkeleton } from "../../components/PageSkeleton/PageSkeleton";

export const LikedVideos = ({ title }) => {
  useDocumentTitle(title);
  const {
    state: { liked },
    removeLikedVideo,
    setPlaylistModal,
  } = useData();
  const navigate = useNavigate();

  const clickHandler = async (id, video) => {
    switch (id) {
      case 0:
        removeLikedVideo({ videoId: video._id });
        break;
      case 1:
        await setPlaylistModal((prev) => ({ ...prev, show: true, video }));
        break;

      default:
        break;
    }
  };
  const liked_menu = [
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
    <PageSkeleton videos={liked} menuItems={liked_menu} text="Liked Videos" />
  );
};
