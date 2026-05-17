import { create } from "zustand";

type Category = "ippon" | "nihon" | "sanbon";

type Settings = {
  akaName: string;
  aoName: string;
  category: Category;
  minutes: string;
  seconds: string;

  setAkaName: (v: string) => void;
  setAoName: (v: string) => void;
  setCategory: (v: Category) => void;
  setMinutes: (v: string) => void;
  setSeconds: (v: string) => void;
};

export const useSettings = create<Settings>((set) => ({
  akaName: "",
  aoName: "",
  category: "",
  minutes: "",
  seconds: "",

  setAkaName: (v) => set({ akaName: v }),
  setAoName: (v) => set({ aoName: v }),
  setCategory: (v) => set({ category: v }),
  setMinutes: (v) => set({ minutes: v }),
  setSeconds: (v) => set({ seconds: v }),
}));
