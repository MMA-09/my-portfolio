import { create } from 'zustand';

export const useProgress = create(() => ({
  offset: 0,
  velocity: 0,
}));
