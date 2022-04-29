export const VIDEOAPI = {
  ALL_VIDEOS: "/api/videos",
  SINGLE_VIDEO: "/api/video",
  ALL_CATEGORIES: "/api/categories",
  SINGLE_CATEGORY: "/api/category",
  LIKE: "/api/user/likes",
  WATCH_LATER: "/api/user/watchlater",
  PLAYLISTS: "/api/user/playlists",
  HISTORY: "/api/user/history",
};

export const AUTH_API = {
  LOGIN: "/api/auth/login",
  REGISTER: "/api/auth/signup",
};

export const ACTIONS = {
  SetVideos: "SET_VIDEOS",
  SetCategories: "SET_CATEGORIES",
  SetPlaylists: "SET_PLAYLISTS",
  SetHistory: "SET_HISTORY",
  SetWatchLater: "SET_WATCH_LATER",
  SetLikedVideos: "SET_LIKED_VIDEOS",
  SetUploadedVideo: "SET_UPLOADED_VIDEO",
  ChangeFilters: "CHANGE_FILTERS",
  ClearFilters: "CLEAR_FILTERS",
  ClearAll: "CLEAR_All",
};

export const FILTERS = {
  SortBy: "sortBy",
  Category: "category",
};

export const ToastType = {
  Warn: "warn",
  Success: "success",
  Info: "info",
  Error: "error",
};
