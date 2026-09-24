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
  return (
    <button
      className={`playing-card ${isHeld ? "playing-card-held" : ""}`}
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-pressed={isHeld}
    >
      {card.rank} {suitSymbols[card.suit]}
    </button>
  );
}