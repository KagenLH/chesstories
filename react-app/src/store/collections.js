import { Redirect } from 'react-router';

const SET_COLLECTIONS = 'collections/SET_COLLECTIONS';
const ADD_COLLECTION = 'collections/ADD_COLLECTION';
const UPDATE_COLLECTION = 'collections/UPDATE_COLLECTION';

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

const updateBanner = (id, bannerUrl) => {
    return {
        type: UPDATE_COLLECTION,
        payload: [id, bannerUrl],
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

    if(res.ok) {
        const collection = await res.json();
        dispatch(addCollection(collection));
        return null;
    } else if(res.status < 500) {
        const errors = await res.json();
        return errors;
    } else {
        return (
            <Redirect to="/error"/>
        )
    }
};

const initialState = [];

const collectionsReducer = (state=initialState, action) => {
    switch(action.type) {
        case SET_COLLECTIONS:
            return [ ...action.payload ];
        case ADD_COLLECTION:
            return [ ...state, action.payload ];
        default:
            return state;
    }
};

export default collectionsReducer;