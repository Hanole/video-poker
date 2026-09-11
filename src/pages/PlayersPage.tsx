import { useState } from "react";
import { useGameStore } from "../store/useGameStore";
import { Link } from "react-router";

export default function PlayersPage() {
const [name, setName] = useState("");
const players = useGameStore((state) => state.players);
const activePlayerId = useGameStore((state) => state.activePlayerId);
const createPlayer = useGameStore((state) => state.createPlayer);
const selectPlayer = useGameStore((state) => state.selectPlayer);

function handleCreatePlayer(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmedName = name.trim();

    if (!trimmedName) {
        return;
    }

    createPlayer(trimmedName);
    setName("");
}

    return (
        <main>
            <h1>Velg spiller</h1>
            <form onSubmit={handleCreatePlayer}>
                <label htmlFor="player-name">Navn på ny spiller</label>
                <input id="player-name" type="text" value={name} onChange={(event) => setName(event.target.value)} />
                <button type="submit">Opprett spiller</button>
            </form>

            <h2>Eksisterende spillere</h2>
            {players.length === 0 ?  (
                <p>Ingen spillere</p> ) : (
                    <ul>
                        {players.map((player) => (
                            <li key={player.id}>
                                <button type="button" onClick={() => selectPlayer(player.id)} aria-pressed={player.id === activePlayerId}>
                                    {player.name} - {player.coins} mynter
                                </button>
                            </li>
                        ))}
                    </ul>
                )}

                <Link to="/">Gå tilbake til spillet</Link>
        </main>
    )
}