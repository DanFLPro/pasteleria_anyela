import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

// Punto de entrada: monta la aplicación dentro del <div id="root"> de index.html
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
