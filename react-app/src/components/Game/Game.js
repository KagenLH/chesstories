import { useState, useEffect, useRef } from 'react';
import { useParams, useHistory } from 'react-router';
import Chessboard from 'chessboardjsx';
import Chess from 'chess.js';

import { parser } from '@mliebelt/pgn-parser';

import { normalizeDate } from '../../utils/date';
import './Game.css';

const Game = () => {
    const [game, setGame] = useState(null);
    const [gameObj, setGameObj] = useState(null);
    const [gameBoard, setGameBoard] = useState('');
    const [fen, setFen] = useState('start');
    const [move, setMove] = useState(-1);

    const { gameNum, collectionId } = useParams();

    const boardEle = useRef(null);

    const history = useHistory();

    useEffect(() => {
        const loadGame = async () => {
            const res = await fetch(`/api/collections/${collectionId}/games/${gameNum}`);

            if(res.ok) {
                const data = await res.json();
                setGameObj(data);
                const gamePgn = parser.parse(data.game, {startRule: 'game'});
                console.log(gamePgn);
                setGame(gamePgn);
                setFen("start");
            }
        };

        loadGame();
        const board = new Chess();
        setGameBoard(board);
    }, [collectionId, gameNum]);

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
        <div className="game-outer-container">
            <div className="game-container">
                {gameObj?.number > 1 &&
                <button
                    className="game-container__previous"
                    onClick={() => history.push(`/collections/${collectionId}/games/${parseInt(gameNum) - 1}`)}
                >
                    {`<<< Previous`}
                </button>
                }
                {gameObj?.number < gameObj?.collection_num_games - 1 && 
                <button
                    className="game-container__next"
                    onClick={() => {
                        history.push(`/collections/${collectionId}/games/${parseInt(gameNum) + 1}`);
                    }}
                >
                    {`Next >>>`}
                </button>
                }
                <div className="game-applet">
                <div className="game-header">{gameObj?.collection_name}</div>
                    <div ref={boardEle} className="game-board">
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
                        <Chessboard position={fen} width={500}/>
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
        </div>
    )
};

export default Game;