import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Player } from "../types/player.type";
import type { PlayingCard } from "../types/card.type";
import { createDeck } from "../utils/createDeck";
import { shuffleDeck } from "../utils/shuffleDeck";

import { evaluateHand, type HandResult, } from "../utils/evaluateHand";
import { payouts } from "../utils/payouts";

type GameStore = {
  players: Player[];
  activePlayerId: string | null;

  deck: PlayingCard[];
  hand: PlayingCard[];
  heldCardIndexes: number[];
  discardedCards: PlayingCard[];
  hasDrawn: boolean;
  handResult: HandResult | null;
  betAmount: number;
  lastPayout: number;

  createPlayer: (name: string) => void;
  selectPlayer: (playerId: string) => void;
  startRound: () => void;
  toggleHeldCard: (cardIndex: number) => void;
  drawNewCards: () => void;
  setBetAmount: (amount: number) => void;
};

export const useGameStore = create<GameStore>()(
  persist(
    (set) => ({
      players: [],
      activePlayerId: null,
      deck: [],
      hand: [],
      heldCardIndexes: [],
      discardedCards: [],
      hasDrawn: false,
      handResult: null,
      betAmount: 1,
      lastPayout: 0,

      setBetAmount: (amount) => {
        set((state) => {
          if(state.hand.length > 0 && !state.hasDrawn) {
            return {};
          }

          const maxiumBet = 5;
          const validAmount = Math.min(
            Math.max(amount, 1),
            maxiumBet,
          );
          return {
            betAmount: validAmount,
          }
        })
      },

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


      // starter en ny runde, trekker innsatsen og deler ut fem kort. samt nullstiller status.
      startRound: () => {
        set((state) => {
          const activePlayer = state.players.find(
            (player) => player.id === state.activePlayerId,
          );

          if (!activePlayer || activePlayer.coins < state.betAmount) {
            return {};
          }
          const shuffledDeck = shuffleDeck(createDeck());

          const hand = shuffledDeck.slice(0, 5);
          const remainingDeck = shuffledDeck.slice(5);

          const updatedPlayers = state.players.map((player) => {
            if (player.id !== activePlayer.id) {
              return player;
            }
            return {
              ...player, coins: player.coins - state.betAmount,
            }
          });

          return {
            players: updatedPlayers,
            hand,
            deck: remainingDeck,
            heldCardIndexes: [],
            discardedCards: [],
            hasDrawn: false,
            handResult: null,
            lastPayout: 0,
          };
        })
      },

      // sjekker om kortets index finnes i heldCardIndexes
      toggleHeldCard: (cardIndex) => {
        set((state) => {
          const isHeld = state.heldCardIndexes.includes(cardIndex);

          // kortet er holdt fra før, index fjernes
          if (isHeld) {
            return {
              heldCardIndexes: state.heldCardIndexes.filter(
                (index) => index !== cardIndex,
              ),
            };
          }

          // kortet er ikke holdt fra før, index legges til
          return {
            heldCardIndexes: [...state.heldCardIndexes, cardIndex],
          };
        });
      },

      // gjennomfører rundens eneste draw og oppdaterer hånd, resultat og gevinst
      drawNewCards: () => {
        set((state) => {
          // sikkerhetstiltak slik at man ikke draw uten hånd eller gjøre flere draws i samme runde
          if (state.hasDrawn || state.hand.length === 0) {
            return {};
          }

          // filtrere kort som ikke er valgt som hodlt
          const discardedCards = state.hand.filter(
            (_, index) => !state.heldCardIndexes.includes(index),
          );
          
          const numberOfNewCards = discardedCards.length;

          const newCards = state.deck.slice(0, numberOfNewCards)
          const remainingDeck = state.deck.slice(numberOfNewCards);

          let newCardIndex = 0;

          //beholder valgte kort på samme plass og erstatter resten
          const updatedHand = state.hand.map((card, index) => {
            const isHeld = state.heldCardIndexes.includes(index);

            if (isHeld) {
              return card;
            }

            const newCard = newCards[newCardIndex];
            newCardIndex += 1;
            return newCard;
          })

          const handResult = evaluateHand(updatedHand);

          const payoutMultiplier = payouts[handResult];
          const lastPayout = state.betAmount * payoutMultiplier;

          // evt gevinst til aktiv spiller
          const updatedPlayers = state.players.map((player) => {
            if (player.id !== state.activePlayerId) {
              return player;
            }
            return {
              ...player, coins: player.coins + lastPayout,
            }
          })

          return {
            players: updatedPlayers,
            hand: updatedHand,
            deck: remainingDeck,
            discardedCards,
            heldCardIndexes: [],
            hasDrawn: true,
            handResult,
            lastPayout,
          }
        })
      },
    }),
    {
      name: "video-poker-storage",
      partialize: (state) => ({
        players: state.players,
        activePlayerId: state.activePlayerId,
      }),
    },
  ),
);
