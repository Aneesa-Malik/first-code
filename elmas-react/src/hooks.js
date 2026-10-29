import { useEffect } from "react";

export function useDocumentTitle(title) {
  useEffect(() => {
    document.title = title;
  }, [title]);
}

export const formatRs = (n) => "Rs. " + Number(n).toLocaleString("en-US");
