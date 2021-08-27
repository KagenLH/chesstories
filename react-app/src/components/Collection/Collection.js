import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useHistory } from 'react-router';

import { uploadBanner, deleteCollection } from '../../store/collections';
import { fetchCollection } from '../../store/active';

import CollectionForm from '../CollectionForm';

import './Collection.css';

const Collection = () => {
    const [context, setContext] = useState("view");
    const collection = useSelector(state => state.active.collection);

    const dispatch = useDispatch();
    const location = useLocation();
    const history = useHistory();

    useEffect(() => {
        const id = location.pathname.split('/')[2];
        dispatch(fetchCollection(id));
    }, [dispatch, location.pathname]);

    return (
        <div className="collection-container">
            <div className="collection-banner">
                <img className="collection-banner-image" src={collection?.banner_url} alt="\A"/>
                {context === "edit" &&
                <button className="collection-banner__change">
                    <label style={{cursor: "pointer"}}>
                        <i className="fas fa-edit"></i>
                        <input
                            type="file"
                            onChange={async (e) => {
                                await dispatch(uploadBanner(e.target.files[0], collection.id));
                                history.push('/collections');
                                history.push(`/collections/${collection.id}`);
                                setContext("edit");
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
                    <div className="collection-content__title">
                        {collection?.name}
                    </div>
                    <button
                        className="collection-content__edit"
                        onClick={() => setContext("edit")}
                    >
                        <i className="fas fa-edit"></i>
                    </button>
                    <button
                        className="collection-content__delete"
                        onClick={() => {
                            history.push('/collections');
                            dispatch(deleteCollection(collection));
                        }}
                    >
                        <i className="fas fa-trash"></i>
                    </button>
                </div>
                <div className="collection-content__body">
                    <div className="collection-content__body-description">
                        {collection?.description}
                    </div>
                </div>
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
        </div>
    );
};

export default Collection;