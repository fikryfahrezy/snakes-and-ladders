import { useState } from "react";
import "./App.css";
import { displayPlayerIndexOutput } from "./foobar";

const SIZE = 10;
const SNAKES_LADDERS = [
  [2, 38],
  [7, 14],
  [8, 31],
  [15, 26],
  [28, 84],
  [16, 6],
  [40, 11],
  [62, 19],
  [64, 60],
  [99, 80],
] as const;

const SNAKE_LADDER_LOOKUP = Object.freeze(Object.fromEntries(SNAKES_LADDERS));
const ROWS = Object.freeze(
  Array(SIZE)
    .fill(0)
    .map((_, rowIdx) => {
      const COLS = Array(SIZE)
        .fill(0)
        .map((_, cellIdx) => {
          const cell = rowIdx * 10 + cellIdx + 1;
          return { cell };
        });

      return COLS;
    }),
);

export function App() {
  // Player start on square 1
  const [playerCell, setPlayerCell] = useState(1);

  const onMoveSubmit = (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const objectData = Object.fromEntries(formData);
    const move = Number(objectData["move"]);

    let nextCell = playerCell + move;
    const lastCell = ROWS[ROWS.length - 1].slice(-1)[0].cell;
    if (nextCell > lastCell) {
      // Go to the last cell first and go back as many steps remains
      nextCell = lastCell - (nextCell - lastCell);
    }

    const teleportDestination = SNAKE_LADDER_LOOKUP[nextCell];
    setPlayerCell(teleportDestination || nextCell);
  };

  return (
    <main>
      <div className="board-area">
        <div className="board">
          {ROWS.map((cols, rowIdx) => {
            return (
              <div
                key={rowIdx}
                className={`row ${rowIdx % 2 !== 0 ? "row-reverse" : ""}`}
              >
                {cols.map(({ cell }, colIdx) => {
                  const teleportDestination = SNAKE_LADDER_LOOKUP[cell];

                  return (
                    <div key={colIdx} className="cell">
                      <span className="cell-num">{cell}</span>
                      {teleportDestination && (
                        <span
                          className={`teleport-num ${teleportDestination > cell ? "teleport-up" : "teleport-down"}`}
                        >
                          {teleportDestination}
                        </span>
                      )}
                      {playerCell === cell && <span className="player">P</span>}
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
        <div className="board-stats">
          <p>Player position: {displayPlayerIndexOutput(playerCell)}</p>
        </div>
      </div>
      <aside>
        <h1>Snakes and Ladders</h1>
        <form onSubmit={onMoveSubmit}>
          <label htmlFor="move">Player Move</label>
          <input
            id="move"
            name="move"
            type="number"
            placeholder="Set move..."
            min={1}
            max={6}
            step={1}
            required
          />
          <button type="submit">Move</button>
        </form>
      </aside>
    </main>
  );
}
