import { devtools, persist, createJSONStorage } from "zustand/middleware";
import { create } from "zustand";
import { createSelectors } from "@/lib/utils";
import { ILoginData } from "@/types/global";

interface AuthStore {
  _ui: ILoginData | null;
  _ia: boolean;
  setUserInformation: (partialState: Partial<ILoginData>) => void;
  setIsAuthenticated: (value: boolean) => void;
  resetUserInformation: () => void;
}

export const useAuthStore = createSelectors(
  create<AuthStore>()(
    devtools(
      persist(
        (set, get) => ({
          _ui: null,
          _ia: false,
          setUserInformation: (partialState) => {
            set((state) => ({
              _ui: state._ui
                ? { ...state._ui, ...partialState }
                : (partialState as ILoginData),
            }));
          },
          setIsAuthenticated: (value) => {
            set(() => ({
              _ia: value,
            }));
          },
          resetUserInformation: () => {
            set(() => ({
              _ui: null,
              _ia: false,
            }));
          },
        }),
        {
          name: "DONOT_EDIT",
          storage: createJSONStorage(() => localStorage),
        }
      )
    )
  )
);
