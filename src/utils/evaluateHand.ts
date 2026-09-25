import type { PlayingCard } from "../types/card.type";

export type HandResult =
  | "Ingen gevinst"
  | "Jacks or Better"
  | "To par"
  | "Tre like"
  | "Straight"
  | "Flush"
  | "Fullt hus"
  | "Fire like"
  | "Straight flush"
  | "Royal flush";

const rankValues: Record<string, number> = {
  "2": 2,
  "3": 3,
  "4": 4,
  "5": 5,
  "6": 6,
  "7": 7,
  "8": 8,
  "9": 9,
  "10": 10,
  J: 11,
  Q: 12,
  K: 13,
  A: 14,
};

export function evaluateHand(hand: PlayingCard[]): HandResult {
  const rankCounts = hand.reduce<Record<string, number>>((counts, card) => {
    counts[card.rank] = (counts[card.rank] ?? 0) + 1;
    return counts;
  }, {});

  const counts = Object.values(rankCounts).sort((a, b) => b - a);

  const isFlush = hand.every((card) => card.suit === hand[0].suit);

  const sortedRankValues = hand
    .map((card) => rankValues[card.rank])
    .sort((a, b) => a - b);

  const isRegularStraight = sortedRankValues.every(
    (value, index) => index === 0 || value === sortedRankValues[index - 1] + 1,
  );

  const isWheelStraight = sortedRankValues.join(",") === "2,3,4,5,14";

  const isStraight = isRegularStraight || isWheelStraight;

  const isRoyal = sortedRankValues.join(",") === "10,11,12,13,14";

  const hasFourOfAKind = counts[0] === 4;
  const hasFullHouse = counts[0] === 3 && counts[1] === 2;
  const hasThreeOfAKind = counts[0] === 3;
  const hasTwoPair = counts[0] === 2 && counts[1] === 2;
  const hasPair = counts[0] === 2;

  if (isRoyal && isFlush) {
    return "Royal flush";
  }

  if (isStraight && isFlush) {
    return "Straight flush";
  }

  if (hasFourOfAKind) {
    return "Fire like";
  }

  if (hasFullHouse) {
    return "Fullt hus";
  }

  if (isFlush) {
    return "Flush";
  }

  if (isStraight) {
    return "Straight";
  }

  if (hasThreeOfAKind) {
    return "Tre like";
  }

  if (hasTwoPair) {
    return "To par";
  }

  if (hasPair) {
    const pairRank = Object.entries(rankCounts).find(
      ([, count]) => count === 2,
    )?.[0];

    const highRanks = ["J", "Q", "K", "A"];

    if (pairRank && highRanks.includes(pairRank)) {
      return "Jacks or Better";
    }
  }

  return "Ingen gevinst";
}
