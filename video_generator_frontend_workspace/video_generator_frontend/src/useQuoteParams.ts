// Allow browser globals for ESLint
/* global window, localStorage, URLSearchParams */
import { useEffect, useState } from "react";

type QuoteData = {
  quote: string;
  author: string;
};

/** Parses quote and author from URL parameters, or localStorage as fallback. */
export function useQuoteParams(): QuoteData | null {
  const [data, setData] = useState<QuoteData | null>(null);

  useEffect(() => {
    let quote = "";
    let author = "";
    try {
      const params = new URLSearchParams(window.location.search);
      quote = params.get("quote") || "";
      author = params.get("author") || "";

      if (!quote || !author) {
        // Try localStorage fallback
        const stored = localStorage.getItem("selected_quote");
        if (stored) {
          const obj = JSON.parse(stored);
          quote = obj.quote || quote;
          author = obj.author || author;
        }
      }
    } catch {
      // Ignore JSON errors and handle gracefully
    }

    if (quote && author) {
      setData({ quote, author });
    } else {
      setData(null);
    }
  }, []);

  return data;
}
