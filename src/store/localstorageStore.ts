const STORAGE_KEY = "kumite-state";

export const saveState = (state: any) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
};

export const loadState = () => {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : null;
};
