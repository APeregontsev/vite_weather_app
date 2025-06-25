import { v4 as uuidv4 } from "uuid";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { capitalizeFirstLetter } from "../helpers/capitalizeFirstLetter";
import type { CityItem, TStore } from "./types";

const UNDO_INTERVAL_MS = 3000; // after which the item will be permanently deleted from the history --> 3_sec

export const useStore = create<TStore>()(
  persist(
    (set, get) => ({
      history: [],
      pendingDeletes: {},

      addCity: (city) => {
        const { history } = get();

        const newItem: CityItem = {
          id: uuidv4(),
          city: capitalizeFirstLetter(city),
          timestamp: Date.now(),
        };

        set({
          history: [...history, newItem],
        });
      },

      removeCity: (id) => {
        const { history, pendingDeletes } = get();

        const updatedHistory = history.map((item) => (item.id === id ? { ...item, removed: true } : item));

        const timeout = setTimeout(() => {
          set((state) => {
            const { [id]: _, ...rest } = state.pendingDeletes;
            return {
              history: state.history.filter((item) => item.id !== id),
              pendingDeletes: rest,
            };
          });
        }, UNDO_INTERVAL_MS);

        set({
          history: updatedHistory,
          pendingDeletes: { ...pendingDeletes, [id]: timeout },
        });
      },

      undoRemoveCity: (id) => {
        const { history, pendingDeletes } = get();
        const timeout = pendingDeletes[id];
        if (timeout) {
          clearTimeout(timeout);
          const restoredHistory = history.map((item) =>
            item.id === id ? { ...item, removed: false } : item
          );
          set((state) => ({
            history: restoredHistory,
            pendingDeletes: { ...state.pendingDeletes, [id]: undefined },
          }));
        }
      },

      forceRemovePending: () => {
        const { pendingDeletes } = get();
        Object.values(pendingDeletes).forEach((timeout) => {
          if (timeout) clearTimeout(timeout);
        });
        set((state) => ({
          history: state.history.filter((item) => !item.removed),
          pendingDeletes: {},
        }));
      },
    }),
    {
      name: "weather-history",
      partialize: (state) => ({
        history: state.history,
      }),
      onRehydrateStorage: () => rehydrateWithDefaults,
    }
  )
);

export function rehydrateWithDefaults(state: TStore | undefined) {
  if (!state || !state.history || state.history.length === 0) {
    state?.addCity?.("Paris");
    state?.addCity?.("Berlin");
    state?.addCity?.("London");
    state?.addCity?.("Kiev");
  }
}
