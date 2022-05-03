import React from "react";
import { useParams } from "react-router-dom";
import { FaTrashAlt } from "react-icons/fa";
import { useData } from "../../context";
import { PageSkeleton } from "../../components/PageSkeleton/PageSkeleton";

export const SinglePlaylist = () => {
  const {
    state: { playlists },
    removeVideoFromPlaylist,
  } = useData();
  const { playlistId } = useParams();
  const playlistToDisplay = playlists.filter(
    (item) => item._id === playlistId
  )[0];
  const playlist_menu = [
    {
      _id: 0,
      clickHandler: async (_, video) =>
        await removeVideoFromPlaylist({ playlistId, videoId: video._id }),
      icon: <FaTrashAlt />,
      danger: true,
      text: "remove",
    },
  ];

  return (
    <PageSkeleton
      menuItems={playlist_menu}
      videos={playlistToDisplay.videos}
      text={playlistToDisplay.title}
    />
  );
};
