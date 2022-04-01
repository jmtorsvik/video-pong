import { useEffect, useRef } from "react";
import "./App.css";

import { startGame } from "./lib/game";

export default function App() {
    const ref = useRef();

    useEffect(() => {
        // start game if canvas is mounted
        console.log("YOLO");
        if (ref.current) {
            console.log("Hey");
            //startGame(ref);
        }
    }, []);

    return (
        <div>
            <canvas width="750" height="585" id="game" ref={ref}></canvas>
        </div>
    );
}
