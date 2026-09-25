import type { PlayingCard } from "../types/card.type";

type CardProps = {
  card: PlayingCard;
  isHeld: boolean;
  disabled: boolean;
  onClick: () => void;
  isFaceDown?: boolean;
};

const suitSymbols = {
  hearts: "♥",
  diamonds: "♦",
  clubs: "♣",
  spades: "♠",
};

export function Card({ card, isHeld, disabled, onClick, isFaceDown = false, }: CardProps) {
  if(isFaceDown) {
    return (
      <div className="playing-card playing-card-backside"/>
    )
  }
  return (
    <button
      className={`playing-card ${isHeld ? "playing-card-held" : ""}`}
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-pressed={isHeld}
    >
      <span className="card-corner card-corner-top">{card.rank} {suitSymbols[card.suit]}</span>
      <span className="card-suit">{suitSymbols[card.suit]}</span>
      <span className="card-corner card-corner-bottom">{card.rank} {suitSymbols[card.suit]}</span>
    </button>
  );
}