import App from "./App.jsx";
import { StrictMode } from "react";
import "../assets/scss/index.scss";
import { createRoot } from "react-dom/client";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
