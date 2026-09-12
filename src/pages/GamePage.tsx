import { createDeck } from "../utils/createDeck"

export default function GamePage() {

    const deck = createDeck();

    return (
        <div>
            <h2>Video-poker</h2>
            <p>Antall kort: {deck.length}</p>
        </div>
    )
}