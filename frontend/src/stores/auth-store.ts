import { devtools, persist, createJSONStorage } from "zustand/middleware";
import { create } from "zustand";
import { ILoginData } from "@/services/api/auth/auth";
import { createSelectors } from "@/lib/utils";

interface AuthStore {
  _ui: ILoginData | null;
  _ia: boolean;
  _r: Array<string>;
  _p: Array<string>;
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
          _r: [],
          _p: [],
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
              _r: [],
              _p: [],
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
