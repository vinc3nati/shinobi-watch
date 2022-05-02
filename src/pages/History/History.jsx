import React from "react";
import { FaTrashAlt } from "react-icons/fa";
import { BsCollectionPlayFill } from "react-icons/bs";
import { useDocumentTitle } from "../../hooks/useDocumentTitle";
import { useData } from "../../context";
import { PageSkeleton } from "../../components/PageSkeleton/PageSkeleton";

export const History = ({ title }) => {
  useDocumentTitle(title);
  const {
    state: { history },
    removeFromHistory,
    removeAllHistory,
  } = useData();

  const clickHandler = async (id, video) => {
    switch (id) {
      case 0:
        removeFromHistory({ videoId: video._id });
        break;
      case 1:
        //TODO: save to playlist
        break;
      default:
        break;
    }
  };
  const history_menu = [
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
      clearAll={removeAllHistory}
      videos={history}
      menuItems={history_menu}
      text="Watch History"
    />
  );
};
