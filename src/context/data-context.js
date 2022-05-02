import React, {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import { toast } from "react-toastify";
import { ToastMessage } from "../components/Toast/Toast";
import {
  addLikedVideos,
  deleteAllHistory,
  deleteHistory,
  deleteWatchlaterVideos,
  getAllCategories,
  getAllHistory,
  getAllVideos,
  getLikedVideos,
  getWatchlaterVideos,
  postHistory,
  postWatchlaterVideos,
  removeLikedVideos,
  updateVideo,
} from "../services/video.service";
import { ACTIONS, ToastType } from "../utils/constants";
import { initialState, reducer } from "../utils/reducer";
import { useAuth } from "./auth-context";

const DataContext = createContext();

const DataProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [playlistModal, setPlaylistModal] = useState(false);
  const [loader, setLoader] = useState(false);
  const {
    user: { token },
  } = useAuth();

  const resetFunction = () => {
    setPlaylistModal(false);
    dispatch({ type: ACTIONS.ClearAll });
  };

  // Liked Videos
  const getAllLikedVideos = async () => {
    try {
      const response = await getLikedVideos({ token });
      if (response.data.likes) {
        dispatch({
          type: ACTIONS.SetLikedVideos,
          payload: { liked: response.data.likes },
        });
      }
    } catch (err) {
      ToastMessage(err.response.data.errors[0], ToastType.Error);
    }
  };

  const addToLikedVideo = async ({ video }) => {
    try {
      const response = await addLikedVideos({ token, video });
      if (response.data.likes) {
        dispatch({
          type: ACTIONS.SetLikedVideos,
          payload: { liked: response.data.likes },
        });
      }
    } catch (err) {
      ToastMessage(err.response.data.errors[0], ToastType.Error);
    }
  };

  const removeLikedVideo = async ({ videoId }) => {
    setLoader(true);
    try {
      const response = await removeLikedVideos({ token, videoId });
      if (response.data.likes) {
        dispatch({
          type: ACTIONS.SetLikedVideos,
          payload: { liked: response.data.likes },
        });
      }
    } catch (err) {
      ToastMessage(err.response.data.errors[0], ToastType.Error);
    } finally {
      setLoader(false);
    }
  };

  // Watch Later
  const getWatchlater = async () => {
    try {
      const response = await getWatchlaterVideos({ token });
      if (response.data.watchlater) {
        dispatch({
          type: ACTIONS.SetWatchLater,
          payload: { watchLater: response.data.watchlater },
        });
      }
    } catch (err) {
      ToastMessage(err.response.data.errors[0], ToastType.Error);
    }
  };

  const addToWatchlater = async ({ video }) => {
    try {
      const response = await postWatchlaterVideos({ token, video });
      if (response.data.watchlater) {
        dispatch({
          type: ACTIONS.SetWatchLater,
          payload: { watchLater: response.data.watchlater },
        });
      }
    } catch (err) {
      ToastMessage(err.response.data.errors[0], ToastType.Error);
    }
  };

  const removeFromWatchlater = async ({ videoId }) => {
    setLoader(true);
    try {
      const response = await deleteWatchlaterVideos({ token, videoId });
      if (response.data.watchlater) {
        dispatch({
          type: ACTIONS.SetWatchLater,
          payload: { watchLater: response.data.watchlater },
        });
      }
    } catch (err) {
      ToastMessage(err.response.data.errors[0], ToastType.Error);
    } finally {
      setLoader(false);
    }
  };

  // Comments
  const updateVideoComments = async ({ videoId, comments }) => {
    setLoader(true);
    try {
      const response = await updateVideo({ videoId, comments });
      if (response.status === 200) {
        dispatch({
          type: ACTIONS.SetVideos,
          payload: { videos: response.data.videos },
        });
      }
    } catch (err) {
      ToastMessage(err.response.data.errors[0], ToastType.Error);
    } finally {
      setLoader(false);
    }
  };

  // History
  const getHistory = async () => {
    setLoader(true);
    try {
      const response = await getAllHistory({ token });
      if (response.data.history) {
        dispatch({
          type: ACTIONS.SetHistory,
          payload: { history: response.data.history },
        });
      }
    } catch (err) {
      ToastMessage(err.response.data.errors[0], ToastType.Error);
    } finally {
      setLoader(false);
    }
  };

  const addToHistory = async ({ video }) => {
    try {
      const response = await postHistory({ token, video });
      if (response.data.history) {
        dispatch({
          type: ACTIONS.SetHistory,
          payload: { history: response.data.history },
        });
      }
    } catch (err) {
      ToastMessage(err.response.data.errors[0], ToastType.Error);
    }
  };

  const removeFromHistory = async ({ videoId }) => {
    setLoader(true);
    try {
      const response = await deleteHistory({ token, videoId });
      if (response.data.history) {
        dispatch({
          type: ACTIONS.SetHistory,
          payload: { history: response.data.history },
        });
      }
    } catch (err) {
      ToastMessage(err.response.data.errors[0], ToastType.Error);
    } finally {
      setLoader(false);
    }
  };

  const removeAllHistory = async () => {
    setLoader(true);
    try {
      const response = await deleteAllHistory({ token });
      if (response.data.history) {
        dispatch({
          type: ACTIONS.SetHistory,
          payload: { history: response.data.history },
        });
      }
    } catch (err) {
      ToastMessage(err.response.data.errors[0], ToastType.Error);
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    (async () => {
      try {
        setLoader(true);
        const videoResponse = await getAllVideos();
        if (videoResponse.status === 200) {
          dispatch({
            type: ACTIONS.SetVideos,
            payload: { videos: videoResponse.data.videos },
          });
        }
        const categoryResponse = await getAllCategories();
        if (categoryResponse.status === 200) {
          dispatch({
            type: ACTIONS.SetCategories,
            payload: { categories: categoryResponse.data.categories },
          });
        }
      } catch (err) {
        console.error(err);
        ToastMessage("Problem fetching videos", ToastType.Error);
      } finally {
        setLoader(false);
      }
    })();
  }, []);

  useEffect(() => {
    if (token) {
      getAllLikedVideos();
      getWatchlater();
      getHistory();
    } else {
      resetFunction();
    }
  }, [token]);

  return (
    <DataContext.Provider
      value={{
        state,
        dispatch,
        loader,
        setLoader,
        playlistModal,
        setPlaylistModal,
        getAllLikedVideos,
        addToLikedVideo,
        removeLikedVideo,
        getWatchlater,
        addToWatchlater,
        removeFromWatchlater,
        updateVideoComments,
        getHistory,
        addToHistory,
        removeFromHistory,
        removeAllHistory,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

const useData = () => {
  const context = useContext(DataContext);

  if (!context) throw new Error("Data context was not created");

  return context;
};

export { useData, DataProvider };
