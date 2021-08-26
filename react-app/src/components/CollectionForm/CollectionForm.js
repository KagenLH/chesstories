import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router';

import { createCollection, postCollectionUpdate } from '../../store/collections';

import './CollectionForm.css';

const CollectionForm = ({ context }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [previewImage, setPreviewImage] = useState('');

    const collection = useSelector(state => state.active.collection);

    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        if(context === "edit") {
            setTitle(collection.name);
            setDescription(collection.description);
        }
    }, [context, collection]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if(context !== "edit") {
            await dispatch(createCollection(title, description, previewImage));
        } else {
            await dispatch(postCollectionUpdate(collection.id, title, description, previewImage));
            history.push(`/collections`);
            history.push(`/collections/${collection.id}`);
        }
    }

    return (
        <div className="collection-form__container">
            <form
                className="collection-form"
                onSubmit={handleSubmit}
            >
                <div className="collection-form__field">
                    <label className="collection-form__label">
                        Name of Collection:
                    </label>
                    <div className="collection-form__input-wrapper">
                        <input
                            className="collection-form__input"
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>
                </div>
                <div className="collection-form__field">
                    <label className="collection-form__label">
                        Describe your Collection:
                    </label>
                    <div className="collection-form__input-wrapper">
                        <textarea
                            className="collection-form__input collection-form__textarea"
                            type="textarea"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>
                </div>
                <div className="collection-form__field">
                    <label className="collection-form__label">
                        Preview Image:
                    </label>
                    <div className="collection-form__input-wrapper">
                        <input
                            className="collection-form__input"
                            type="file"
                            onChange={(e) => setPreviewImage(e.target.files[0])}
                        />
                    </div>
                </div>
                <button
                    className="collection-form__submit"
                >
                    Submit
                </button>
            </form>
        </div>
    )
};

export default CollectionForm;