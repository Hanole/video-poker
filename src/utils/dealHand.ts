import type { PlayingCard } from "../types/card.type";

export default function dealHand(deck: PlayingCard[]): PlayingCard[] {
    return deck.slice(0, 5);
}