import { memo, useContext, useEffect, useRef } from "react";
import "../App.css";
import { startGame } from "../lib/game";
import { resetBall } from "../lib/gameFunc";
import {
  canvasWidth,
  canvasHeight,
  rightPlayer,
  leftPlayer,
  pending,
  globalGame,
} from "../lib/gameVar";
import client from "../lib/mqtt";
import { GameContext } from "./GameContext";

export function Game() {
  const ref = useRef();

  const { game, setGame } = useContext(GameContext);

  function returnGameName() {
    return game.initiator + game.opponent;
  }

  useEffect(() => {
    if (game) {
      const { initiator, opponent } = game;
      const gameName = `${initiator}${opponent}`;
      client.subscribe(`/ponggame/${gameName}/#`, function (err, done) {
        if (err) {
          console.log(err);
        }
        console.log(`SUBSCRIBING TO: /ponggame/${gameName}`);
      });
      client.on("message", (topic, message, packet) => {
        let parsed_message;
        try {
          parsed_message = JSON.parse(message.toString());
        } catch (err) {
          console.log("NOE_GIKK_GALT");
        }

        if (parsed_message) {
          // eslint-disable-next-line default-case
          if (topic === `/ponggame/${gameName}/goal`) {
            console.log("RAN!");
            if (parsed_message.username !== localStorage.getItem("username")) {
              rightPlayer.score = parsed_message.score;
            }
            setTimeout(() => {
              resetBall(
                ref.current,
                parsed_message.username === localStorage.getItem("username")
              );
              globalGame.pending = null;
            }, new Date() - new Date(parsed_message.timestamp));
          }
          if (parsed_message.username !== localStorage.getItem("username")) {
            switch (topic) {
              case `/ponggame/${gameName}/balldeflect`:
                break;
              case `/ponggame/${gameName}/playerspeed`:
                console.log(parsed_message.dy);
                leftPlayer.dy = parsed_message.dy;
                break;
              default:
                return;
            }
          }
        }
      });
    }
  }, []);

  useEffect(() => {
    if (ref.current && game) {
      const canvas = ref.current;
      const interval = setInterval(() => {
        if (new Date(game.timestamp) < new Date()) {
          startGame(
            canvas,
            returnGameName(),
            game.initiator === localStorage.getItem("username")
          );
          clearInterval(interval);
        }
      }, 50);
      // create canvas variable

      // start game
      return () => clearInterval(interval);
    }
  }, [game]);

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

export default memo(Game);
