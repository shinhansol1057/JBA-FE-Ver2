import { create } from "zustand";
import { persist } from "zustand/middleware";

type postStore = {
  postCategory: string;
  setPostCategory: (postCategory: string) => void;
};

export const usePostStore = create(
  persist<postStore>(
    (set) => ({
      postCategory: "notice",
      setPostCategory: (postCategory: string) =>
        set({ postCategory: postCategory }),
    }),
    {
      name: "postStore",
    },
  ),
);
