export type CityItem = {
  id: string;
  city: string;
  timestamp: number;
  removed?: boolean;
};

export type TStore = {
  history: CityItem[];
  pendingDeletes: Partial<Record<string, ReturnType<typeof setTimeout>>>;
  addCity: (city: string) => void;
  removeCity: (id: string) => void;
  undoRemoveCity: (id: string) => void;
  forceRemovePending: () => void;
};
