import React, { useEffect } from "react";
import { capitalize } from "../utils/capitalize";

export const useDocumentTitle = (title) => {
  useEffect(() => {
    document.title = `Shinobi Watch | ${capitalize(title)}`;
  }, [title]);
};
