import { useState } from 'react';
import { useDispatch } from 'react-redux';

import { createCollection } from '../../store/collections';

import './CollectionForm.css';

const CollectionForm = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [previewImage, setPreviewImage] = useState('');

    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();
        await dispatch(createCollection(title, description, previewImage));
    };

    return (
        <div className="collection-form__container">
            <form
                className="collection-form"
                onSubmit={handleSubmit}
            >
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <input
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <input
                    type="file"
                    onChange={(e) => setPreviewImage(e.target.files[0])}
                />
                <button>Submit</button>
            </form>
        </div>
    )
};

export default CollectionForm;