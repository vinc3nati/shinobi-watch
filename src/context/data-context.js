import React, {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import { toast } from "react-toastify";
import { getAllCategories, getAllVideos } from "../services/video.service";
import { ACTIONS } from "../utils/constants";
import { initialState, reducer } from "../utils/reducer";

const DataContext = createContext();

const DataProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [playlistModal, setPlaylistModal] = useState(false);
  const [loader, setLoader] = useState(false);

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

  return (
    <DataContext.Provider
      value={{
        state,
        dispatch,
        loader,
        setLoader,
        playlistModal,
        setPlaylistModal,
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
