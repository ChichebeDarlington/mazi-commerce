import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AppProvider } from "./components/contextAPI/context/context";
import "./index.css";
import { HelmetProvider } from "react-helmet-async";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <HelmetProvider>
      <AppProvider>
        <App />
      </AppProvider>
    </HelmetProvider>
  </React.StrictMode>
);
