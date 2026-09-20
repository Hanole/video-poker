import type { HandResult } from "./evaluateHand";

export const payouts: Record<HandResult, number> = {
    "Ingen gevinst": 0,
    "Jacks or Better": 1,
    "To par": 2,
    "Tre like": 3,
    "Straight": 4,
    "Flush": 6,
    "Fullt hus": 9,
    "Fire like": 25,
    "Straight flush": 50,
    "Royal flush": 1000,
};