/* global document */
import { createRoot } from "react-dom/client";
import App from "./App";

// Mount App on root div for single-page quote UI
const container = document.getElementById("root");
if (container) {
  const root = createRoot(container);
  root.render(<App />);
}
