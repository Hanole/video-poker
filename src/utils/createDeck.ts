import type { PlayingCard, Rank, Suit } from "../types/card.type";

const suits: Suit[] = ["hearts", "diamonds", "clubs", "spades"];

const ranks: Rank[] = [
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "J",
  "Q",
  "K",
  "A",
];

export function createDeck(): PlayingCard[] {
    const deck: PlayingCard[] = [];

    for (const suit of suits) {
        for (const rank of ranks) {
            deck.push({suit, rank});
        }
    }
    
    return deck;
}
