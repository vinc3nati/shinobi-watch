import React from "react";
import { ChipContainer } from "../../components/Chips/ChipContainer";
import { useData } from "../../context/data-context";
import { VideoCard } from "./VideoCard";

export const VideoList = () => {
  const {
    state: { videos },
  } = useData();

  return (
    <>
      <ChipContainer />

      <div className="video-list">
        {videos.length > 0 &&
          videos.map((video) => <VideoCard key={video._id} video={video} />)}
      </div>
    </>
  );
};
