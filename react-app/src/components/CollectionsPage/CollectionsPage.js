import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { loadCollections, uploadBanner } from '../../store/collections';

import CollectionForm from '../CollectionForm';
import './CollectionsPage.css';

const CollectionsPage = () => {
    const [bannerImage, setBannerImage] = useState('');
    const collections = useSelector(state => state.collections);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(loadCollections());
    }, [dispatch]);

    const updateBanner = async (e) => {
        e.preventDefault();
        const errors = await dispatch(uploadBanner(bannerImage, 1));
        console.log(errors);
    }

    return (
        <div className="collections-container">
            <h2>
                Collections Page.
            </h2>
            <div className="collections-list">
                {collections?.map((collection) => (
                    <div key={collection.id}>
                        <div>
                            Created by: {collection.owner}
                        </div>
                        <div>
                            {collection.name}
                        </div>
                        <div>
                            {collection.description}
                        </div>
                    </div>
                ))}
            </div>
        <CollectionForm/>
        <form onSubmit={updateBanner}>
            <input
                type="file"
                onChange={(e) => setBannerImage(e.target.files[0])}
            />
            <button>Update Banner</button>
        </form>
        </div>
    )
};

export default CollectionsPage;