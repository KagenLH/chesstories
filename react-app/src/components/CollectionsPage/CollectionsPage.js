import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

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
            <h2>
                Collections Page.
            </h2>
            <div className="collections-list">
                {collections?.map((collection) => (
                    <div key={collection.id}>
                        <CollectionCard collection={collection}/>
                    </div>
                ))}
            </div>
        </div>
    )
};

export default CollectionsPage;