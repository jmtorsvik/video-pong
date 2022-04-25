import { useContext, useEffect, useRef } from "react";
import "./App.css";

import { startGame } from "./lib/game";
import { canvasWidth, canvasHeight, clientId } from "./lib/gameVar";
import client from "./lib/mqtt";

export default function Game() {
  const ref = useRef();

  useEffect(() => {
    if (ref.current) {
      // create canvas variable
      const canvas = ref.current;

      // start game
      startGame(canvas);
    }
  }, []);

  return (
    <div>
      <canvas
        width={canvasWidth}
        height={canvasHeight}
        id="game"
        ref={ref}
      ></canvas>
    </div>
  );
}