import { useState, useEffect } from 'react';
import { useLocation } from 'react-router';
import Chessboard from 'chessboardjsx';
import Chess from 'chess.js';

import { parser } from '@mliebelt/pgn-parser';

import { normalizeDate } from '../../utils/date';
import './Game.css';

const Game = () => {
    const [game, setGame] = useState(null);
    const [gameBoard, setGameBoard] = useState('');
    const [fen, setFen] = useState('start');
    const [move, setMove] = useState(-1);

    const location = useLocation();

    useEffect(() => {
        const loadGame = async () => {
            const collectionId = location.pathname.split('/')[2];
            const gameId = location.pathname.split('/')[4];

            const res = await fetch(`/api/collections/${collectionId}/games/${gameId}`);

            if(res.ok) {
                const data = await res.json();
                const gamePgn = parser.parse(data.game, {startRule: 'game'});
                console.log(gamePgn);
                setGame(gamePgn);
            }
        };

        loadGame();
        const board = new Chess();
        setGameBoard(board);
    }, [location.pathname]);

    const moveOne = () => {
        if(move < game.moves.length - 2) {
            const newMove = move + 1;
            setMove(newMove);
            gameBoard.move(game.moves[newMove].notation.notation);
            setFen(gameBoard.fen());
        }
    };

    const moveBack = () => {
        if(move > -1) {
            const newMove = move - 1;
            setMove(newMove);
            gameBoard.undo();
            setFen(gameBoard.fen());
        }
    };

    return (
        <div className="game-container">
            <div className="game-applet">
                <div className="game-board">
                    <div className="game-board__information">
                        <div className="game-board__info">
                            White: <span className="game-board__info-text">{game?.tags.White}</span>
                        </div>
                        <div className="game-board__info">
                            Black: <span className="game-board__info-text">{game?.tags.Black}</span>
                        </div>
                        <div className="game-board__event-date">
                            <div className="game-board__event">
                                {game?.tags.Event}
                            </div>
                            <div className="game-board__date">
                                {game?.tags.Date ? normalizeDate(game?.tags.Date) : null}
                            </div>
                        </div>
                    </div>
                    <Chessboard position={fen} width={575}/>
                    <div className="game-board__buttons">
                        <button className="game-board__button" onClick={moveBack}>
                            {"<"}
                        </button>
                        <button className="game-board__button" onClick={moveOne}>
                            {">"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Game;