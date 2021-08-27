import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';

import { loadCollections } from '../../store/collections';

import CollectionCard from './CollectionCard';

import './CollectionsPage.css';

const CollectionsPage = () => {
    const collections = useSelector(state => state.collections);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(loadCollections());
    }, [dispatch]);

    return (
        <div className="collections-container">
            <div className="collections-page__header">
                Most Popular Collections
            </div>
            <span className="collections__new">Want to create your own collection?
            <NavLink to="/collections/new" className="collections__new-link">
                Start here.
            </NavLink>
            </span>
            <div className="collections-list">
                {collections?.map((collection) => (
                    <div key={collection.id} className="collections-card">
                        <CollectionCard collection={collection}/>
                    </div>
                ))}
            </div>
        </div>
    )
};

export default CollectionsPage;