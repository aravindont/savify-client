import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
// fontawesome icons
import "../node_modules/@fortawesome/fontawesome-free/css/all.css";

// bootstrap css
import "../node_modules/bootstrap/dist/css/bootstrap.css";

// bootstrap js
import "../node_modules/bootstrap/dist/js/bootstrap.bundle";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
