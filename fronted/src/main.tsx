import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

console.log("✅ main.tsx Loaded");

const rootElement = document.getElementById("root");

if (rootElement) {
  console.log("✅ Root element found, rendering App...");
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
} else {
  console.error("❌ Root element NOT found!");
}
    