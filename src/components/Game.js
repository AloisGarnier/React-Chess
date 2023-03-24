import React, { useState } from "react";

import Board from "./Board";

import "../css/style.css"

export default function Game() {

    const [history, setHistory] = useState([{
        squares : Array(64).fill(null),
        playedColumn : -1,
        playedRow : -1
    }]);
    const [xIsNext, setXisNext] = useState(true);
    const [stepNumber, setStepNumber] = useState(0);
    const [isDescendingOrder, setIsDescendingOrder] = useState(false);

    function fillSquare(lineIndex, columnIndex) {
        const currentHistory = history.slice(0, stepNumber + 1);
        const currentRound = currentHistory[currentHistory.length - 1];
        const squares = currentRound.squares.slice();
        if (squares[8*lineIndex + columnIndex - 1] || calculateWinner(squares)) {
            return;
        }
        squares[8*lineIndex + columnIndex - 1] = xIsNext ? "X" : "O";
        setHistory(currentHistory.concat([{
            squares : squares,
        }]))
        setXisNext(!xIsNext);
        setStepNumber(currentHistory.length);
    }

    function calculateWinner(squares) {
        const lines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];
        for (let i = 0; i < lines.length; i++) {
            const [a, b, c] = lines[i];
            if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
                return squares[a];
            }
        }
        return null;
    }

    function getMoves() {
        let historyButtons = history.map((step, move) => {
            let label = move ?
                'Tour ' + move :
                'Début';
            if (move === stepNumber) {
                label = <b>{label}</b>;
            }
            return (
                <li key={move}>
                    <button className="move-button" onClick={() => jumpTo(move)}>{label}</button>
                </li>
            );
        });
        let orderButton = [
        <li>
            <button className="move-button" onClick={() => changeOrder()}>Ordre ({isDescendingOrder?"-":"+"})</button>
        </li>     
        ]
        if (isDescendingOrder) {
            return orderButton.concat(historyButtons.reverse());
        } else {
            return orderButton.concat(historyButtons);
        }
    }

    function jumpTo(step) {
        setStepNumber(step);
        setXisNext((step % 2) === 0);
    }

    function getStatus() {
        const currentRound = history[stepNumber];
        const winner = calculateWinner(currentRound.squares);
        if (winner) {
            return "Vainqueur : " + winner;
        } else {
            return "Joueur suivant : " + (xIsNext ? "X" : "O");
        }
    }

    function getCurrentSquares() {
        const currentRound = history[stepNumber];
        return currentRound.squares;
    }

    function changeOrder() {
        if (isDescendingOrder) {
            setIsDescendingOrder(false);
        } else {
            setIsDescendingOrder(true);
        }
    }

    return (
        <div className="flex-row">
            <div className="flex-column-wrap">
                <div className="game-board">
                    <Board 
                        squares={getCurrentSquares()}
                        whenClicked={(lineIndex, columnIndex) => fillSquare(lineIndex, columnIndex)}
                    />
                </div>
                <div>{getStatus()}</div>
            </div>
            <div>
                <ul className="flex-column-wrap h-9-5rem">{getMoves()}</ul>
            </div>
        </div> 
    );
}