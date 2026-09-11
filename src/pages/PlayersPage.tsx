import { useState } from "react";
import { useGameStore } from "../store/useGameStore";
import { Link } from "react-router";

export default function PlayersPage() {
  const [name, setName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const players = useGameStore((state) => state.players);
  const activePlayerId = useGameStore((state) => state.activePlayerId);
  const createPlayer = useGameStore((state) => state.createPlayer);
  const selectPlayer = useGameStore((state) => state.selectPlayer);

  const activePlayer = players.find((player) => player.id === activePlayerId);

  function handleCreatePlayer(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmedName = name.trim();

    if (!trimmedName) {
      return;
    }

    const playerNameExists = players.some(
      (player) => player.name.toLowerCase() === trimmedName.toLocaleLowerCase(),
    );

    if (playerNameExists) {
      setErrorMessage("Dette navnet finnes allerede.");
      return;
    }

    createPlayer(trimmedName);
    setName("");
  }

  return (
    <main>
      <h1>Spillbrukere</h1>
      {activePlayer ? (
        <p>
          Aktiv spiller: {activePlayer.name} ({activePlayer.coins} coins)
        </p>
      ) : (
        <p>Velg en eksisterende spiller eller opprett en nyn spiller.</p>
      )}
      <form onSubmit={handleCreatePlayer}>
        <label htmlFor="player-name">Navn på ny spiller</label>
        <input
          id="player-name"
          type="text"
          value={name}
          onChange={(event) => {
            setName(event.target.value);
            setErrorMessage("");
          }}
          required
        />
        <button type="submit">Opprett spiller</button>
      </form>
      {errorMessage && <p role="alert">{errorMessage}</p>}

      <h2>Eksisterende spillere</h2>
      {players.length === 0 ? (
        <p>Ingen spillere</p>
      ) : (
        <ul>
          {players.map((player) => (
            <li key={player.id}>
              <button
                type="button"
                onClick={() => selectPlayer(player.id)}
                aria-pressed={player.id === activePlayerId}
              >
                {player.name} - {player.coins} mynter
              </button>
            </li>
          ))}
        </ul>
      )}

      <Link to="/">Gå tilbake til spillet</Link>
    </main>
  );
}
