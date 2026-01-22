import { stat } from "fs";
import { create } from "zustand";

type ErrObject = {
  status: number;
  message: string;
};

type ErrorMessage = {
  error: ErrObject | null;
  setErrorObject: (status: number, message: string) => void;
  clearError: () => void;
};

export const useCreateError = create<ErrorMessage>((set) => ({
  error: null,
  setErrorObject: (status, message) =>
    set({
      error: {
        message,
        status,
      },
    }),

  clearError: () => set({ error: null }),
}));
