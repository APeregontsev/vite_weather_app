import React from "react";
import { useStore } from "../../store/store";

export const useDeletePendingOnUnload = () => {
  const { forceRemovePending } = useStore();

  React.useEffect(() => {
    const handleBeforeUnload = () => {
      forceRemovePending();
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [forceRemovePending]);
};
