import axios from "axios";
import { VIDEOAPI } from "../utils/constants";

export const getAllVideos = async () => await axios.get(VIDEOAPI.ALL_VIDEOS);

export const updateVideo = async ({ videoId, comments }) =>
  axios.post(`${VIDEOAPI.SINGLE_VIDEO}/${videoId}`, { comments });

export const getAllCategories = async () => axios.get(VIDEOAPI.ALL_CATEGORIES);
