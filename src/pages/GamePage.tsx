import { useGameStore } from "../store/useGameStore";
import "./../styles/GamePage.css";
import { PayoutTable } from "../components/PayoutTable";
import { Link } from "react-router";
import { TotalCoins } from "../components/TotalCoins";
import { CurrentBet } from "../components/CurrentBet";
import { CurrentHand } from "../components/CurrentHand";

const suitSymbols = {
  hearts: "♥",
  diamonds: "♦",
  clubs: "♣",
  spades: "♠",
};

export default function GamePage() {
  const startRound = useGameStore((state) => state.startRound);
  const hand = useGameStore((state) => state.hand);

  const drawNewCards = useGameStore((state) => state.drawNewCards);

  const heldCardIndexes = useGameStore((state) => state.heldCardIndexes);
  const toggleHeldCard = useGameStore((state) => state.toggleHeldCard);
  const hasDrawn = useGameStore((state) => state.hasDrawn);
  const handResult = useGameStore((state) => state.handResult);
  const players = useGameStore((state) => state.players);
  const selectPlayer = useGameStore((state) => state.selectPlayer);
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
        {activePlayer ? (
          <>
            <div className="player-info">
              <p>Spiller:</p>
              <p>{activePlayer.name}</p>
              <TotalCoins coins={activePlayer.coins} />
            </div>

            <div className="bets-controller">
              <CurrentBet betAmount={betAmount} />

              <div className="bet-buttons">
                {[1, 2, 3, 4, 5].map((amount) => (
                  <button
                    className="control-buttons"
                    key={amount}
                    type="button"
                    onClick={() => setBetAmount(amount)}
                    disabled={isRoundInProgress || activePlayer.coins < amount}
                  >
                    {amount}
                  </button>
                ))}
              </div>

              <button
                className="control-buttons"
                type="button"
                onClick={startRound}
                disabled={activePlayer.coins < betAmount || isRoundInProgress}
              >
                {hasHand ? "Start ny runde" : "Start runde"}
              </button>
            </div>
          </>
        ) : (
          <>
            <p>
              Velg eller <Link to="/players">opprett en spiller.</Link>
            </p>
            <ul>
              {players.map((player) => (
                <li key={player.id}>
                  <button
                    className="control-buttons"
                    type="button"
                    onClick={() => selectPlayer(player.id)}
                    aria-pressed={player.id === activePlayerId}
                  >
                    {player.name} - {player.coins} mynter
                  </button>
                </li>
              ))}
            </ul>
          </>
        )}

        <p>Utdelt hånd</p>

        {hasHand ? (
          <ul className="hand-container">
            {hand.map((card, index) => {
              const isHeld = heldCardIndexes.includes(index);
              return (
                <li key={`${card.suit}-${card.rank}-${index}`}>
                  <button
                    className={`playing-card ${isHeld ? "playing-card-held" : ""}`}
                    type="button"
                    onClick={() => toggleHeldCard(index)}
                    disabled={hasDrawn}
                  >
                    {card.rank} {suitSymbols[card.suit]}
                  </button>
                </li>
              );
            })}
          </ul>
        ) : (
          <p> Klikk "Start runde" for å starte.</p>
        )}

        {hasHand && !hasDrawn && (
          <button
            className="control-buttons"
            type="button"
            onClick={drawNewCards}
          >
            Trekk nye kort
          </button>
        )}

        {hasHand && hasDrawn && (
          <>
            <CurrentHand handResult={handResult} />
            {lastPayout > 0 && <p>Du vant {lastPayout} mynter!</p>}
            <p>Runden er ferdig. Klikk start ny runde for å spille igjen.</p>
          </>
        )}
        {activePlayer && <PayoutTable betAmount={betAmount} />}
      </div>
    </div>
  );
}
