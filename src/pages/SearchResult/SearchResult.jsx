import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { BsCollectionPlayFill, BsShareFill } from "react-icons/bs";
import { MdWatchLater } from "react-icons/md";
import { useAuth, useData } from "../../context";
import { useDocumentTitle } from "../../hooks/useDocumentTitle";
import { VideoCard } from "../Videos/VideoCard";
import { ToastMessage } from "../../components/Toast/Toast";
import { ToastType } from "../../utils/constants";

export const SearchResult = ({ title }) => {
  useDocumentTitle(title);
  const {
    state: { videos },
    addToWatchlater,
    setPlaylistModal,
  } = useData();
  const {
    user: { token },
  } = useAuth();
  const { search, pathname } = useLocation();
  const navigate = useNavigate();
  const query = new URLSearchParams(search);
  const searchQuery = query.get("searchQuery");

  const searchResults = videos.filter(
    ({ title, category }) =>
      title.toLowerCase().includes(searchQuery?.toLowerCase()) ||
      category.includes(searchQuery?.toLowerCase()) ||
      searchQuery?.toLowerCase().includes(title.toLowerCase())
  );
  const foundItems = searchResults.length;

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

  useEffect(() => {
    if (!searchQuery) {
      navigate("/explore");
      return;
    }
  }, [searchQuery]);
  return (
    <article className="search-page">
      {foundItems !== 0 ? (
        <>
          <h4 className="text-center">
            Search results for "{searchQuery}"{" "}
            <span className="text-light">- {foundItems} item/s</span>
          </h4>
          <div className="layout-4-column">
            {searchResults.map((video) => (
              <VideoCard key={video._id} video={video} menuItems={MenuItems} />
            ))}
          </div>
        </>
      ) : (
        <div className="text-center">
          <h2>No results found for "{searchQuery}"</h2>
          <h6>Check out our other videos</h6>
          <button
            className="btn primary"
            onClick={() => navigate("/explore", { state: { from: pathname } })}
          >
            explore
          </button>
        </div>
      )}
    </article>
  );
};
