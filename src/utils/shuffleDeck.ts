import type { PlayingCard } from "../types/card.type";

export function shuffleDeck(deck: PlayingCard[]): PlayingCard[] {
    const shuffledDeck = [...deck] 

    for (
        let currentIndex = shuffledDeck.length - 1;
        currentIndex > 0;
        currentIndex--
    ) {
        const randomIndex = Math.floor(
            Math.random() * (currentIndex + 1),
        );

        [shuffledDeck[currentIndex], shuffledDeck[randomIndex]] = [
            shuffledDeck[randomIndex],
            shuffledDeck[currentIndex],
        ];
    }

    return shuffledDeck
}