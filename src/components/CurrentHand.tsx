import type { HandResult } from "../utils/evaluateHand";

type CurrentHandProps = {
  handResult: HandResult | null;
};

export function CurrentHand({ handResult }: CurrentHandProps) {
  return <p>Resultat: {handResult ?? ""}</p>;
}