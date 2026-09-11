import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Player } from "../types/player.type";

type GameStore = {
  players: Player[];
  activePlayerId: string | null;

  createPlayer: (name: string) => void;
  selectPlayer: (playerId: string) => void;
};

export const useGameStore = create<GameStore>()(
  persist(
    (set) => ({
      players: [],
      activePlayerId: null,

      createPlayer: (name: string) => {
        const newPlayer: Player = {
          id: crypto.randomUUID(),
          name,
          coins: 100,
        };
        set((state) => ({
          players: [...state.players, newPlayer],
          activePlayerId: newPlayer.id,
        }));
      },

      selectPlayer: (playerId) => {
        set({ activePlayerId: playerId });
      },
    }),
    {
      name: "video-poker-storage",
    },
  ),
);
