import { Redirect } from 'react-router';

const SET_COLLECTIONS = 'collections/SET_COLLECTIONS';
const ADD_COLLECTION = 'collections/ADD_COLLECTION';

const setCollections = (collections) => {
    return {
        type: SET_COLLECTIONS,
        payload: collections,
    };
};

const addCollection = (collection) => {
    return {
        type: ADD_COLLECTION,
        payload: collection,
    };
};

export const loadCollections = () => async (dispatch) => {
    const res = await fetch('/api/collections/');

    if(res.ok) {
        const data = await res.json();
        console.log(data.collections);
        dispatch(setCollections(data.collections));
        return null;
    } else {
        return (
            <Redirect to="/error"/>
        )
    }
};

export const createCollection = (name, description, previewImage) => async (dispatch) => {
    const form = new FormData();
    form.append('name', name);
    form.append('description', description);
    form.append('preview_image', previewImage)

    const res = await fetch('/api/collections/', {
        method: 'POST',
        body: form,
    });
};

const initialState = [];

const collectionsReducer = (state=initialState, action) => {
    switch(action.type) {
        case SET_COLLECTIONS:
            return [ ...action.payload ];
        default:
            return state;
    }
};

export default collectionsReducer;