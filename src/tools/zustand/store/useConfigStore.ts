import { create } from "zustand";

export const useConfigStore = create((set) => ({
  lang: "zh-CN",
  theme: "light",
  setLang: (lang: string) => set({ lang }),
  setTheme: (theme: string) => set({ theme }),
}));
