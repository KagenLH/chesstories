import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router';

import { createCollection, postCollectionUpdate } from '../../store/collections';

import './CollectionForm.css';

const CollectionForm = ({ context }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [previewImage, setPreviewImage] = useState('');
    const [validationErrors, setValidationErrors] = useState([]);

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
            const collection = await dispatch(createCollection(title, description, previewImage));
            if(!collection.errors) {
                history.push(`/collections/${collection.id}`);
            } else {
                setValidationErrors(collection.errors);
            }
        } else {
            const errors = await dispatch(postCollectionUpdate(collection.id, title, description, previewImage));
            if(!errors) {
                history.push(`/collections`);
                history.push(`/collections/${collection.id}`);
            } else {
                setValidationErrors(errors.errors);
            }
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
                    {!!validationErrors.find(error => error.includes("name : ")) &&
                    validationErrors.filter(error => error.includes("name : "))
                                    .map(error => (
                                        <div key={error} className="collection-form__error">
                                            {error.split(': ')[1]}
                                        </div>
                                    ))
                    }
                    <div className="collection-form__input-wrapper">
                        <input
                            className="collection-form__input"
                            type="text"
                            value={title}
                            maxLength={70}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>
                </div>
                <div className="collection-form__field">
                    <label className="collection-form__label">
                        Describe your Collection:
                    </label>
                    {!!validationErrors.find(error => error.includes("description : ")) &&
                    validationErrors.filter(error => error.includes("description : "))
                                    .map(error => (
                                        <div key={error} className="collection-form__error">
                                            {error.split(': ')[1]}
                                        </div>
                                    ))
                    }
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
                        Preview Image jpg, jpeg, or png (Optional):
                    </label>
                    {!!validationErrors.find(error => error.includes("preview_image : ")) &&
                    validationErrors.filter(error => error.includes("preview_image : "))
                                    .map(error => (
                                        <div key={error} className="collection-form__error">
                                            {error.split(': ')[1]}
                                        </div>
                                    ))
                    }
                    <div className="collection-form__input-wrapper">
                        <input
                            className="collection-form__input"
                            type="file"
                            onChange={(e) => {
                                setPreviewImage(e.target.files[0]);
                                console.log(e.target.files[0]);
                            }}
                        />
                    </div>
                </div>
                <div className="collection-form__preview-image">
                    {previewImage && <img src={URL.createObjectURL(previewImage)} alt="\A" className="collection-form__preview-image-image"/>}
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