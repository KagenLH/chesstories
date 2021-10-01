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
    const [annotation, setAnnotation] = useState("");
    const [moveStack, setMoveStack] = useState([]);
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
                setGame(gamePgn);
                setMove(-1);
                const firstAnnotation = data.annotations.find(annotation => annotation.ply_num - 1 === move)
                if(firstAnnotation) {
                    setAnnotation(firstAnnotation.content);
                }
            }
        };

        loadGame();
        const board = new Chess();
        setGameBoard(board);
        setFen(board.fen());
    }, [collectionId, gameNum]);

    const moveOne = () => {
        if(move < game.moves.length - 2) {
            const newMove = move + 1;
            setMove(newMove);
            const moveText = game.moves[newMove].notation.notation;
            const moveNumber = game.moves[newMove].moveNumber || `${moveStack[moveStack.length - 1].split('.')[0]}`;
            const moveNotation = newMove % 2 === 0 ? `${moveNumber}. ${moveText}` : `${moveNumber} ...${moveText}`;
            gameBoard.move(moveText);
            setMoveStack(prevStack => [...prevStack, moveNotation]);
            setFen(gameBoard.fen());
            const currentAnnotation = gameObj.annotations.find(annotation => annotation.ply_num - 1 === newMove);
            if(currentAnnotation) {
                setAnnotation(currentAnnotation.content);
            } else {
                setAnnotation('');
            }
        }
    };

    const moveBack = () => {
        if(move > -1) {
            const newMove = move - 1;
            setMove(newMove);
            gameBoard.undo();
            setFen(gameBoard.fen());
            setMoveStack(prevStack => {
                const newStack = [ ...prevStack ];
                newStack.pop();
                return newStack;
            })
            const currentAnnotation = gameObj.annotations.find(annotation => annotation.ply_num - 1 === newMove);
            if(currentAnnotation) {
                setAnnotation(currentAnnotation.content);
            } else {
                setAnnotation('');
            }
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
                {gameObj?.number < gameObj?.collection_num_games  && 
                <button
                    className="game-container__next"
                    onClick={() => {
                        gameBoard.reset();
                        history.push(`/collections/${collectionId}/games/${parseInt(gameNum) + 1}`);
                    }}
                >
                    {`Next >>>`}
                </button>
                }
                <div className="playback-app">
                <div className="game-applet">
                <div className="game-header">{gameObj?.collection_name}</div>
                    <div ref={boardEle} className="game-board">
                        <div className="game-board__information">
                            <div className="game-board__info-flex">
                                <div className="game-board__info-flex-wb">
                                    <div className="game-board__info">
                                        White: <span className="game-board__info-text">{game?.tags.White}</span>
                                    </div>
                                    <div className="game-board__info">
                                        Black: <span className="game-board__info-text">{game?.tags.Black}</span>
                                    </div>
                                </div>
                                <div className="game-board__info-num-and-loc">
                                    <div className="game-board__info-gamenum">
                                        Game {gameObj?.number}/{gameObj?.collection_num_games}
                                    </div>
                                    <div className="game-board__info-location">
                                        {game?.tags.Site}
                                    </div>
                                </div>
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
                <div className="annotations-applet">
                        <div className="game-history">
                            <div className="moves-list">
                            {moveStack.map((move, i) => (
                                <p className={i === moveStack.length - 1 ? "moves-list-move moves-list-final" : "moves-list-move"}>{move.includes('...') ? move.split('...')[1] : move}</p>
                            ))}
                            </div>
                        </div>
                        <div className="annotation-content">
                            <div className="annotation-current-move">
                                {moveStack[moveStack.length - 1]}
                            </div>
                            <div className="annotation-current-content">
                                {annotation}
                            </div>
                        </div>
                </div>
                </div>
            </div>
        </div>
    )
};

export default Game;