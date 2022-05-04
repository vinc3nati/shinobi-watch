import { ACTIONS } from "./constants";

export const initialState = {
  videos: [],
  categories: [],
  playlists: [],
  history: [],
  liked: [],
  watchLater: [],
  uploadedVideos: [],
  filters: {
    sortBy: "",
    category: "",
  },
};

export const reducer = (state, { type, payload }) => {
  switch (type) {
    case ACTIONS.SetVideos: {
      return { ...state, videos: payload.videos };
    }

    case ACTIONS.SetCategories:
      return { ...state, categories: payload.categories };

    case ACTIONS.ChangeFilters:
      return {
        ...state,
        filters: { ...state.filters, [payload.type]: payload.value },
      };

    case ACTIONS.SetHistory:
      return { ...state, history: payload.history };

    case ACTIONS.SetPlaylists:
      return { ...state, playlists: payload.playlists };

    case ACTIONS.SetWatchLater:
      return { ...state, watchLater: payload.watchLater };

    case ACTIONS.SetLikedVideos:
      return { ...state, liked: payload.liked };

    case ACTIONS.SetUploadedVideo:
      return {
        ...state,
        uploadedVideos: state.uploadedVideos.concat(payload.uploadedVideo),
        videos: state.videos.concat(payload.uploadedVideo),
      };

    case ACTIONS.ClearFilters:
      return { ...state, filters: initialState.filters };

    case ACTIONS.ClearAll:
      return {
        ...state,
        playlists: [],
        history: [],
        liked: [],
        watchLater: [],
        uploadedVideos: [],
      };

    default:
      return { ...state };
  }
};
