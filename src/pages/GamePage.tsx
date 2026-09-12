import { createDeck } from "../utils/createDeck"
import { shuffleDeck } from "../utils/shuffleDeck";

export default function GamePage() {

    const deck = createDeck();
    const shuffledDeck = shuffleDeck(deck);

    return (
        <div>
            <h2>Video-poker</h2>
            <p>Antall kort: {deck.length}</p>
            <p>Stokket: {shuffledDeck.length}</p>

            <p>Original kortstokk: {deck[0].rank} {deck[0].suit}</p>
            <p>Stokket kortstokk: {shuffledDeck[0].rank} {shuffledDeck[0].suit}</p>
        </div>
    )
}