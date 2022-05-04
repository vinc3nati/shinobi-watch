import { SORT_BY } from "./constants";

export const sortedVideo = (data, sortBy) => {
  if (sortBy === "") return data;
  return [...data].sort((a, b) =>
    sortBy === SORT_BY.latest
      ? b.uploadDate - a.uploadDate
      : a.uploadDate - b.uploadDate
  );
};
