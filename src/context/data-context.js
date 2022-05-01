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
  getAllCategories,
  getAllVideos,
  getLikedVideos,
  removeLikedVideos,
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
        toast("Problem fetching videos");
      } finally {
        setLoader(false);
      }
    })();
  }, []);

  useEffect(() => {
    if (token) {
      getAllLikedVideos();
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
