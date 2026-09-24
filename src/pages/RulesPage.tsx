import { PayoutTable } from "../components/PayoutTable";
import { useGameStore } from "../store/useGameStore";
import "./../styles/RulesPage.css";

export default function RulesPage() {
  const betAmount = useGameStore((state) => state.betAmount);

  return (
    <main className="rules-page-container">
      <div className="rules-page-div">
        <h2>Regelverk</h2>
        <div>
          <p>Slik spiller du:</p>
          <ul className="rules-list">
            <li>1. Velg en spiller.</li>
            <li>2. Velg innsats.</li>
            <li>3. Trykk «Start runde».</li>
            <li>4. Klikk på kortene du vil beholde.</li>
            <li>5. Trykk «Trekk nye kort».</li>
            <li>6. Gevinst beregnes ut fra pokerhånden og innsatsen. </li>
          </ul>
        </div>
        <PayoutTable betAmount={betAmount} />
      </div>
    </main>
  );
}
