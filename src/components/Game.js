import React, { useState } from "react";

import Board from "./Board";

import "../css/style.css"

export default function Game() {

    const [squares, setSquares] = useState(Array(64).fill(null));
    const [whiteIsNext, setWhiteIsNext] = useState(true);

    initialSquares = Array(64).fill(null);
    initialSquares.splice(1, 0, "♜");
    setSquares(initialSquares);

    function fillSquare(lineIndex, columnIndex) {
        
    }

    function getStatus() {
        return "C'est au tour des " + (whiteIsNext ? "blancs" : "noirs");
    }

    return (
        <div className="flex-row">
            <div className="flex-column-wrap">
                <div className="game-board">
                    <Board 
                        squares={squares}
                        whenClicked={(lineIndex, columnIndex) => fillSquare(lineIndex, columnIndex)}
                    />
                </div>
                <div>{getStatus()}</div>
            </div>
        </div> 
    );
}