import { act } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { capitalizeFirstLetter } from "../helpers/capitalizeFirstLetter";
import { rehydrateWithDefaults, useStore } from "./store";
import type { TStore } from "./types";

vi.useFakeTimers();

const resetStore = () => {
  useStore.setState({
    history: [],
    pendingDeletes: {},
  });
};

describe("useStore", () => {
  beforeEach(() => {
    resetStore();
  });

  it("adds a city", () => {
    useStore.getState().addCity("kyiv");
    const history = useStore.getState().history;
    expect(history.length).toBe(1);
    expect(history[0].city).toBe(capitalizeFirstLetter("kyiv"));
    expect(typeof history[0].id).toBe("string");
  });

  it("removes a city with undo window", () => {
    useStore.getState().addCity("kyiv");
    const id = useStore.getState().history[0].id;
    useStore.getState().removeCity(id);

    const updated = useStore.getState().history.find((item) => item.id === id);
    expect(updated?.removed).toBe(true);
    expect(useStore.getState().pendingDeletes[id]).toBeDefined();
  });

  it("permanently deletes after timeout", () => {
    useStore.getState().addCity("kyiv");
    const id = useStore.getState().history[0].id;
    useStore.getState().removeCity(id);

    act(() => {
      vi.advanceTimersByTime(5000);
    });

    const afterTimeout = useStore.getState().history.find((item) => item.id === id);
    expect(afterTimeout).toBeUndefined();
    expect(useStore.getState().pendingDeletes[id]).toBeUndefined();
  });

  it("undoes removal before timeout", () => {
    useStore.getState().addCity("kyiv");
    const id = useStore.getState().history[0].id;
    useStore.getState().removeCity(id);
    useStore.getState().undoRemoveCity(id);

    const updated = useStore.getState().history.find((item) => item.id === id);
    expect(updated?.removed).toBeFalsy();
    expect(useStore.getState().pendingDeletes[id]).toBeUndefined();
  });

  it("clears all pending deletions", () => {
    useStore.getState().addCity("kyiv");
    const id = useStore.getState().history[0].id;
    useStore.getState().removeCity(id);

    useStore.getState().forceRemovePending();

    expect(useStore.getState().pendingDeletes).toEqual({});
    expect(useStore.getState().pendingDeletes[id]).toBeUndefined();
  });

  it("rehydrates with default cities if state is empty", () => {
    const mockAddCity = vi.fn();

    const emptyState: TStore = {
      history: [],
      pendingDeletes: {},
      addCity: mockAddCity,
      removeCity: vi.fn(),
      undoRemoveCity: vi.fn(),
      forceRemovePending: vi.fn(),
    };

    rehydrateWithDefaults(emptyState);

    expect(mockAddCity).toHaveBeenCalledTimes(4);
    expect(mockAddCity).toHaveBeenCalledWith("Paris");
  });
});
