import type { HandResult } from "../utils/evaluateHand";
import { payouts } from "../utils/payouts";

type PayoutTableProps = {
  betAmount: number;
};

const handResult: HandResult[] = [
  "Royal flush",
  "Straight flush",
  "Fire like",
  "Fullt hus",
  "Flush",
  "Straight",
  "Tre like",
  "To par",
  "Jacks or Better",
];


export function PayoutTable({ betAmount }: PayoutTableProps) {
    return (
        <section className="payout-section">
            <h3>Utbetalinger</h3>
            <table className="payout-table">
                <thead>
                    <tr>
                        <th scope="col">Hånd</th>
                        <th scope="col">Utbetaling</th>
                    </tr>
                </thead>

                <tbody>
                    {handResult.map((result) => (
                        <tr key={result}>
                            <td>{result}</td>
                            <td>{payouts[result] * betAmount} mynter</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </section>
    )
}