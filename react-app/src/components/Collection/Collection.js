import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router';
import { parser } from '@mliebelt/pgn-parser';

import { uploadBanner, updateCollection, deleteCollection } from '../../store/collections';
import { fetchCollection, setActiveCollection } from '../../store/active';
import { showLoader, hideLoader } from '../../store/loader';

import CollectionForm from '../CollectionForm';

import { normalizeDate } from '../../utils/date';
import './Collection.css';
import defaultBanner from '../../assets/images/default-banner.jpg'

const Collection = () => {
    const [context, setContext] = useState("view");
    const [pgn, setPgn] = useState("");
    const [errors, setErrors] = useState([]);

    const collection = useSelector(state => state.active.collection);
    const user = useSelector(state => state.session.user);

    const dispatch = useDispatch();
    const { id } = useParams();
    const history = useHistory();

    useEffect(() => {
        const loadCollection = async () => {
            dispatch(showLoader());
            await dispatch(fetchCollection(id));
            setTimeout(() => {
                dispatch(hideLoader());
            }, 1000)
        }

        loadCollection();
    }, [dispatch, id]);

    const createGame = async (e) => {
        e.preventDefault();
        const form = new FormData();
        form.append('pgn', pgn);
        form.append('collection_id', collection.id);

        const res = await fetch('/api/games/', {
            method: 'POST',
            body: form,
        });
        
        if(res.ok) {
            const newGame = await res.json();
            console.log(newGame);
            const newCollection = { ...collection, games: [...collection.games, newGame]};
            dispatch(setActiveCollection(newCollection));
        }
    };

    const deleteGame = async (id) => {
        const res = await fetch(`/api/games/${id}`, {
            method: 'DELETE',
        });

        if(res.ok) {
            const newCollection = await res.json();
            dispatch(setActiveCollection(newCollection));
        } else {
            setErrors(['Something went wrong on our end... Please try again.']);
        }
    };

    return (
        <div className="collection-container">
            <div className="collection-banner">
                <img className="collection-banner-image" src={collection?.banner_url ? collection?.banner_url : defaultBanner} alt="\A"/>
                {context === "edit" &&
                <button className="collection-banner__change">
                    <label style={{cursor: "pointer"}}>
                        <i className="fas fa-edit"></i>
                        <input
                            type="file"
                            onChange={async (e) => {
                                dispatch(showLoader());
                                await dispatch(uploadBanner(e.target.files[0], collection.id));
                                history.push('/collections');
                                history.push(`/collections/${collection.id}`);
                                setContext("edit");
                                dispatch(hideLoader());
                            }}
                            style={{display: "none"}}
                        />
                    </label>
                </button>
                }
            </div>
            {context === "view" && 
            <div className="collection-content">
                <div className="collection-content__header">
                    <div className="collection-content__crud">
                        {collection?.owner_id === user.id && <button
                            className="collection-content__edit"
                            onClick={() => setContext("edit")}
                        >
                            <i className="fas fa-edit"></i>
                        </button>}
                        {collection?.owner_id === user.id && <button
                            className="collection-content__delete"
                            onClick={() => {
                                history.push('/collections');
                                dispatch(deleteCollection(collection));
                            }}
                        >
                            <i className="fas fa-trash"></i>
                        </button>}
                    </div>
                    <div className="collection-content__title">
                        {collection?.name}
                    </div>
                </div>
                <div className="collection-content__pretext">
                    Curated by {collection?.owner}
                </div>
                <div className="collection-content__body">
                    <div className="collection-content__body-description">
                        {collection?.description}
                    </div>
                </div>
                {collection?.owner_id === user?.id && 
                <button
                    className="collection-games-tab-button"
                    onClick={() => setContext('games')}
                >
                    Add or Change Games in this Collection
                </button>}
            </div>}
            {context === "edit" && 
            <div className="collection-content">
                <div className="collection-content__form">
                    <CollectionForm context="edit"/>
                    <div className="collection-content__form-footer">
                        <div className="collection-content__form-or">
                            or
                        </div>
                        <button
                            className="collection-content__form-back"
                            onClick={() => setContext("view")}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
            }
            {context === "games" &&
            <div className="collection-content">
                <div className="collection-content__games">
                    <div className="collection-content__games-header">
                        {collection?.name}
                    </div>
                    <div className="collection-content__games-table__container">
                        <table>
                            <thead>
                                <th className="game-table-header game-table-number">#</th>
                                <th className="game-table-header">White</th>
                                <th className="game-table-header">Black</th>
                                <th className="game-table-header">Event</th>
                                <th className="game-table-header">Date</th>
                                <th className="game-table-header">Result</th>
                                {/* <th className="game-table-header">Remove</th> */}
                            </thead>
                            <tbody>
                                {collection.games.map(game => [game, parser.parse(game.game, { startRule: 'game'})])
                                                 .map(game => (
                                <tr>
                                    <td className="game-table-cell game-table-number">{game[0].number}</td>
                                    <td className="game-table-cell">{game[1].tags.White}</td>
                                    <td className="game-table-cell">{game[1].tags.Black}</td>
                                    <td className="game-table-cell">{game[1].tags.Event}</td>
                                    <td className="game-table-cell">{normalizeDate(game[1].tags.Date)}</td>
                                    <td className="game-table-cell">{game[1].tags.Result}</td>
                                    <td className="game-table-trash" onClick={() => deleteGame(game[0].id)}><i className="fas fa-trash-alt"></i></td>
                                </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <form
                        className="collection-content__games-form"
                        onSubmit={createGame}
                    >
                        <input
                            type="file"
                            onChange={(e) => {
                                setPgn(e.target.files[0]);
                            }}
                        />
                        <button className="collection-content__games-add-button">
                            <span className="collection-content__plus">+</span> Add New Game
                        </button>
                    </form>
                </div>
            </div>}
        </div>
    );
};

export default Collection;