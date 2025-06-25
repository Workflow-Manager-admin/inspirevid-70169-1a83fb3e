/* global window, document */
import { registerRoot } from "remotion";
import { RemotionRoot } from "./Root";

// For the web preview/generator page
import { createRoot } from "react-dom/client";
import { PreviewPage } from "./PreviewPage";

// Mount PreviewPage when not in Remotion Studio, enable classic Remotion otherwise
const path = typeof window !== "undefined" ? window.location.pathname : "";
if (
  path === "/" ||
  path === "/index.html" ||
  path.startsWith("/video")
) {
  // Web page for inspirational quote video preview/generation
  const rootElem =
    document.getElementById("root") ||
    (() => {
      const n = document.createElement("div");
      n.id = "root";
      document.body.appendChild(n);
      return n;
    })();
  createRoot(rootElem).render(<PreviewPage />);
} else {
  // For Remotion Studio sidebar
  registerRoot(RemotionRoot);
}
