import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import { makeServer } from "./server";
import ScrollToTop from "./ScrollToTop";
import { ThemeProvider } from "./context/theme-context";
import { DataProvider } from "./context/data-context";
import { AuthProvider } from "./context";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";

// Call make Server
makeServer();

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <ThemeProvider>
        <AuthProvider>
          <DataProvider>
            <ScrollToTop />
            <App />
          </DataProvider>
        </AuthProvider>
      </ThemeProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);

serviceWorkerRegistration.register();
