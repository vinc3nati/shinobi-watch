import axios from "axios";
import { VIDEOAPI } from "../utils/constants";

export const getAllVideos = async () => await axios.get(VIDEOAPI.ALL_VIDEOS);

export const updateVideo = async ({ videoId, comments }) =>
  axios.post(`${VIDEOAPI.SINGLE_VIDEO}/${videoId}`, { comments });

export const getAllCategories = async () => axios.get(VIDEOAPI.ALL_CATEGORIES);

export const getLikedVideos = async ({ token }) =>
  axios.get(VIDEOAPI.LIKE, {
    headers: {
      authorization: token,
    },
  });

export const addLikedVideos = async ({ token, video }) =>
  axios.post(
    VIDEOAPI.LIKE,
    { video },
    {
      headers: {
        authorization: token,
      },
    }
  );

export const removeLikedVideos = async ({ token, videoId }) =>
  axios.delete(`${VIDEOAPI.LIKE}/${videoId}`, {
    headers: {
      authorization: token,
    },
  });

export const getWatchlaterVideos = async ({ token }) =>
  await axios.get(VIDEOAPI.WATCH_LATER, {
    headers: {
      authorization: token,
    },
  });

export const postWatchlaterVideos = async ({ token, video }) =>
  await axios.post(
    VIDEOAPI.WATCH_LATER,
    { video },
    {
      headers: {
        authorization: token,
      },
    }
  );

export const deleteWatchlaterVideos = async ({ token, videoId }) =>
  await axios.delete(`${VIDEOAPI.WATCH_LATER}/${videoId}`, {
    headers: {
      authorization: token,
    },
  });

export const getAllHistory = async ({ token }) =>
  await axios.get(VIDEOAPI.HISTORY, {
    headers: {
      authorization: token,
    },
  });

export const postHistory = async ({ token, video }) =>
  await axios.post(
    VIDEOAPI.HISTORY,
    { video },
    {
      headers: {
        authorization: token,
      },
    }
  );

export const deleteHistory = async ({ token, videoId }) =>
  await axios.delete(`${VIDEOAPI.HISTORY}/${videoId}`, {
    headers: {
      authorization: token,
    },
  });

export const deleteAllHistory = async ({ token }) =>
  await axios.delete(`${VIDEOAPI.HISTORY}/all`, {
    headers: {
      authorization: token,
    },
  });
