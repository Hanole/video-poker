import { useGameStore } from "../store/useGameStore";
import "./../styles/GamePage.css";
import { PayoutTable } from "../components/PayoutTable";

export default function GamePage() {
  const startRound = useGameStore((state) => state.startRound);
  const hand = useGameStore((state) => state.hand);
  const deck = useGameStore((state) => state.deck);

  const drawNewCards = useGameStore((state) => state.drawNewCards);

  const heldCardIndexes = useGameStore((state) => state.heldCardIndexes);
  const toggleHeldCard = useGameStore((state) => state.toggleHeldCard);
  const hasDrawn = useGameStore((state) => state.hasDrawn);
  const handResult = useGameStore((state) => state.handResult);
  const players = useGameStore((state) => state.players);
  const activePlayerId = useGameStore((state) => state.activePlayerId);
  const betAmount = useGameStore((state) => state.betAmount);
  const setBetAmount = useGameStore((state) => state.setBetAmount);
  const lastPayout = useGameStore((state) => state.lastPayout);

  const activePlayer = players.find((player) => player.id === activePlayerId);

  const hasHand = hand.length > 0;

  const isRoundInProgress = hasHand && !hasDrawn;

  return (
    <div className="game-page-container">
      <div className="game-page-div">
        <h2>Video-poker</h2>
        {activePlayer && <PayoutTable betAmount={betAmount} />}
        {activePlayer ? (
          <>
            <p>Spiller: {activePlayer.name}</p>
            <p>Saldo: {activePlayer.coins} mynter</p>
            <div>
              <p>
                Innsats: {betAmount} {betAmount === 1 ? "mynt" : "mynter"}
              </p>

              {[1, 2, 3, 4, 5].map((amount) => (
                <button
                  key={amount}
                  type="button"
                  onClick={() => setBetAmount(amount)}
                  disabled={isRoundInProgress || activePlayer.coins < amount}
                >
                  {amount}
                </button>
              ))}
            </div>
          </>
        ) : (
          <p>Velg eller opprett en spiller.</p>
        )}
        <button
          type="button"
          onClick={startRound}
          disabled={!activePlayer || activePlayer.coins < betAmount || isRoundInProgress}
        >
          {hasHand ? "Start ny runde" : "Start runde"}
        </button>
        <p>Utdelt hånd</p>

        {hasHand ? (
          <ul className="hand-container">
            {hand.map((card, index) => {
              const isHeld = heldCardIndexes.includes(index);
              return (
                <li key={`${card.suit}-${card.rank}-${index}`}>
                  <button
                    type="button"
                    onClick={() => toggleHeldCard(index)}
                    disabled={hasDrawn}
                  >
                    {card.rank} {card.suit} {isHeld ? "(beholdes)" : ""}
                  </button>
                </li>
              );
            })}
          </ul>
        ) : (
          <p> Klikk "Start runde" for å starte.</p>
        )}

        <p>Kort som er igjen: {deck.length}</p>

        {hasHand && !hasDrawn && (
          <button type="button" onClick={drawNewCards}>
            Trekk nye kort
          </button>
        )}

        {hasHand && hasDrawn && (
          <>
            <p>Resultat: {handResult}</p>
            {lastPayout > 0 ? (
              <p>Du vant {lastPayout} mynter!</p>
            ) : (
              <p>Ingen gevinst</p>
            )}
            <p>Runden er ferdig. Klikk start ny runde for å spille igjen.</p>
          </>
        )}
      </div>
    </div>
  );
}
