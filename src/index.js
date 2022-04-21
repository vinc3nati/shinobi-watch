import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import { makeServer } from "./server";
import ScrollToTop from "./ScrollToTop";
import { ThemeProvider } from "./context/theme-context";
import { DataProvider } from "./context/data-context";

// Call make Server
makeServer();

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <ThemeProvider>
        <DataProvider>
          <ScrollToTop />
          <App />
        </DataProvider>
      </ThemeProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
