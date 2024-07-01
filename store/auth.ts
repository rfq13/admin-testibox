"use client";

import { create } from "zustand";

export const useAuth = create((set) => ({
  user: null,
  setUser: (user: any) => set({ user }),
}));
