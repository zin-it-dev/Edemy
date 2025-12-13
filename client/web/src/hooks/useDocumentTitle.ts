import { useEffect } from "react";

function useDocumentTitle(title?: string) {
  useEffect(() => {
    if (!title) return;
    document.title = `${title} | Edemy 🎓`;
  }, [title]);
}

export default useDocumentTitle;
