import { create } from "zustand";
import { persist } from "zustand/middleware";

type userState = {
  AccessToken: string | null;
  setAccessToken: (token: string | null) => void;
  isHydrated: boolean;
  setHydrated: (hydrated: boolean) => void;
};

export const useUserStore = create(
  persist<userState>(
    (set) => ({
      AccessToken: null,
      setAccessToken: (AccessToken) => set({ AccessToken }),
      isHydrated: false, // 초기 Hydration 상태 추가
      setHydrated: (hydrated) => set({ isHydrated: hydrated }),
    }),
    {
      name: "userStore",
      onRehydrateStorage: () => (state) => {
        state?.setHydrated(true); // 상태가 복원되면 Hydration 완료
      },
    },
  ),
);
