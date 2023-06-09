import React from "react";

import Square from "./Square";

export default function Board(props) {

    function populateBoard() {
        const boardSize = 8;
        const board = [];
        for (let i = 0; i < boardSize; i++) {
            let line = [];
            for (let j = 0; j < boardSize; j++) {
                line.push(renderSquare(i, j));
            }
            board.push(<div key={i} className="board-row">{line}</div>)
        }
        return board;
    }

    function renderSquare(lineIndex, columnIndex) {
        squareIndex = 8*lineIndex+columnIndex-1;
        return (
            <Square
                key={squareIndex}
                value={props.squares[squareIndex]}
                whenClicked={() => props.whenClicked(squareIndex)}
                color={(lineIndex + columnIndex) % 2 == 0?"white-square":"black-square"}
            />
        );
    }

    return (
        <div>
            {populateBoard()}
        </div>
    );
}